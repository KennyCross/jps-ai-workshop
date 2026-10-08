/*
  JPS AI Workshop: activity library
  ---------------------------------
  Each activity is one practice exercise. The dashboard's "Training pathways" view picks
  three activities for each person based on their survey answers.

  Fields
    id        unique short name
    title     what the participant sees
    dept      "HR", "CX" or "All"
    levels    any of "Starter", "Practitioner", "Builder"
    tags      what the activity practises; the first tag is its main one.
              Allowed: email, summarise, excel, reports, presentations, minutes,
                       customer, forms, research, scheduling
    minutes   rough time for the exercise
    scenario  the situation, in plain language
    prompt    a ready-to-use prompt; every name and number in it is fictional
    check     what a good result looks like
    file      optional practice file in the practice/ folder

  To add an activity, copy one block, change the text, and keep the commas between blocks.
*/
window.ACTIVITIES = [

/* ---------------- Human Resources ---------------- */
{
  id: "hr-leave-reply", title: "Answer a leave question from the handbook",
  dept: "HR", levels: ["Starter", "Practitioner"], tags: ["email", "customer"], minutes: 15,
  scenario: "A staff member emails asking whether unused vacation days roll over to next year. The answer is in the leave policy, but writing a clear, friendly reply takes time.",
  prompt: "You are an HR officer at a Jamaican utility company. Using only the policy extract below, draft a reply to the staff member's question.\n\nPolicy extract: Employees may carry over up to 5 unused vacation days into the next calendar year. Carried-over days must be used by 31 March. Days above 5 are forfeited unless a manager approves an exception in writing.\n\nQuestion: \"Hi, I still have 8 vacation days left. Will I lose them in January?\"\n\nKeep it under 120 words, warm and clear, and end with the next step they should take. Then list anything in the question the policy does not answer.",
  check: "The reply gives the right numbers (5 carried over, 3 at risk), mentions the 31 March deadline and the manager exception, and invents nothing that is not in the policy."
},
{
  id: "hr-jd", title: "Draft a job description from a short brief",
  dept: "HR", levels: ["Starter", "Practitioner"], tags: ["email", "research"], minutes: 20,
  scenario: "A manager sends three lines about a new Customer Data Analyst role. HR needs a full, consistent job description before the role can be advertised.",
  prompt: "You are an HR recruitment specialist. Turn the brief below into a job description with these sections: Purpose of the role, Key responsibilities (6 to 8 bullets), Qualifications and experience, Skills, Reporting line.\n\nBrief: \"Need someone to pull customer and billing data from our systems, build monthly Excel and Power BI reports for the CX manager, and spot trends in complaints. Degree in a numbers field. 2+ years experience.\"\n\nUse plain, inclusive language. Do not invent a salary or benefits. Mark anything you had to assume with [CHECK].",
  check: "Every responsibility traces back to the brief, assumptions are flagged with [CHECK], and the language avoids anything that could put off qualified applicants."
},
{
  id: "hr-cv-summary", title: "Summarise CVs against the role criteria",
  dept: "HR", levels: ["Practitioner", "Builder"], tags: ["summarise", "forms"], minutes: 20,
  scenario: "Sixty applications arrive for one role. You want a consistent first summary of each CV so that the shortlisting panel can compare them quickly. The decision stays with people.",
  prompt: "You are helping an HR panel compare applicants. Below are the role criteria and one anonymised CV.\n\nCriteria: (1) degree in business, statistics or IT; (2) 2+ years working with Excel reports; (3) customer service experience; (4) experience with Power BI or similar.\n\nCV (Applicant A): BSc Management Studies, 2021. Customer Service Representative, 2021-2023: handled billing queries, tracked call volumes in Excel. Reporting Assistant, 2023-now: builds weekly Excel dashboards for the operations team; completed a Power BI short course.\n\nFor each criterion say Met, Partly met or Not shown, with the evidence from the CV. Do not give an overall score or recommendation.",
  check: "Each criterion is judged only on what the CV says, with evidence quoted, and there is no ranking or hire/reject advice. The panel still makes the decision."
},
{
  id: "hr-onboarding", title: "Build a new-hire welcome email and first-week checklist",
  dept: "HR", levels: ["Starter", "Practitioner"], tags: ["email", "scheduling"], minutes: 15,
  scenario: "Every new hire gets the same welcome email and checklist, rewritten by hand each time.",
  prompt: "You are an HR onboarding coordinator. Create two things for a new Customer Service Representative starting on Monday:\n1. A welcome email (under 150 words) covering start time 8:00 a.m., reporting to the Customer Care Supervisor, and bringing ID and banking details for payroll forms.\n2. A first-week checklist, day by day, covering IT setup, policy reading, system training and shadowing a senior representative.\n\nUse [Name], [Date] and [Supervisor] as placeholders so this can be reused.",
  check: "Both pieces are friendly and complete, use placeholders instead of real names, and could be reused for the next hire with no rewriting."
},
{
  id: "hr-review-wording", title: "Turn manager notes into fair review wording",
  dept: "HR", levels: ["Practitioner"], tags: ["summarise", "reports"], minutes: 15,
  scenario: "A manager's performance notes are blunt and unstructured. HR needs balanced, specific wording for the review form.",
  prompt: "You are an HR business partner. Rewrite these anonymised manager notes into three sections for a performance review: Strengths, Areas to develop, Agreed goals for next quarter.\n\nNotes: \"good with customers, gets thanks emails. late with weekly reports most weeks. doesn't use the tracker properly so numbers are wrong. wants to learn Excel more. would be a good trainer for new staff\"\n\nBe specific, factual and respectful. Do not add anything that is not in the notes. Suggest two measurable goals.",
  check: "The tone is fair and professional, every point traces back to the notes, and the goals are measurable (for example, weekly report submitted by Friday at noon)."
},
{
  id: "hr-policy-faq", title: "Turn a policy into a staff FAQ",
  dept: "HR", levels: ["Starter", "Practitioner", "Builder"], tags: ["summarise", "customer"], minutes: 20,
  scenario: "Staff keep asking HR the same questions about the hybrid work policy, even though the answers are in the document.",
  prompt: "You are an HR communications officer. Read the attached hybrid work policy and write an FAQ of 8 questions staff are most likely to ask, each with a short answer (no more than 3 sentences) taken directly from the policy. Add the policy section number after each answer. If the policy does not answer a common question, list it separately under \"Questions to raise with HR leadership\".",
  check: "Answers match the policy exactly and cite the section, nothing is invented, and gaps in the policy are flagged rather than filled in.",
  file: "practice/Sample_Hybrid_Work_Policy.docx"
},
{
  id: "hr-training-quiz", title: "Create a training handout and quiz",
  dept: "HR", levels: ["Practitioner", "Builder"], tags: ["presentations", "research"], minutes: 20,
  scenario: "HR needs a short refresher on the hybrid work policy for all staff, with a quiz to confirm understanding.",
  prompt: "You are a training officer. Using the hybrid work policy attached, create:\n1. A one-page handout with 5 key points in plain language.\n2. A 6-question multiple-choice quiz with 4 options each, the correct answer marked, and a one-line explanation.\n\nAim it at staff who read on their phones: short sentences, no jargon.",
  check: "Every quiz answer is supported by the policy, wrong options are plausible, and the handout is short enough to read on a phone.",
  file: "practice/Sample_Hybrid_Work_Policy.docx"
},
{
  id: "hr-absence-brief", title: "Analyse an absence spreadsheet and write a brief",
  dept: "HR", levels: ["Practitioner", "Builder"], tags: ["excel", "reports"], minutes: 25,
  scenario: "Each quarter HR summarises absence data for management. It takes hours of filtering and charting in Excel.",
  prompt: "You are an HR analyst. Using the attached absence spreadsheet (fictional data, employees identified by code only):\n1. Total days absent by department and by reason.\n2. The three departments with the highest absence, and whether any month stands out.\n3. A management brief of under 200 words with two practical recommendations.\n\nShow the figures you used so I can check them in Excel.",
  check: "The totals match what you get with a quick Excel pivot table, the brief is under 200 words, and recommendations follow from the numbers.",
  file: "practice/HR_Absence_Sample.xlsx"
},
{
  id: "hr-interviews", title: "Plan an interview day and questions",
  dept: "HR", levels: ["Starter", "Practitioner"], tags: ["scheduling", "email"], minutes: 15,
  scenario: "Five candidates, three panel members, one day. Planning the timetable and questions usually takes several emails.",
  prompt: "You are an HR recruitment coordinator. Plan an interview day for a Customer Data Analyst role:\n- 5 candidates, 45-minute interviews, 15-minute breaks between, lunch 12:30 to 1:15, start 9:00 a.m.\n- Panel: [Panel member 1], [Panel member 2], [Panel member 3].\nGive me a timetable as a table, then 8 interview questions (4 competency, 2 technical Excel, 2 customer focus) with what a strong answer would include.",
  check: "The timetable adds up with no overlaps, and the questions are fair, job-related and the same for every candidate."
},
{
  id: "hr-flow-leave", title: "Design an automated leave-request flow",
  dept: "HR", levels: ["Builder"], tags: ["forms", "scheduling"], minutes: 30,
  scenario: "Leave requests arrive by email, are checked by hand against a tracker, and the reply is typed manually.",
  prompt: "You are a Microsoft 365 automation designer. Design a Power Automate flow for leave requests:\n- Trigger: a Microsoft Form (employee code, leave type, start date, end date, reason).\n- Steps: look up the remaining balance in an Excel table, send an approval to the manager, update the tracker, email the employee the outcome.\nList each Power Automate action by its name, what it does, and where a person must approve. Then list three things that could go wrong and how the flow should handle each.",
  check: "Each step names a real Power Automate action, the manager approval stays with a person, and errors (such as insufficient balance) are handled rather than ignored."
},

/* ---------------- Customer Experience ---------------- */
{
  id: "cx-billing-reply", title: "Reply calmly to a billing complaint",
  dept: "CX", levels: ["Starter", "Practitioner"], tags: ["customer", "email"], minutes: 15,
  scenario: "A customer is upset about a bill that is much higher than usual. You need a reply that is calm, accurate and offers a clear next step.",
  prompt: "You are a customer care lead at a Jamaican electricity utility. Draft a reply to this anonymised complaint.\n\nComplaint: \"My bill this month is nearly double last month and nobody has read my meter in months. This is ridiculous, I want it fixed now.\"\n\nWhat we know: the last two bills were estimated; an actual meter reading is scheduled within 5 working days; any overcharge will be credited on the next bill.\n\nApologise once, explain estimated billing in one plain sentence, give the next steps, and keep it under 130 words. Do not promise anything not listed above.",
  check: "The reply acknowledges the frustration without over-apologising, explains estimated billing simply, and promises only what is listed."
},
{
  id: "cx-tone", title: "Rewrite a blunt reply in the right tone",
  dept: "CX", levels: ["Starter"], tags: ["customer", "email"], minutes: 10,
  scenario: "A quick reply written in a rush can sound rude. AI can help adjust the tone while keeping the facts.",
  prompt: "Rewrite this reply to a customer so it sounds friendly and professional, keeps every fact, and stays under 80 words:\n\n\"We already told you the reconnection takes 24 hours after payment. You paid at 6 pm so it will be tomorrow. Please stop calling.\"\n\nThen give me a second, shorter version suitable for WhatsApp.",
  check: "Both versions keep the facts (24 hours, payment at 6 p.m., reconnection tomorrow) and remove the blame without becoming over-long."
},
{
  id: "cx-call-notes", title: "Turn rough call notes into a case note and follow-up",
  dept: "CX", levels: ["Starter", "Practitioner"], tags: ["minutes", "customer", "summarise"], minutes: 15,
  scenario: "After a long call, you have scribbled notes and must write a proper case note and a follow-up message.",
  prompt: "You are a customer care agent. Turn these rough notes into (1) a case note with Issue, Actions taken, Outcome and Next step, and (2) a short follow-up text to the customer.\n\nNotes: \"cust called re power out since yesterday 3pm, Spanish Town area. checked - not on planned outage list. logged fault ref [REF]. told crew dispatch within 24hrs. cust has medical equipment at home - flagged priority. will call back by 10am tmrw\"\n\nUse [Customer] and [REF] as placeholders. Keep the follow-up text under 50 words.",
  check: "Nothing is lost from the notes (including the priority flag and the callback time), no new facts appear, and the text message is short and clear."
},
{
  id: "cx-answer-bank", title: "Build an answer bank from repeated questions",
  dept: "CX", levels: ["Practitioner", "Builder"], tags: ["customer", "summarise"], minutes: 20,
  scenario: "Agents answer the same questions all day, but answers vary from person to person.",
  prompt: "You are a customer care knowledge manager. Create an answer bank for these frequent questions. For each, write a short phone answer (2 sentences) and a WhatsApp answer (under 40 words):\n1. Why is my bill estimated?\n2. How long does reconnection take after payment?\n3. How do I report a fallen power line?\n4. How do I apply for a new connection?\n5. Why is there an outage in my area?\n\nWhere you are not sure of the company's exact procedure, write [CONFIRM WITH SUPERVISOR] instead of guessing.",
  check: "Answers are consistent and short, safety questions (like fallen lines) tell people to keep away and call immediately, and unknown procedures are flagged rather than invented."
},
{
  id: "cx-feedback-themes", title: "Find the themes in customer feedback",
  dept: "CX", levels: ["Practitioner", "Builder"], tags: ["excel", "summarise", "reports"], minutes: 20,
  scenario: "A survey produced 30 customer comments. Reading them one by one hides the patterns.",
  prompt: "You are a customer insights analyst. Read the 30 comments in the attached file (fictional). Group them into no more than 6 themes. For each theme give: a name, how many comments fall into it, whether it is mostly positive or negative, and one short example in your own words. Finish with the two themes management should act on first, and why.",
  check: "Every comment is counted once, the counts add up to 30, and the priorities follow from the themes rather than from guesswork.",
  file: "practice/CX_Feedback_Comments.xlsx"
},
{
  id: "cx-weekly-report", title: "Turn complaint data into a weekly management update",
  dept: "CX", levels: ["Practitioner", "Builder"], tags: ["excel", "reports"], minutes: 25,
  scenario: "Every Monday someone pulls complaint numbers into a report by hand.",
  prompt: "You are a CX reporting analyst. Using the attached complaints spreadsheet (fictional data):\n1. Count complaints by category and by channel.\n2. Give the average days to resolve for each category, and the number still open.\n3. Write a management update of under 180 words: what changed, what needs attention, one recommendation.\n\nShow the figures as a small table so I can check them against Excel.",
  check: "Counts and averages match a quick Excel check, the update is short, and the recommendation is tied to a specific number.",
  file: "practice/CX_Complaints_Sample.xlsx"
},
{
  id: "cx-escalation", title: "Write an escalation summary for a supervisor",
  dept: "CX", levels: ["Starter", "Practitioner"], tags: ["summarise", "customer"], minutes: 10,
  scenario: "A supervisor needs to understand a long-running case in 30 seconds before calling the customer back.",
  prompt: "You are a senior customer care agent. Summarise this case for a supervisor in 5 bullet points: what happened, what has been tried, what the customer wants, the risk if unresolved, and the decision needed.\n\nCase history: First contact 3 weeks ago about a meter that was replaced but the old reading is still being billed. Two calls since, each told it would be corrected. Third bill still wrong. Customer has now posted on social media and is asking for a written apology and a full refund of the difference. Billing team says the correction needs supervisor sign-off.",
  check: "Five clear bullets, the decision needed is obvious, and the tone is neutral, without blaming the customer or colleagues."
},
{
  id: "cx-service-update", title: "Write a plain-language service update",
  dept: "CX", levels: ["Starter", "Practitioner"], tags: ["customer", "email"], minutes: 15,
  scenario: "Planned maintenance will interrupt supply in several communities. The notice must be clear on every channel.",
  prompt: "You are a customer communications officer at an electricity utility. Write three versions of a planned maintenance notice:\n1. A social media post (under 60 words).\n2. A WhatsApp broadcast (under 40 words).\n3. A short script for agents answering calls.\n\nDetails (fictional): Saturday, 7:00 a.m. to 3:00 p.m., communities: [Community A], [Community B], [Community C]; reason: upgrading equipment to improve reliability. Tell customers to treat lines as live at all times.",
  check: "All three versions carry the same date, time and safety message, and they use plain language with no technical jargon."
},
{
  id: "cx-flow-triage", title: "Design an automated enquiry-sorting flow",
  dept: "CX", levels: ["Builder"], tags: ["forms", "customer"], minutes: 30,
  scenario: "Online enquiries land in one inbox and are sorted by hand before anyone can reply.",
  prompt: "You are a Microsoft 365 automation designer. Design a Power Automate flow for online customer enquiries:\n- Trigger: a new Microsoft Form submission (category chosen by the customer, description, preferred contact method).\n- Steps: use an AI step to suggest a category and urgency, add a row to a tracking list, post urgent cases to the supervisor's Teams channel, and draft (not send) a reply for an agent to review.\nList each action by name and mark clearly where a person must review. Then list what information must never be passed to the AI step.",
  check: "A person reviews every reply before it is sent, urgent safety issues bypass the queue, and personal details such as account numbers are kept out of the AI step."
},

/* ---------------- All staff ---------------- */
{
  id: "all-minutes", title: "Turn meeting notes into minutes and action items",
  dept: "All", levels: ["Starter", "Practitioner"], tags: ["minutes", "summarise"], minutes: 15,
  scenario: "Typing up minutes after every meeting eats into the afternoon.",
  prompt: "You are a team administrator. Turn these rough notes into formal minutes with: Attendees, Decisions, Action items (owner, due date) and Items carried forward.\n\nNotes: \"Team mtg Tues. [Person A], [Person B], [Person C]. agreed new weekly report template from next Monday - B to share. complaint backlog 42, target under 20 by month end - A to review with supervisors Friday. training dates still TBC - C to check with HR. next mtg 2 wks\"\n\nUse a table for the action items. Do not add anything that is not in the notes.",
  check: "Every decision and action from the notes appears, each action has an owner and a date, and nothing new is invented."
},
{
  id: "all-doc-summary", title: "Summarise a long document into a one-page brief",
  dept: "All", levels: ["Starter", "Practitioner"], tags: ["summarise", "reports"], minutes: 15,
  scenario: "You need the key points of a long policy or report before a meeting, without reading every page twice.",
  prompt: "You are an executive assistant. Summarise the attached policy into a one-page brief with: Purpose (2 sentences), 5 key points, What changes for staff, and Questions to ask. Quote the section number for each key point. If something is unclear in the document, say so rather than guessing.",
  check: "The brief fits on one page, every key point cites a section, and nothing appears that is not in the document.",
  file: "practice/Sample_Hybrid_Work_Policy.docx"
},
{
  id: "all-excel-brief", title: "Analyse a spreadsheet and produce a management brief",
  dept: "All", levels: ["Practitioner", "Builder"], tags: ["excel", "reports"], minutes: 25,
  scenario: "Raw data arrives in Excel and someone has to turn it into a short story for management.",
  prompt: "You are a business analyst. Look at the attached spreadsheet (fictional data). First describe what the columns contain and check for gaps or odd values. Then find the 3 most important patterns, with the numbers behind each. Finish with a management brief of under 150 words and one chart you would recommend (say what goes on each axis).",
  check: "The data check catches any blanks or odd values, the patterns are backed by figures you can verify, and the brief is short.",
  file: "practice/CX_Complaints_Sample.xlsx"
},
{
  id: "all-slides", title: "Outline a short presentation from a report",
  dept: "All", levels: ["Practitioner"], tags: ["presentations", "reports"], minutes: 15,
  scenario: "You have to present a report's findings to your team in five minutes.",
  prompt: "You are a presentation coach. Using the attached policy, outline a 5-slide presentation for front-line staff: a title for each slide, 3 bullet points of no more than 8 words each, and one sentence of speaker notes. Make the last slide about what staff should do next.",
  check: "Five slides, short bullets, a clear call to action at the end, and every point traceable to the source document.",
  file: "practice/Sample_Hybrid_Work_Policy.docx"
},
{
  id: "all-inbox", title: "Sort and prioritise a busy inbox",
  dept: "All", levels: ["Starter", "Practitioner"], tags: ["email", "scheduling"], minutes: 15,
  scenario: "Twenty unread emails and no time. AI can help decide what needs attention first.",
  prompt: "You are my assistant. Here are the subject lines and first lines of today's emails (fictional):\n1. \"Urgent: report needed by 2pm\" - Manager asking for this week's figures.\n2. \"Lunch on Friday?\" - colleague.\n3. \"Policy update - please read\" - HR.\n4. \"Customer escalation\" - supervisor asking for case details today.\n5. \"Newsletter\" - internal comms.\n\nSort them into Do now, Do today, Later and No action. For the two most urgent, draft a one-line reply each.",
  check: "Deadlines and escalations come first, the replies are short and polite, and you would agree with the order."
},
{
  id: "all-research", title: "Research a question and check the sources",
  dept: "All", levels: ["Practitioner", "Builder"], tags: ["research", "summarise"], minutes: 20,
  scenario: "You need a quick, reliable overview of a topic, for example good practice in customer satisfaction surveys.",
  prompt: "You are a research assistant. Give me a short overview (under 200 words) of good practice for running customer satisfaction surveys at a utility company. Then list 3 sources I could check, and say for each claim how confident you are. If you are not sure a source exists, say so.",
  check: "You open and verify each source before trusting it. This activity is about learning that AI can sound confident and still be wrong."
},
{
  id: "all-template", title: "Turn your best prompt into a reusable template",
  dept: "All", levels: ["Practitioner", "Builder"], tags: ["email", "reports", "customer"], minutes: 15,
  scenario: "You have found a prompt that works. Now make it reusable for the whole team.",
  prompt: "Here is a prompt that works well for me: [paste your prompt from an earlier activity].\n\nTurn it into a reusable template: replace everything that changes each time with [BRACKETED PLACEHOLDERS], add a one-line instruction at the top saying when to use it, and add a checklist of 3 things to review before using the output.",
  check: "Someone else in your team could use the template without asking you anything, and the review checklist is specific."
},
{
  id: "all-agenda", title: "Plan a meeting agenda and briefing note",
  dept: "All", levels: ["Starter"], tags: ["scheduling", "email"], minutes: 10,
  scenario: "You have been asked to organise a one-hour team meeting about reducing the complaint backlog.",
  prompt: "You are a team coordinator. Create a one-hour meeting agenda about reducing a complaint backlog from 42 to under 20 cases. Include timings for each item, who should lead it ([Lead 1], [Lead 2]) and the decision needed. Then write a 3-sentence invitation email.",
  check: "Timings add up to 60 minutes, each item has an owner and a purpose, and the invitation is short."
},
{
  id: "all-form-flow", title: "Build a form-to-Excel-to-Teams flow",
  dept: "All", levels: ["Builder"], tags: ["forms", "reports"], minutes: 30,
  scenario: "Requests come in by email in different formats. A form plus a simple flow would make them consistent and trackable.",
  prompt: "You are a Microsoft 365 automation designer. Help me build my first Power Automate flow, step by step:\n1. A Microsoft Form for a simple internal request (requester's department, request type, details, needed-by date).\n2. When a response is submitted, add a row to an Excel table on SharePoint.\n3. Post a summary in a Teams channel.\nFor each step, tell me exactly which action to choose and which fields to map. Use fictional test data to check it works.",
  check: "You can submit a test response and see it appear in Excel and Teams within a minute, using fictional data only."
}

];
