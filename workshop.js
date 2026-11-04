/*
  AI Workshop: workshop-day content
  ---------------------------------
  What participants see on the "Workshop day" page: every block of the HR and CX
  workshops in running order, with the scenario, the practice material and ready-to-copy
  prompts. Answers are deliberately NOT here: several exercises contain planted mistakes
  for participants to find. Answers live in the facilitator activity cards.

  Fields per block
    id       short unique name
    time     start time from the beginning of the session
    title    what the participant sees
    minutes  length of the block
    cisco    the Cisco Introduction to Modern AI lessons it builds on
    intro    one or two sentences on what to do
    parts    list of {h: heading, text: material to read, prompt: text to copy}
    alt      optional alternate task (HR staff who don't recruit)

  Everything here is made up. Never replace it with real staff or customer data.
*/
window.WORKSHOPS = {

/* ======================= Human Resources ======================= */
HR: {
  title: "Filling a vacancy",
  scenario: "A Customer Service Representative post in the contact centre is vacant. Over the session you take it from the manager's three-line brief to the new hire's first week. Everything is made up: the manager is \"Supervisor B\" and the applicants are Applicant A, B and C.",
  blocks: [
  { id: "hr-warmup", time: "0:10", title: "Warm-up: spot the made-up rule", minutes: 10, cisco: "1.3.4, 1.3.7",
    intro: "An AI tool wrote the answer below. Two statements in it are not in the policy. Find them with your partner before you use the AI.",
    parts: [
      { h: "Policy extract", text: "Employees may carry over up to 5 unused vacation days into the next calendar year. Carried-over days must be used by 31 March. Days above 5 are forfeited unless a manager approves an exception in writing." },
      { h: "Question", text: "\"Hi, I still have 8 vacation days left. Will I lose them in January?\"" },
      { h: "AI answer", text: "Hi, thanks for checking. Good news: you can carry over up to 5 of your 8 days into next year, and you don't need to do anything, as carry-over happens automatically. Just remember to use them by 31 March. The other 3 days will be paid out with your January salary. If you need to keep more than 5, ask your manager to approve an exception in writing. Kind regards, HR" },
      { h: "Step 2: paste all three into Claude, then send", prompt: "Check the answer above against the policy extract only. List every statement in the answer that the policy does not support, and say what the policy actually says. Do not use any outside knowledge." }
    ] },
  { id: "hr-data", time: "0:20", title: "Data rules drill", minutes: 10, cisco: "Data rules",
    intro: "Part A without the AI: sort each item into Share, Anonymise first or Never share. Part B: rewrite both texts so they could go into an AI tool and still do their job. You remove the details yourself, before anything is pasted.",
    parts: [
      { h: "Part A: sort these", text: "The leave policy · A draft job advert · A CV · Staff survey comments with names removed · The salary scale for a role · A medical certificate · A disciplinary letter · Interview questions · A payroll export" },
      { h: "Part B: CV extract (made up)", text: "Tanya-Marie Richards · TRN 123-456-789 · 14 Sample Avenue, Kingston · 876-555-0142 · born 12 April 1996. Customer Service Agent at a telecoms company, 2021 to 2024: handled billing and fault calls, top agent for customer satisfaction in 2023." },
      { h: "Part B: leave email (made up)", text: "Hi, it's Marlon Brown in Billing, employee no. 40217. My doctor says I need knee surgery next month, so I need three weeks off from 5 to 23 May. How much sick leave do I have left?" }
    ] },
  { id: "hr-desk", time: "0:30", title: "Build your desk: the HR Policy Desk", minutes: 10, cisco: "1.5.2 RAG",
    intro: "Set up a Claude Project once and every chat inside it answers from your documents. In Claude: Projects, then Create project, named HR Policy Desk. Add practice/Sample_Hybrid_Work_Policy.docx and practice/HR_Leave_Policy_Extract.txt, then paste the instructions below. ChatGPT Projects, Copilot Notebooks and Gemini Gems work the same way.",
    parts: [
      { h: "Project instructions", prompt: "You are an HR assistant at a Jamaican utility company. Answer only from the documents in this project. Give the section number for every answer. If the documents do not answer a question, say \"The policy doesn't say\" and list the question for HR to confirm. Never guess about pay, leave balances or eligibility. Write in plain, friendly English." },
      { h: "Test 1 (new chat in the project)", prompt: "How many vacation days can I carry over?" },
      { h: "Test 2", prompt: "Is there a gym allowance?" }
    ] },
  { id: "hr-ex1", time: "0:40", title: "1. Job description and advert", minutes: 30, cisco: "1.3.8, 1.4.6",
    intro: "Supervisor B sends HR three lines about the vacancy. Practitioners: write your own five-part prompt (Role, Task, Context, Format, Check) before you look at this one.",
    parts: [
      { h: "The brief", text: "Need 1 CSR for the contact centre. Handles calls, email and WhatsApp about bills, outages and new connections. Must stay calm with upset customers and be good on a computer. Shift work including some weekends. CXC English and Maths minimum; call centre experience a plus." },
      { h: "Step 1: job description", prompt: "Role: You are an HR recruitment specialist at a large Jamaican utility company.\nTask: Turn the manager's brief below into a full job description.\nContext: The brief is: \"Need 1 CSR for the contact centre. Handles calls, email and WhatsApp about bills, outages and new connections. Must stay calm with upset customers and be good on a computer. Shift work including some weekends. CXC English and Maths minimum; call centre experience a plus.\"\nFormat: Use these headings: Job title, Purpose of the role, Key responsibilities (6 to 8 bullets), Minimum qualifications, Preferred experience, Skills and attributes, Working hours, Reports to. Plain, inclusive language.\nCheck: Do not invent a salary, benefits or location. Mark anything you had to assume with [CHECK]. After the job description, list the questions I should ask the manager before it is published." },
      { h: "Step 2: advert (same chat)", prompt: "Now turn this job description into a job advert for social media and the careers page. Under 150 words, warm and direct, written to the reader (\"you\"). End with how to apply, using [Closing date] and [Application link] as placeholders. Keep every [CHECK] item out of the advert." },
      { h: "Step 3: make the file (same chat)", prompt: "Create this job description as a Word document with the same headings." }
    ],
    alt: { h: "Not in recruitment: training outline", text: "Brief: \"Need a half-day refresher for contact centre staff on handling billing disputes. Most are new. Must cover tone and the estimated-bill process.\"",
      prompt: "Role: You are a learning and development officer at a Jamaican utility.\nTask: Turn the manager's brief below into a half-day training outline.\nContext: [paste the brief]\nFormat: 3 to 5 learning outcomes, then a timed agenda as a table, then one practice activity.\nCheck: Mark any assumption with [CHECK]. Do not invent company procedures; leave [PROCEDURE] where one is needed." } },
  { id: "hr-ex2", time: "1:10", title: "2. Screening three CVs", minutes: 30, cisco: "1.4.3, 1.4.7, 1.4.9",
    intro: "The panel wants the same summary of each application. The AI lays out evidence; the panel decides.",
    parts: [
      { h: "Criteria", text: "1. CXC passes in English and Maths\n2. Experience dealing with customers\n3. Comfortable using computer systems\n4. Available for shift work, including weekends\n5. Preferred: call centre experience" },
      { h: "Applicant A", text: "CXC: English Grade II, Mathematics Grade III, Office Administration Grade I. Customer Service Agent, telecoms call centre, 2021 to 2024: billing and fault calls by phone and live chat; logged cases in a CRM ticketing system; highest customer satisfaction score on the team in 2023. Available for rotating shifts." },
      { h: "Applicant B", text: "CXC: English Grade I, Principles of Business Grade II. Cashier, supermarket, 2020 to 2024: handled payments and returns, trained new cashiers. Volunteer, church office: data entry in Excel. Would prefer weekday work." },
      { h: "Applicant C", text: "Associate degree in Business Administration, 2023. CXC: English Grade I, Mathematics Grade II. Administrative assistant, law office, 2023 to now: answers phones, schedules appointments, uses Word and Outlook daily." },
      { h: "Prompt", prompt: "Role: You are helping an HR shortlisting panel. You lay out evidence; you do not make decisions.\nTask: Compare each applicant below against the five criteria.\nContext: [paste the criteria and the three CVs]\nFormat: One table per applicant with columns Criterion, Rating (Met, Partly met or Not shown) and Evidence (quoted from the CV).\nCheck: Use only what the CV says. Do not rank the applicants, give an overall score or recommend anyone. List what the panel should ask each applicant at interview to fill the gaps." },
      { h: "Part 2: another AI tool wrote this about Applicant B. Find two errors.", text: "Applicant B. 1. English and Maths: Met (CXC English Grade I, Mathematics Grade II). 2. Customers: Met (cashier). 3. Computer systems: Partly met (Excel). 4. Shifts: Partly met (prefers weekdays). 5. Call centre: Partly met (some call centre experience)." }
    ],
    alt: { h: "Not in recruitment: compare training proposals", text: "Criteria: under $160,000; on site; certificate on completion; 2 days or less; references from another utility.\nProvider A: 2 days, on site, certificate, $180,000.\nProvider B: 1 day online, recordings included, no certificate, $90,000.\nProvider C: 2 days, on site, certificate, $150,000, references from two utilities.\nUse the screening prompt above, with \"proposal\" in place of \"CV\"." } },
  { id: "hr-ex3", time: "1:55", title: "3. Interviews", minutes: 25, cisco: "1.4.11",
    intro: "Part A builds a fair question bank. Part B is practice: one partner interviews, Claude plays Applicant B, the other partner watches. Ask at least 4 questions, including one about weekend shifts, then type END INTERVIEW.",
    parts: [
      { h: "Part A: question bank", prompt: "Role: You are an HR recruitment specialist.\nTask: Write a structured interview for the Customer Service Representative role, the same for every candidate.\nContext: [paste the job description from Exercise 1, or the five criteria from Exercise 2]\nFormat: 8 questions: 4 about past behaviour (\"Tell me about a time...\"), 2 about computer systems, 2 about handling customers. For each, give what a strong answer includes and one follow-up question.\nCheck: Every question must relate to the job. Flag any question that could touch on age, family, religion, health or other personal matters." },
      { h: "Part B: mock interview (new chat)", prompt: "You are Applicant B in a job interview for a Customer Service Representative post at a utility company. Your background: CXC English Grade I and Principles of Business Grade II; cashier at a supermarket 2020 to 2024, where you handled payments and returns and trained new cashiers; volunteer data entry in Excel at a church office. You would prefer weekday work.\n\nStay in character. Answer the way a real candidate would: give some strong answers and some vague ones that need a follow-up. If you are asked about weekend work, mention that you have two young children. Do not give feedback until I type END INTERVIEW. Then step out of character and give me feedback on my interviewing: which questions were open or leading, whether I followed up on vague answers, and whether any question strayed from the job." }
    ],
    alt: { h: "Not in recruitment: a difficult conversation (new chat)", prompt: "You are a staff member at a utility company. You are upset because your payslip shows a deduction you don't recognise. Stay in character and react like a real person: calmer if I listen and explain the process, more upset if I brush you off. Do not give feedback until I type END. Then step out of character and tell me whether I listened, explained the next step clearly, and avoided discussing amounts or other people's pay." } },
  { id: "hr-ex4", time: "2:20", title: "4. Offer to first week", minutes: 25, cisco: "1.4.6",
    intro: "The panel has chosen. Write to the new hire and to the applicants who were not chosen. Each piece becomes a template.",
    parts: [
      { h: "Step 1: welcome pack", prompt: "Role: You are an HR onboarding coordinator at a Jamaican utility company.\nTask: Create a reusable welcome pack for a new Customer Service Representative.\nContext: They start at 8:00 a.m. on [Start date], report to [Supervisor] in the Contact Centre, and must bring photo ID, their TRN card and banking details for the payroll forms.\nFormat: 1) A welcome email under 150 words. 2) A day-by-day checklist for the first week covering IT setup, reading key policies, system training and shadowing a senior representative.\nCheck: Use [Name], [Start date] and [Supervisor] as placeholders; never invent names. List anything HR must confirm before sending." },
      { h: "Step 2: the checklist as a file (same chat)", prompt: "Create the first-week checklist as a Word document with a tick box beside each item." },
      { h: "Step 3: regret letter (same chat)", prompt: "Now write a short, kind letter to applicants who were not selected. Thank them, tell them clearly that they were not chosen this time, and invite them to apply for future roles. Do not give reasons for the decision. Use [Name] and [Role] as placeholders. Under 120 words." }
    ],
    alt: { h: "Not in recruitment: benefits enrolment reminder", prompt: "Role: You are an HR benefits officer.\nTask: Write a reminder email about the health insurance open enrolment deadline, and a 5-question FAQ.\nContext: Deadline [Date]. Forms go to [Contact]. Changes take effect [Effective date].\nFormat: Email under 150 words; FAQ answers of no more than 2 sentences each.\nCheck: Use placeholders for every date, name and amount. Do not invent plan details; write [CONFIRM] instead." } },
  { id: "hr-ex5", time: "2:45", title: "5. Questions from the new hire", minutes: 20, cisco: "1.4.1, 1.3.4",
    intro: "Everyone does this one, inside your HR Policy Desk (or attach practice/Sample_Hybrid_Work_Policy.docx to a normal chat). The new representative emails HR four questions.",
    parts: [
      { h: "The questions", text: "1. Can I work from home two days a week?\n2. Will the company pay for my internet if I work from home?\n3. Can I use ChatGPT at home to help me write customer emails?\n4. If hybrid work doesn't suit me, how do I stop?" },
      { h: "Step 1: answer them", prompt: "Role: You are an HR officer answering a new employee.\nTask: Answer the four questions below.\nContext: The employee is a Customer Service Representative in the Contact Centre who started this week. Use only the attached hybrid work policy.\nFormat: One short answer per question, with the policy section number in brackets. Then a friendly reply email under 180 words that covers all four.\nCheck: If the policy does not clearly answer a question for this employee, say so and do not guess. List those questions separately for HR to confirm.\n[paste the four questions]" },
      { h: "Step 2: staff FAQ (same chat)", prompt: "Now write an FAQ of the 8 questions staff are most likely to ask about this policy. Answer each in no more than 3 sentences, taken only from the policy, with the section number. Under a separate heading \"Questions to raise with HR leadership\", list common questions the policy does not answer." }
    ] },
  { id: "hr-own", time: "3:05", title: "Your own task", minutes: 30, cisco: "1.3.8",
    intro: "Pick one task you do at least once a week. Make a safe, made-up example, write a five-part prompt, test it twice with your partner checking, then turn it into a template and add it to your prompt kit.",
    parts: [
      { h: "Make it a template", prompt: "Here is a prompt that works well for me: [paste your prompt]. Turn it into a reusable template: replace everything that changes each time with [BRACKETED PLACEHOLDERS], add one line at the top saying when to use it, and add a checklist of 3 things to review before using the answer." }
    ] }
  ]
},

/* ======================= Customer Experience ======================= */
CX: {
  title: "The week after a major outage",
  scenario: "A storm on Saturday night has caused a wide outage. Over the session you handle the week that follows. The internal outage note below is the only source of facts all week: if it isn't in the note, the AI must not say it. Everything is made up.",
  note: "INTERNAL – Outage update, Monday 9:00 a.m. A storm on Saturday night damaged lines in [Parish A] and [Parish B]. About 18,000 customers are without power. Crews are repairing main lines first, then local lines. [Parish A]: main areas expected back by Tuesday evening. [Parish B]: damage still being assessed; no restoration estimate yet. Fallen lines have been reported in several communities: treat every line as live and report it to [Hotline]. Meter reading is suspended this week, so some bills will be estimated and adjusted after the next actual reading.",
  blocks: [
  { id: "cx-warmup", time: "0:10", title: "Warm-up: spot the guess", minutes: 10, cisco: "1.3.4, 1.3.7",
    intro: "An AI tool was given the outage note and asked for a social media post. Find every statement that is not in the note, before you use the AI.",
    parts: [
      { h: "The AI's post", text: "We know being without power is hard, and our crews are working around the clock to get you reconnected. Customers in [Parish A] can expect power back by Tuesday evening, and all of [Parish B] will be restored by Wednesday. As a thank-you for your patience, affected customers will receive a credit on their next bill. Please treat every fallen line as live and report it to [Hotline]." },
      { h: "Step 2: paste the note and the post into Claude, then send", prompt: "Check the post above against the internal note only. List every statement in the post that the note does not support, and say what the note actually says. Do not use any outside knowledge." }
    ] },
  { id: "cx-data", time: "0:20", title: "Data rules drill", minutes: 10, cisco: "Data rules",
    intro: "Part A without the AI: sort each item into Share, Anonymise first or Never share. Part B: rewrite the complaint so it could go into an AI tool and still do its job. Keep your cleaned version for Exercise 2.",
    parts: [
      { h: "Part A: sort these", text: "The internal outage note · A customer's complaint email · A customer's account number · A screenshot of a customer's bill · Survey comments with no names · A customer's payment card details · The weekly complaints spreadsheet with case IDs only · A call recording" },
      { h: "Part B: complaint (made up)", text: "From: d.campbell@example.com · Account 1234-5678-90 · Meter M-445566. I'm Donna Campbell of 22 Sample Lane, [Community]. My bill this month is $18,400, nearly double last month, and nobody has read my meter since the storm. My mother lives with me and uses an oxygen machine, so I can't afford to be disconnected. Call me on 876-555-0198." }
    ] },
  { id: "cx-desk", time: "0:30", title: "Build your desk: the CX Outage Desk", minutes: 10, cisco: "1.5.2 RAG",
    intro: "Set up a Claude Project once and every reply this week starts from the same facts and tone. In Claude: Projects, then Create project, named CX Outage Desk. Add practice/CX_Outage_Note.txt, then paste the instructions below. ChatGPT Projects, Copilot Notebooks and Gemini Gems work the same way. Exercises 1 to 4 run inside this desk.",
    parts: [
      { h: "Project instructions", prompt: "You are a customer care assistant at a Jamaican electricity company. Use only the facts in this project's documents. Never give a restoration time, amount, credit or date that is not in them; say \"we don't have that yet\" instead. Every message about outages includes: treat every fallen line as live and report it to [Hotline]. Tone: calm, warm, plain words, one apology at most, always a clear next step. Never include account numbers, names, addresses or phone numbers." },
      { h: "Test 1 (new chat in the project)", prompt: "When will [Parish B] be back on?" },
      { h: "Test 2", prompt: "Will customers get a credit?" }
    ] },
  { id: "cx-ex1", time: "0:40", title: "1. Service update for every channel (Monday)", minutes: 25, cisco: "1.4.6, 1.4.5",
    intro: "Customers need the same clear facts on every channel, and agents need a script.",
    parts: [
      { h: "Prompt", prompt: "Role: You are a customer communications officer at an electricity utility in Jamaica.\nTask: Turn the internal outage note below into customer messages.\nContext: [the outage note is in your Outage Desk; in a normal chat, paste it here]\nFormat: 1) An SMS under 160 characters. 2) A social media post under 60 words. 3) A call script for agents: a 2-sentence opening, then short answers to \"When will my power be back?\" for [Parish A] and for [Parish B], and \"What do I do about a fallen line?\"\nCheck: Use only facts in the note. Never give a time the note does not give. Every version must include the fallen-line safety message. Plain words: no \"feeders\", \"restoration\" or other jargon." },
      { h: "Follow-up (same chat)", prompt: "It is now Tuesday 6:00 p.m. Update: [Parish A] main areas are back on; some streets remain off because of local line damage; [Parish B] now expected by Thursday evening. Rewrite the SMS and the social post with this update." },
      { h: "Builder", text: "Ask for the social post in Jamaican Patois, then ask a fluent speaker in the room to judge it. Would you publish it?" }
    ] },
  { id: "cx-ex2", time: "1:05", title: "2. The contact surge (Tuesday)", minutes: 30, cisco: "1.4.3, 1.4.6",
    intro: "Three jobs, about ten minutes each.",
    parts: [
      { h: "Part A: rough call notes", text: "cust in [Parish B], power out since sat night. asked when back – told no estimate yet per mon update. reports fallen line on [Street] near school – logged hazard ref [REF], told keep away + keep kids away. elderly person w/ medical equip at home – flagged priority. promised call back after next update." },
      { h: "Part A prompt", prompt: "Role: You are a contact centre agent at an electricity utility.\nTask: Turn my rough call notes into (1) a case note with the headings Issue, Actions taken, Outcome and Next step, and (2) a follow-up SMS to the customer under 50 words.\nContext: [paste the notes]\nFormat: Case note in short bullet points; SMS in plain words.\nCheck: Keep every fact, including the hazard reference, the priority flag and the callback. Add nothing that is not in the notes. Use [Customer] and [REF] as placeholders." },
      { h: "Part B: reply to your cleaned complaint", prompt: "Role: You are a senior customer care agent at an electricity utility.\nTask: Write an email reply to the complaint below.\nContext: [paste your cleaned complaint]. What we know: meter reading is suspended this week because of the storm; some bills are estimated and will be adjusted after the next actual reading.\nFormat: Under 140 words. Acknowledge the frustration once, explain estimated billing in one plain sentence, then give the next steps.\nCheck: Do not promise anything not listed above. If the customer asks something we have not answered, such as about disconnection, say the agent will confirm and call back. Do not invent a date." },
      { h: "Part C: a blunt reply", text: "As we posted already, [Parish B] has no time yet. Calling again won't make it faster. Check our page." },
      { h: "Part C prompt", prompt: "Rewrite this reply so it is friendly and professional, keeps every fact, and is under 60 words. Then give a version under 30 words for WhatsApp." }
    ] },
  { id: "cx-ex3", time: "1:50", title: "3. Escalation (Thursday)", minutes: 25, cisco: "1.4.3, 1.4.7",
    intro: "One case has gone wrong, and the supervisor has 30 seconds before calling the customer.",
    parts: [
      { h: "Case history (made up)", text: "Customer in [Parish B], priority flag (vulnerable person at home). Called Sunday, Monday, Tuesday and Wednesday. Monday: told no estimate yet. Tuesday: an agent told them power would be back \"by Wednesday\". That was not in any update. Thursday morning: still off, while neighbours across the road have power. Customer posted about it on social media last night. Asking for a supervisor to call, an explanation of why the neighbours have power, and compensation for spoiled food. Field team says the street has local line damage; repair scheduled, no time confirmed." },
      { h: "Part A: summary for the supervisor", prompt: "Role: You are a senior contact centre agent.\nTask: Summarise this case for a supervisor who will call the customer in 5 minutes.\nContext: [paste the case history]\nFormat: Exactly 5 bullets: what happened, what went wrong on our side, what the customer wants, the risk if it is not resolved, the decision the supervisor needs to make.\nCheck: Neutral tone; no blame on the customer or a named colleague. Add no facts." },
      { h: "Part B: an agent's draft reply", text: "Dear [Customer], thank you for your patience. Your street has local line damage, which is why some neighbours have power and you do not. Our crew is scheduled to repair it, and we will contact you as soon as we have a time. Regards, [Agent]" },
      { h: "Part B prompt", prompt: "Here is a customer's case history and a draft reply. List every point or request the customer raised. For each, say whether the reply answers it: Yes, Partly or No. Then rewrite the reply to cover every point, without promising anything that is not in the case history." }
    ] },
  { id: "cx-ex4", time: "2:15", title: "4. Difficult-call practice", minutes: 25, cisco: "1.4.11, 1.4.9",
    intro: "One partner is the agent; Claude plays the caller; the other partner scores with the rubric. Use voice mode in the Claude phone app if you can (headphones on), otherwise type. About 8 exchanges, then END CALL. Swap and go again. Paste the outage note first.",
    parts: [
      { h: "Role-play prompt (new chat)", prompt: "You are Mr. Clarke, a customer of an electricity utility, calling the contact centre. You live in [Parish B]. Your power has been out since Saturday night; it is now Tuesday morning and you have heard nothing since Monday. Your food has spoiled. You are angry and you interrupt. Use only the outage note I gave you as the truth about the outage.\n\nHow to behave: if the agent acknowledges how you feel and gives honest information, calm down gradually. If the agent guesses a restoration time, blames the weather in a dismissive way, or reads a script without listening, get angrier. At some point demand compensation for your food. Keep each reply to 1 to 3 sentences, like a real caller.\n\nStay in character until I type END CALL. Then step out of character and score the agent from 1 to 3 on each of these: 1) Acknowledged the customer's feelings. 2) Gave only accurate information. 3) Made no promises outside their authority. 4) Gave a clear next step. 5) Kept a calm, respectful tone. Quote one line from the agent as evidence for each score, and give one thing to do differently next time." },
      { h: "Rubric (1 to 3 each)", text: "Acknowledge: 1 skips to facts · 2 a set phrase · 3 names the customer's actual problem\nAccurate: 1 guesses a time or cause · 2 one vague claim · 3 only what the update says\nPromises: 1 promises compensation or a time · 2 hints at one · 3 explains who decides and when\nNext step: 1 none · 2 vague · 3 specific: what happens, who calls, when\nTone: 1 defensive or rushed · 2 polite but scripted · 3 calm, warm, steady under interruption" }
    ] },
  { id: "cx-ex5", time: "2:40", title: "5. The week's report (Friday)", minutes: 25, cisco: "1.4.4, 1.4.13",
    intro: "Pairs do Part A or Part B, then swap findings. Attach the practice spreadsheets.",
    parts: [
      { h: "Part A: feedback themes (practice/CX_Feedback_Comments.xlsx)", prompt: "Role: You are a customer insights analyst.\nTask: Group the 30 comments in the attached file into no more than 6 themes.\nContext: The file holds survey comments with a 1 to 5 rating (made up).\nFormat: A table with Theme, Number of comments, Average rating and one example in your own words. Then the two themes management should act on first, and why.\nCheck: Put every comment in exactly one theme. Show that the counts add up to 30. List the response IDs in each theme so I can check." },
      { h: "Part B: complaints update (practice/CX_Complaints_Sample.xlsx)", prompt: "Role: You are a CX reporting analyst.\nTask: Using the attached complaints spreadsheet (made up): 1) count complaints by category and by channel; 2) give the average days to resolve for each category and the number still open; 3) write a management update under 180 words: what stands out, what needs attention, one recommendation.\nFormat: Small tables for the figures, then the update.\nCheck: Show how you calculated each figure so I can check it in Excel. Average days to resolve uses resolved cases only." },
      { h: "Then make the files (same chat)", prompt: "Create an Excel file with the category table and a bar chart, and a Word document with the management update." }
    ] },
  { id: "cx-own", time: "3:05", title: "Your own task", minutes: 30, cisco: "1.3.8",
    intro: "Pick one task you do at least once a week. Make a safe, made-up example, write a five-part prompt, test it twice with your partner checking, then turn it into a template and add it to your prompt kit.",
    parts: [
      { h: "Make it a template", prompt: "Here is a prompt that works well for me: [paste your prompt]. Turn it into a reusable template: replace everything that changes each time with [BRACKETED PLACEHOLDERS], add one line at the top saying when to use it, and add a checklist of 3 things to review before using the answer." }
    ] }
  ]
}
};
