#!/usr/bin/env python3
"""
Step 3 of a processing run.

Takes the plans the AI wrote (work/new_plans.json), checks every one against the privacy
rules, and merges the ones that pass into data/plans.json, the only file the public site reads.

A plan is rejected (and nothing about it is published) if any text in it:
  - contains an email address, phone-like number, web address or a blocked word
    (organisation, place and system names listed privately in work/blocklist.txt), or
  - repeats six or more consecutive words from that person's private written answers.

Usage: python3 scripts/publish.py --source-modified T   # validate and merge
       python3 scripts/publish.py --check                 # validate only, change nothing
       python3 scripts/publish.py --mark-only T           # only record that the sheet was seen at time T
"""
import datetime, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data", "plans.json")
PENDING = os.path.join(ROOT, "work", "pending.json")
NEW = os.path.join(ROOT, "work", "new_plans.json")

# Organisation, place and system names to block are kept out of this public file.
# The scheduled run writes them, one per line, to work/blocklist.txt (never committed).
BLOCKLIST = os.path.join(ROOT, "work", "blocklist.txt")
BLOCKED = []
if os.path.exists(BLOCKLIST):
    BLOCKED = [r"\b" + re.escape(w.strip()) + r"\b" for w in open(BLOCKLIST) if w.strip() and not w.startswith("#")]
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
PHONE = re.compile(r"(\+?\d[\d\s().-]{6,}\d)")
URL = re.compile(r"https?://|www\.", re.I)
LEVELS = {"Starter", "Practitioner", "Builder"}
LIMITS = {"focus": 220, "why": 260, "tailoring": 360, "goal": 260, "step": 220, "point": 160}


def words(t):
    return re.findall(r"[a-z0-9']+", (t or "").lower())


def overlaps(text, sources, n=6):
    tw = words(text)
    grams = {" ".join(tw[i:i + n]) for i in range(len(tw) - n + 1)}
    for s in sources:
        sw = words(s)
        for i in range(len(sw) - n + 1):
            if " ".join(sw[i:i + n]) in grams:
                return " ".join(sw[i:i + n])
    return None


def texts(plan):
    yield "focus", plan.get("focus", "")
    for p in plan.get("starting_point", []):
        yield "point", p
    for a in plan.get("activities", []):
        yield "why", a.get("why", "")
        yield "tailoring", a.get("tailoring", "")
    cap = plan.get("capstone", {})
    yield "goal", cap.get("goal", "")
    for s in cap.get("steps", []):
        yield "step", s


def check(plan, pend, library_ids):
    errs = []
    if plan.get("level") != pend["level"] or plan.get("safety") != pend["safety"]:
        errs.append("level or safety differs from the rule-based value")
    acts = plan.get("activities", [])
    ids = [a.get("id") for a in acts]
    if len(acts) != 3 or len(set(ids)) != 3:
        errs.append("needs exactly three different activities")
    allowed = {c["id"] for c in pend["candidates"]}
    for i in ids:
        if i not in library_ids:
            errs.append(f"unknown activity id {i}")
        elif i not in allowed:
            errs.append(f"activity {i} is not in this person's candidate list")
    if not (3 <= len(plan.get("capstone", {}).get("steps", [])) <= 5):
        errs.append("capstone needs 3 to 5 steps")
    private = [v for v in pend["private_answers"].values() if v]
    for field, t in texts(plan):
        if not isinstance(t, str) or not t.strip():
            errs.append(f"empty {field}")
            continue
        if len(t) > LIMITS[field]:
            errs.append(f"{field} too long ({len(t)} > {LIMITS[field]})")
        if EMAIL.search(t) or URL.search(t):
            errs.append(f"{field} contains an email or web address")
        if PHONE.search(t):
            errs.append(f"{field} contains a phone-like number")
        for b in BLOCKED:
            if re.search(b, t, re.I):
                errs.append(f"{field} contains a blocked word")
        hit = overlaps(t, private)
        if hit:
            errs.append(f"{field} repeats the person's own words: '{hit}'")
    return errs


def mark(t):
    data = json.load(open(DATA)) if os.path.exists(DATA) else {"plans": [], "facts": []}
    data["source_modified"] = t
    json.dump(data, open(DATA, "w"), indent=1)
    print("Recorded the sheet's last-modified time.")
    return 0


def main(only_check, source_modified=None):
    if not BLOCKED:
        print("Stopping: work/blocklist.txt is missing or empty. Write the blocked words from the task prompt first.")
        return 2
    pending = {p["key"]: p for p in json.load(open(PENDING))}
    new = json.load(open(NEW)) if os.path.exists(NEW) else []
    import subprocess
    lib = subprocess.run(["node", "-e", f"global.window={{}};require({json.dumps(os.path.join(ROOT, 'activities.js'))});"
                          "console.log(JSON.stringify(window.ACTIVITIES.map(a=>a.id)))"], capture_output=True, text=True, check=True)
    library_ids = set(json.loads(lib.stdout))
    data = json.load(open(DATA)) if os.path.exists(DATA) else {"plans": [], "facts": []}
    have = {p["key"] for p in data["plans"]}

    ok, bad = [], []
    for plan in new:
        pend = pending.get(plan.get("key"))
        if not pend:
            bad.append((plan.get("key"), ["key not found in pending.json"]))
            continue
        if plan["key"] in have:
            continue
        errs = check(plan, pend, library_ids)
        if errs:
            bad.append((plan["key"], errs))
            continue
        ok.append((plan, pend))

    for k, errs in bad:
        print(f"REJECTED {k}:")
        for e in errs:
            print("   -", e)
    if only_check:
        print(f"{len(ok)} plan(s) pass, {len(bad)} rejected.")
        return 1 if bad else 0

    for plan, pend in ok:
        data["plans"].append({
            "key": pend["key"], "code": pend["code"], "date": pend["date"], "dept": pend["dept"],
            "level": pend["level"], "safety": pend["safety"], "focus": plan["focus"],
            "starting_point": plan["starting_point"],
            "activities": [{"id": a["id"], "why": a["why"], "tailoring": a["tailoring"]} for a in plan["activities"]],
            "capstone": {"goal": plan["capstone"]["goal"], "steps": plan["capstone"]["steps"]},
        })
        data["facts"].append(dict(pend["facts"], key=pend["fact_key"]))
    data["plans"].sort(key=lambda p: (p["date"], p["code"]))
    data["facts"].sort(key=lambda f: f["key"])  # hash order, so facts can't be lined up with plans
    if source_modified and not bad:
        data["source_modified"] = source_modified
    data["updated"] = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    os.makedirs(os.path.dirname(DATA), exist_ok=True)
    json.dump(data, open(DATA, "w"), indent=1)
    print(f"Published {len(ok)} plan(s). {len(bad)} rejected. Total now {len(data['plans'])}.")
    return 1 if bad else 0


def arg(name):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv and sys.argv.index(name) + 1 < len(sys.argv) else None


if __name__ == "__main__":
    if "--mark-only" in sys.argv:
        sys.exit(mark(arg("--mark-only")))
    sys.exit(main("--check" in sys.argv, arg("--source-modified")))
