# AI Workshop Hub

A public hub for an AI productivity workshop. Participants complete an anonymous needs
assessment, an AI writes each person a personal training plan, and the plan appears on this
site under a code the participant made up. No names, job titles or organisation details are
ever published.

## How it works

1. **Anonymous form.** Participants answer the needs assessment and create a participant code.
2. **Private responses.** Answers go to a private spreadsheet that only the facilitator can open.
3. **Scheduled AI run.** A scheduled Claude task follows [`PROCESSING.md`](PROCESSING.md):
   - `scripts/prepare.py` finds new responses and applies the fixed rules (level, data-safety
     level, statistics) and ranks candidate activities from `activities.js`;
   - Claude chooses and adapts three activities and writes a capstone for each person, in
     general terms only;
   - `scripts/publish.py` blocks anything identifying (emails, phone numbers, web addresses,
     organisation and place names, or six or more words copied from a person's answers) and
     publishes the rest to `data/plans.json`.
4. **Public site.** `index.html` reads `data/plans.json`: participants find their plan by code;
   group insights only show totals, with groups under three people hidden.

## Workshop day

The **Workshop day** page (`index.html#workshop-hr` or `#workshop-cx`) runs each full-day
workshop, 8:30 a.m. to 4:30 p.m., in Claude. It holds every block in running order: the
scenario, the made-up practice material, ready-to-copy prompts and the downloads.

The day runs as a **Claude Workflow Studio**. Each pair redesigns one real workflow (their own,
anonymised, or one of three made-up workflow packs per group) through six stages: map, split,
brief, build, test and deploy. These follow Anthropic's AI Fluency framework (Delegation,
Description, Discernment, Diligence). Five short masterclasses, drawn from
[Claude 101](https://academy.claude.com/courses/claude-101),
[AI Fluency](https://academy.claude.com/courses/ai-fluency-framework-foundations) and
[AI capabilities and limitations](https://academy.claude.com/courses/ai-capabilities-and-limitations),
teach the techniques when they are needed. Each pair finishes with a tested Claude Project and
skill, a five-case test set with a pass rate, and a one-page Workflow Playbook, presented to a
management panel at 4:00.

- **HR workflow packs:** A. Recruitment, B. Policy questions desk, C. Monthly absence report.
- **CX workflow packs:** A. Outage communications, B. Complaints and escalations, C. Weekly
  customer insight report.

The page has **no answers**: several exercises contain planted mistakes for participants to find.
The answers, debrief notes and timings are in the facilitator guide and activity cards, which are
kept outside this public repository.

### Workshop skills

`skills/` holds the two skills used in the Skills Lab, each as a folder and as a ZIP file ready
to upload in Claude (Customize, Skills, +, Create skill, Upload a skill), or for an owner to add
for the whole organisation (Organization settings, Plugins & skills, Add):

- `outage-update-writer`: customer outage messages from the internal note only, with the
  fallen-line safety message and a fact check.
- `hr-letter-writer`: standard HR letters with placeholders, the house tone and a list of what
  HR must confirm.

After editing a `SKILL.md`, rebuild its ZIP from inside `skills/`: `zip -r <name>.zip <name>`.

## Hosting

GitHub Pages serves the site from this repository. To host it from the Beelink as well, using
Docker and a Cloudflare Tunnel, follow [`deploy/README.md`](deploy/README.md). GitHub Pages stays
as the backup.

## Files

| File | Use |
|---|---|
| `index.html` | The public hub |
| `activities.js` | The activity library the AI chooses from (edit to add or change activities) |
| `workshop.js` | Workshop-day content for HR and CX: the full-day running order, practice material and prompts (no answers) |
| `skills/` | The two workshop skills, as folders and as ZIP files to upload in Claude |
| `deploy/` | Docker Compose, nginx and Cloudflare Tunnel setup for hosting on the Beelink |
| `PROCESSING.md` | Instructions the scheduled AI run follows |
| `scripts/prepare.py`, `scripts/publish.py` | Rule-based steps and the privacy check |
| `data/plans.json` | Published, de-identified plans (written by the scheduled run) |
| `data/sample.json` | Plans made from fictional answers, shown until live plans exist |
| `practice/` | Fictional files used by the activities |

## Privacy

Raw responses are never committed. `work/` (where a run keeps answers while processing),
spreadsheets and CSV files are ignored by `.gitignore`, except the fictional files in `practice/`.
