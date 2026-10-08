# JPS AI Tools & AI-Integrated Workflows Workshop

Materials for the AI productivity workshop for JPS HR and Customer Experience staff, facilitated by Kenista Simpson.

## AI Readiness Insights dashboard

Live site: https://kennycross.github.io/jps-ai-workshop/

Upload the Microsoft Forms export (Responses → Open in Excel). Files are read in your browser only and never leave your computer.

- **Overview**: readiness index and charts, filterable by All, HR or CX.
- **Staff voices**: every written answer, searchable by question.
- **Training pathways**: a personal training card for each participant, plus workshop groups.
- **Automation setup**: the Power Automate collection flow.

### How training pathways work

Each person is matched by fixed rules (no AI), so results are consistent and explainable:

| Card section | Based on |
|---|---|
| Level: Starter, Practitioner or Builder | Comfort ratings and AI tools already used |
| Three practice activities | Tasks they want help with, their inputs and outputs, and words in their written answers, matched to `activities.js` |
| Data safety level | The types of sensitive information they handle |
| Capstone challenge | The workflow they said they want to build |
| Workshop group | Level and department; groups smaller than three are merged |

Use **Print all cards** to print or save every card as a PDF, and **Download group list** for a spreadsheet of who is in which group.

To change or add activities, edit `activities.js`. Each activity has a title, department, levels, tags, scenario, prompt and quality check; instructions are at the top of the file.

Names appear on cards only if the form records them (Forms settings → Record name). Otherwise participants are numbered.

## Files

| File | Use |
|---|---|
| `forms/JPS_AI_Needs_Assessment_MSForms_Import.docx` | Microsoft Forms Quick Import file for the needs assessment |
| `forms/AI_Discovery_Form_HR.docx` | Printable HR discovery form |
| `forms/AI_Discovery_Form_Customer_Experience.docx` | Printable Customer Experience discovery form |
| `practice/` | Fictional spreadsheets and a sample policy used by the activities |
| `activities.js` | The activity library behind the training pathways |
| `images/Forms_Theme_*.jpg` | Background images for the Forms theme (Style → Customize theme) |

## Importing the form

1. In Microsoft Forms, choose **Quick Import** and upload the JPS import file, as a Form (not a Quiz).
2. Turn on **Multiple answers** for every "Select all that apply" question.
3. Switch questions 3, 4, 5, 9 and 18 to **Long answer**, and mark key questions as **Required**.
4. Under **Style**, upload a theme image and set the colour to `#0E7C86`.

## Privacy

Do not commit survey responses to this repository. Spreadsheet and CSV files are ignored by `.gitignore` for that reason, except the fictional files in `practice/`.
