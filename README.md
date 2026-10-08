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

## Files

| File | Use |
|---|---|
| `index.html` | The public hub |
| `activities.js` | The activity library the AI chooses from (edit to add or change activities) |
| `PROCESSING.md` | Instructions the scheduled AI run follows |
| `scripts/prepare.py`, `scripts/publish.py` | Rule-based steps and the privacy check |
| `data/plans.json` | Published, de-identified plans (written by the scheduled run) |
| `data/sample.json` | Plans made from fictional answers, shown until live plans exist |
| `practice/` | Fictional files used by the activities |

## Privacy

Raw responses are never committed. `work/` (where a run keeps answers while processing),
spreadsheets and CSV files are ignored by `.gitignore`, except the fictional files in `practice/`.
