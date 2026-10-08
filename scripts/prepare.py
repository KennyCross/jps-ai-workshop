#!/usr/bin/env python3
"""
Step 1 of a processing run.

Reads the form responses (CSV exported from the private response sheet), finds the ones
that have not been processed yet, and for each one works out the rule-based parts of the
plan: participant code, department, level, data-safety level, the categorical facts used
for group statistics, and a ranked shortlist of candidate activities.

Writes work/pending.json. That file holds the private written answers so the AI step can
read them; it lives in work/, which is never committed.

Usage: python3 scripts/prepare.py path/to/responses.csv
"""
import csv, datetime, hashlib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data", "plans.json")
WORK = os.path.join(ROOT, "work")

F = {
    "code": r"participant code|your code",
    "dept": r"which department",
    "main": r"main tasks",
    "three": r"three work activities",
    "process": r"repetitive process",
    "systems": r"applications and systems",
    "inputs": r"inputs to your work",
    "outputs": r"outputs do you regularly",
    "bottle": r"delays, duplication",
    "hours": r"copying or re-typing",
    "tools": r"which ai tools have you used",
    "access": r"company-provided ai tool|copilot",
    "sens": r"types of information",
    "want": r"tasks would you like ai help",
    "goal": r"ai-assisted workflow",
}
LIKERT = [r"understand what ai tools can do", r"comfortable trying ai tools", r"safe to share with ai"]

TAGS = {"Drafting emails and letters": "email", "Summarising long documents": "summarise", "Analysing Excel data": "excel",
        "Preparing reports": "reports", "Creating presentations": "presentations",
        "Turning meeting notes into minutes and actions": "minutes", "Responding to customer enquiries": "customer",
        "Processing requests or forms": "forms", "Research": "research", "Scheduling": "scheduling",
        "Reports": "reports", "Emails or letters": "email", "Presentations": "presentations", "Summaries or briefs": "summarise",
        "Dashboards": "excel", "Schedules": "scheduling", "Meeting minutes": "minutes", "Customer responses": "customer",
        "Management updates": "reports", "Spreadsheets": "excel", "PDFs or scanned documents": "summarise",
        "Forms or applications": "forms", "Customer requests or complaints": "customer", "Meeting notes": "minutes",
        "Survey results": "excel", "Emails": "email", "Reports from other teams": "summarise"}
KW = [(r"excel|spreadsheet|figures|numbers|data", "excel"), (r"e-?mail|letter|memo", "email"), (r"report|update|brief", "reports"),
      (r"minute|meeting", "minutes"), (r"complain|customer|enquir|inquir|caller|\bcalls?\b", "customer"),
      (r"form|application|request|approval", "forms"), (r"presentation|slide|powerpoint", "presentations"),
      (r"schedul|calendar|interview|roster|booking", "scheduling"), (r"summar|pdf|policy|document", "summarise"),
      (r"research|look up|find information", "research")]


def col(headers, pattern):
    for h in headers:
        if re.search(pattern, h, re.I):
            return h
    return None


def items(v):
    # Google Forms joins checkbox answers with ", "; Microsoft Forms uses ";"
    v = (v or "").strip()
    if not v:
        return []
    parts = re.split(r";\s*", v) if ";" in v else re.split(r",\s+(?=[A-Z])", v)
    return [p.strip() for p in parts if p.strip()]


def day(ts):
    ts = (ts or "").strip()
    for fmt in ("%m/%d/%Y %H:%M:%S", "%d/%m/%Y %H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%m/%d/%Y %H:%M"):
        try:
            return datetime.datetime.strptime(ts[:19], fmt).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return ts[:10]


def key(prefix, *vals):
    return hashlib.sha256((prefix + "|" + "|".join(vals)).encode()).hexdigest()[:12]


def clean_code(raw):
    c = re.sub(r"\s+", "-", (raw or "").strip().lower())
    c = re.sub(r"[^a-z0-9-]", "", c).strip("-")[:24]
    if "@" in (raw or "") or re.search(r"\d{7,}", c) or len(c) < 3:
        return None
    return c


def activities():
    js = os.path.join(ROOT, "activities.js")
    out = subprocess.run(["node", "-e", f"global.window={{}};require({json.dumps(js)});"
                          "console.log(JSON.stringify(window.ACTIVITIES))"], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def main(csv_path):
    with open(csv_path, newline="", encoding="utf-8-sig") as fh:
        rows = list(csv.DictReader(fh))
    if not rows:
        print("No responses in the sheet.")
        return write([])
    headers = list(rows[0].keys())
    c = {k: col(headers, p) for k, p in F.items()}
    lik = [col(headers, p) for p in LIKERT]
    ts = col(headers, r"^timestamp$|start time|completion time") or headers[0]

    existing = {"plans": [], "facts": []}
    if os.path.exists(DATA):
        existing = json.load(open(DATA))
    done = {p["key"] for p in existing.get("plans", [])}
    taken = {p["code"] for p in existing.get("plans", [])}
    lib = activities()

    pending = []
    for r in rows:
        g = lambda k: (r.get(c[k]) or "").strip() if c.get(k) else ""
        raw_code = g("code")
        pkey = key("plan", r.get(ts, ""), raw_code)
        if pkey in done:
            continue
        code = clean_code(raw_code)
        code_note = None
        if not code:
            code = "anon-" + pkey[:5]
            code_note = "Code missing or unsafe (looked like an email, phone number or was too short); published under a generated code."
        base, n = code, 2
        while code in taken:
            code, n = f"{base}-{n}", n + 1
        taken.add(code)

        d = g("dept").lower()
        dept = "HR" if "human" in d else "CX" if "customer" in d else "Other"
        scores = []
        for h in lik:
            m = re.match(r"\s*([1-5])", r.get(h, "") or "") if h else None
            if m:
                scores.append(int(m.group(1)))
        comfort = round(sum(scores) / len(scores), 2) if scores else None
        tools = [t for t in items(g("tools")) if not re.search(r"none", t, re.I)]
        if (comfort is not None and comfort < 3) or not tools:
            level = "Starter"
        elif (comfort is None or comfort >= 4) and (any(re.search("power automate", t, re.I) for t in tools) or len(tools) >= 3):
            level = "Builder"
        else:
            level = "Practitioner"
        sens = [s for s in items(g("sens")) if not re.search("none of these", s, re.I)]
        safety = "red" if any(re.search(r"customer account|employee|payment|billing|health|medical", s, re.I) for s in sens) \
            else "amber" if sens else "green"
        low = None
        if scores:
            i = min(range(len(scores)), key=lambda j: scores[j])
            if scores[i] <= 3:
                low = ["understanding", "confidence", "data-safety"][i]

        w = {}
        def add(t, v):
            if t:
                w[t] = w.get(t, 0) + v
        for x in items(g("want")):
            add(TAGS.get(x), 3)
        for x in items(g("outputs")) + items(g("inputs")):
            add(TAGS.get(x), 1)
        free = " ".join([g("main"), g("three"), g("process"), g("goal")])
        for pat, t in KW:
            if re.search(pat, free, re.I):
                add(t, 1)
        pool = [a for a in lib if level in a["levels"] and (a["dept"] in ("All", dept) or dept == "Other")]
        ranked = sorted(pool, key=lambda a: -(sum(w.get(t, 0) * (1.5 if j == 0 else 1) for j, t in enumerate(a["tags"]))
                                              + (1.5 if a["dept"] == dept or (dept == "Other" and a["dept"] == "All") else 0)))

        pending.append({
            "key": pkey,
            "fact_key": key("fact", r.get(ts, "")),
            "code": code,
            "code_note": code_note,
            "date": day(r.get(ts, "")),
            "dept": dept, "level": level, "safety": safety, "lowest_comfort": low,
            "facts": {"hours": g("hours"), "tools": tools,
                      "access": g("access"), "comfort": scores, "want": items(g("want")),
                      "outputs": items(g("outputs")), "inputs": items(g("inputs")), "systems": items(g("systems"))},
            "candidates": [{"id": a["id"], "title": a["title"], "tags": a["tags"], "dept": a["dept"]} for a in ranked[:8]],
            "private_answers": {k: g(k) for k in ("main", "three", "process", "bottle", "goal")},
        })
    write(pending)


def write(pending):
    os.makedirs(WORK, exist_ok=True)
    json.dump(pending, open(os.path.join(WORK, "pending.json"), "w"), indent=1)
    print(f"{len(pending)} new response(s) to process." if pending else "Nothing new to process.")


if __name__ == "__main__":
    main(sys.argv[1])
