// const sample = {
//     category_name: {
//         title: "cat title",
//         categories: [
//             "cat1",
//             "cat2",
//             "cat3",
//             "cat4",
//             "cat5",
//         ],
//         questions: [
//             {
//                 question: "question1",
//                 options: ["option1", "option2", "option3", "option4", "option5"]
//             },
//         ]
//     }
// }

export const advanceQuestion = {
	
	Accounting: {
		title: "Accounting",
		categories: ['Accounting'],
		questions: [
			{
				question: "Do you have experience using MYOB or Xero for invoicing?",
				options: ["Yes - MYOB", "Yes - Xero", "Yes - both", "No - but willing to learn", "No"]
			},
			{
				question: "Can you manage high-volume transactional processing?",
				options: ["Yes - regularly in past roles", "Yes - some experience", "No - not my strength"]
			},
			{
				question: "Are you familiar with Single Touch Payroll (STP) compliance in Australia?",
				options: ["Yes - fully confident", "Yes - basic knowledge", "No - unfamiliar"]
			},
			{
				question: "How many employees have you managed payroll for in previous roles?",
				options: ["1–10", "11–50", "51–200", "200+"]
			},
			{
				question: "Have you worked with Big 4 audit firms or equivalent clients?",
				options: ["Yes - Big 4", "Yes - non-Big 4 corporate clients", "No"]
			},
			{
				question: "Are you familiar with risk-based audit methodologies?",
				options: ["Yes - proficient", "Basic knowledge", "No"]
			},
		]
	},

	Administration: {
		title: "Administration & Office Support",
		categories: ['Administration & Office Support'],
		questions: [
			{
				question: "Are you comfortable handling multi-line phone systems?",
				options: ["Yes - experienced", "Yes - with limited experience", "No"]
			},
			{
				question: "Do you have experience greeting clients or visitors in a corporate environment?",
				options: ["Yes - regularly", "Yes - occasionally", "No"]
			},
			{
				question: "How many keystrokes per hour (KPH) can you type accurately?",
				options: ["Below 7,000 KPH", "7,000–10,000 KPH", "10,000–13,000 KPH", "Above 13,000 KPH", "I'm not sure"]
			},
			{
				question: "Are you familiar with CRM or ERP data entry systems?",
				options: ["Yes - CRM", "Yes - ERP", "Yes - both", "No - but willing to learn", "No"]
			},
		]
	},

	Advertising: {
		title: "Advertising, Arts & Media",
		categories: ['Advertising, Arts & Media'],
		questions: [
			{
				question: "Which design tools are you proficient in?",
				options: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva", "Other (please specify)"]
			},
			{
				question: "Do you have experience designing for both print and digital formats?",
				options: ["Yes - both print and digital", "Yes - digital only", "Yes - print only", "No"]
			},
			{
				question: "Have you published articles for mainstream media outlets or blogs?",
				options: ["Yes - mainstream media", "Yes - blogs or niche platforms", "No - personal writing only", "No"]
			},
			{
				question: "What writing styles are you most experienced in?",
				options: ["Editorial writing", "Copywriting/Advertising", "News reporting", "Scriptwriting", "Technical writing", "Other (please specify)"]
			},
			{
				question: "How do you respond to creative feedback or criticism?",
				options: ["I welcome it and revise accordingly", "I defend my design if I strongly believe in it", "I feel discouraged sometimes", "I prefer clear instructions from the start"]
			},
			{
				question: "How do you manage tight deadlines on creative projects?",
				options: ["Plan in advance and stay ahead", "Prioritize based on urgency", "I often work better under pressure", "I struggle with short timelines"]
			},
		]
	},

	Banking: {
		title: "Banking & Financial Services",
		categories: ['Banking & Financial Services'],
		questions: [
			{
				question: "Are you RG146 compliant?",
				options: ["Yes - currently certified", "Previously certified (expired)", "No - not certified"]
			},
			{
				question: "Have you handled financial products such as loans, superannuation, or insurance?",
				options: ["Yes - all of the above", "Yes - some of the above", "No - but familiar with basic concepts", "No"]
			},
			{
				question: "What level of lending authority have you held in past roles?",
				options: ["Up to $50K", "$50K - $200K", "$200K - $1M", "Above $1M", "None"]
			},
			{
				question: "Have you worked with mortgage aggregation software or loan origination tools?",
				options: ["Yes - extensively", "Yes - limited experience", "No - but I'm willing to learn", "No"]
			},
		]
	},

	CallCentre: {
		title: "Call Centre & Customer Service",
		categories: ['Call Centre & Customer Service'],
		questions: [
			{
				question: "What is your average call handling time (AHT)?",
				options: ["Less than 2 minutes", "2–5 minutes", "5–10 minutes", "Above 10 minutes", "I don't know"]
			},
			{
				question: "Have you consistently met KPIs in outbound call campaigns?",
				options: ["Yes - regularly exceeded targets", "Yes - consistently met targets", "Sometimes met targets", "No - struggled with targets", "No - not applicable"]
			},
			{
				question: "Have you led a team in a BPO or contact centre environment?",
				options: ["Yes - more than 10 people", "Yes - up to 10 people", "No - but I've acted in a supervisor role", "No"]
			},
			{
				question: "Do you have experience with workforce management tools (e.g., Genesys, NICE)?",
				options: ["Yes - proficient in multiple tools", "Yes - one specific tool", "Familiar with dashboards only", "No"]
			},
			{
				question: "How do you usually handle an angry or upset customer?",
				options: ["Apologize and escalate to a supervisor", "Listen and resolve within your scope", "Follow company policy exactly", "Avoid confrontation"]
			},
			{
				question: "What's more important in customer service - speed or quality?",
				options: ["Speed", "Quality", "A balance of both depending on situation"]
			},
			{
				question: "Can you give an example of when you exceeded a customer's expectations?",
				options: ["Yes - [Short answer field]", "Not yet - new to the industry"]
			},
		]
	},

	CEO: {
		title: "CEO & General Management",
		categories: ['CEO & General Management'],
		questions: [
			{
				question: "Have you held full P&L responsibility in a leadership role?",
				options: ["Yes - full ownership", "Yes - partial responsibility", "No"]
			},
			{
				question: "Have you led business transformation or turnaround projects?",
				options: ["Yes - multiple times", "Yes - once", "No"]
			},
			{
				question: "What's the largest team you have managed?",
				options: ["1–10", "11–50", "51–200", "200+"]
			},
			{
				question: "Have you directly overseen budgeting and forecasting?",
				options: ["Yes - department-level", "Yes - full organization", "No"]
			},
			{
				question: "How do you typically set organizational goals?",
				options: ["Based on board/company direction", "Through team collaboration and strategic planning", "Using industry benchmarks and data", "I prefer not to set long-term goals personally"]
			},
			{
				question: "How do you handle underperforming leadership team members?",
				options: ["Offer mentoring and performance plans", "Reassign or restructure roles", "Allow time and observe", "I prefer HR to manage this"]
			},
		]
	},

	CommunityServices: {
		title: "Community Services & Development",
		categories: ['Community Services & Development'],
		questions: [
			{
				question: "Do you hold a Certificate III or IV in Individual Support or equivalent?",
				options: ["Yes - Certificate III", "Yes - Certificate IV", "No - but currently studying", "No"]
			},
			{
				question: "Are you comfortable with personal care and mobility assistance?",
				options: ["Yes", "Yes - with some support", "No"]
			},
			{
				question: "Do you hold a Working With Children Check (WWCC)?",
				options: ["Yes - current", "No - but willing to obtain", "No"]
			},
			{
				question: "Do you have trauma-informed care training?",
				options: ["Yes - advanced level", "Yes - introductory level", "No"]
			},
			{
				question: "How do you handle emotionally difficult situations with clients (e.g., abuse, trauma)?",
				options: ["Remain empathetic and refer to professionals", "Offer support within limits and report to supervisor", "Avoid emotional involvement to protect myself", "I'm unsure - would need guidance"]
			},
			{
				question: "What's your approach to cultural sensitivity in community work?",
				options: ["I actively learn and adapt communication styles", "I ask clients how they prefer to engage", "I follow my organization's cultural policy", "I've never worked in diverse communities"]
			},
		]
	},

	Construction: {
		title: "Construction",
		categories: ['Construction'],
		questions: [
			{
				question: "Have you supervised subcontractors or trades on-site?",
				options: ["Yes - frequently", "Yes - occasionally", "No"]
			},
			{
				question: "Do you have a valid White Card and First Aid certificate?",
				options: ["Yes - both", "Yes - only White Card", "Yes - only First Aid", "No"]
			},
			{
				question: "Have you managed residential, commercial, or civil construction projects?",
				options: ["Residential", "Commercial", "Civil", "All of the above", "None"]
			},
			{
				question: "What project values have you worked on (AUD)?",
				options: ["Under $100K", "$100K–$500K", "$500K–$1M", "$1M–$10M", "$10M+"]
			},
			{
				question: "How do you manage disagreements on-site between subcontractors?",
				options: ["Mediate directly and document all outcomes", "Report to project manager immediately", "Let them resolve it themselves unless safety is involved", "Avoid getting involved"]
			},
			{
				question: "How do you respond when a project is falling behind schedule?",
				options: ["Reallocate resources and adjust timeline", "Communicate delay and plan recovery actions", "Increase overtime shifts", "Not sure - I've never dealt with this"]
			},
		]
	},

	Consulting: {
		title: "Consulting & Strategy",
		categories: ['Consulting & Strategy'],
		questions: [
			{
				question: "Are you experienced in using tools like Power BI, Tableau or SQL for reporting?",
				options: ["Yes - highly proficient", "Yes - beginner level", "No"]
			},
			{
				question: "Have you conducted SWOT, PESTEL or competitor analysis for clients?",
				options: ["Yes - all", "Yes - some", "No"]
			},
			{
				question: "Have you advised senior stakeholders or government on policy?",
				options: ["Yes - extensively", "Yes - limited projects", "No"]
			},
			{
				question: "Have you conducted SWOT, PESTEL or competitor analysis for clients?",
				options: ["Yes - all", "Yes - some", "No"]
			},
			{
				question: "Have you advised senior stakeholders or government on policy?",
				options: ["Yes - extensively", "Yes - limited projects", "No"]
			},
			{
				question: "Do you have experience in risk or change management frameworks?",
				options: ["Yes - certified (e.g., Prosci, ISO31000)", "Yes - non-certified", "No"]
			},
			{
				question: "How do you manage conflicting stakeholder expectations?",
				options: ["Facilitate joint sessions to align goals", "Prioritize based on business value", "Go with the senior-most decision", "Avoid confrontation and stick to original plan"]
			},
			{
				question: "What's your preferred way to present complex data insights?",
				options: ["Visual dashboards (Tableau, Power BI)", "Executive summary reports", "Verbal presentations", "I let data analysts handle presentations"]
			},
		]
	},

	Design: {
		title: "Design & Architecture",
		categories: ['Design & Architecture'],
		questions: [
			{
				question: "Are you proficient in AutoCAD, Revit, or SketchUp?",
				options: ["Yes - all", "Yes - some", "No"]
			},
			{
				question: "Do you have experience managing residential or commercial design projects?",
				options: ["Residential only", "Commercial only", "Both", "No"]
			},
			{
				question: "Which platforms/tools are you strongest in?",
				options: ["Adobe Suite", "Figma", "Canva", "CorelDraw", "Other (please specify)"]
			},
			{
				question: "Have you worked in UX/UI or branding design specifically?",
				options: ["Yes - UX/UI", "Yes - Branding", "Yes - Both", "No"]
			},
			{
				question: "How do you deal with a client who keeps requesting changes late in the project?",
				options: ["Discuss scope creep and propose extra charges", "Accept changes to maintain client relationship", "Push back gently and offer alternatives", "Do it silently to avoid conflict"]
			},
			{
				question: "What inspires your design decisions the most?",
				options: ["Functionality", "Aesthetic trends", "Client preferences", "Sustainability", "All of the above"]
			},
		]
	},

	Education: {
		title: "Education & Training",
		categories: ['Education & Training'],
		questions: [
			{
				question: "Are you registered with the relevant teaching authority (e.g., TRB or VIT)?",
				options: ["Yes - fully registered", "Yes - provisionally registered", "No - but in process", "No"]
			},
			{
				question: "Which curriculum are you most experienced in teaching?",
				options: ["Australian Curriculum", "IB (International Baccalaureate)", "British Curriculum", "Other (please specify)"]
			},
			{
				question: "Are you a certified workplace trainer (e.g., TAE40122)?",
				options: ["Yes", "No - but studying", "No"]
			},
			{
				question: "Do you have experience delivering online or hybrid training programs?",
				options: ["Yes - online only", "Yes - hybrid (online + face-to-face)", "No"]
			},
			{
				question: "How do you keep students engaged during long or difficult lessons?",
				options: ["Use interactive tools and examples", "Adjust pacing and take breaks", "Stick to planned content", "I struggle with keeping students engaged"]
			},
			{
				question: "How do you handle a disruptive or difficult student in class?",
				options: ["Apply behavioural strategies and document incidents", "Seek support from another teacher or principal", "Remove student temporarily if needed", "I try to ignore it unless it's severe"]
			},
		]
	},

	Engineering: {
		title: "Engineering",
		categories: ['Engineering'],
		questions: [
			{
				question: "Which types of engineering projects have you worked on?",
				options: ["Infrastructure (roads, bridges)", "Commercial buildings", "Manufacturing / Industrial", "Energy / Utilities", "Other (please specify)"]
			},
			{
				question: "Do you have CPEng (Chartered Professional Engineer) or RPEQ registration?",
				options: ["Yes - current", "No - but eligible", "No"]
			},

			{
				question: "Are you proficient with CAD, SolidWorks, or engineering simulation tools?",
				options: ["Yes - expert", "Yes - intermediate", "No"]
			},
			{
				question: "Have you been involved in Lean, Six Sigma, or other process improvement methodologies?",
				options: ["Yes - certified", "Yes - practical experience only", "No"]
			},

			{
				question: "Have you been involved in Lean, Six Sigma, or other process improvement methodologies?",
				options: ["Yes - certified", "Yes - practical experience only", "No"]
			},

			{
				question: "What's your usual approach when identifying a design or structural error mid-project?",
				options: ["Pause and run a root cause analysis", "Communicate it immediately to project manager", "Fix it quietly if minor", "Escalate only if it affects deadline"]
			},

			{
				question: "How do you balance innovation with safety and compliance?",
				options: ["Follow all codes even if it limits design", "Innovate but consult with compliance experts", "Focus on innovation first, compliance later", "I'm not usually involved in compliance"]
			},
		]
	},

	Farming: {
		title: "Farming, Animals & Conservation",
		categories: ['Farming, Animals & Conservation'],
		questions: [
			{
				question: "Do you have qualifications in agriculture, biology or animal sciences?",
				options: ["Yes - agriculture", "Yes - animal sciences", "Yes - both", "No"]
			},
			{
				question: "Are you familiar with organic or sustainable farming practices?",
				options: ["Yes - in-depth knowledge", "Some knowledge", "No"]
			},

			{
				question: "Are you licensed or certified to work with animals (e.g., vet nurse, ranger)?",
				options: ["Yes - certified/licensed", "No - but studying", "No"]
			},

			{
				question: "Do you have fieldwork or park ranger experience?",
				options: ["Yes - government agency", "Yes - private sector", "No"]
			},

			{
				question: "How do you manage biosecurity or disease risks on farms or animal sites?",
				options: ["Follow strict hygiene and quarantine protocols", "Only when there's a known outbreak", "I rely on vet advice when needed", "Not familiar with biosecurity practices"]
			},

			{
				question: "How do you respond to ethical concerns around animal handling?",
				options: ["Follow standard guidelines strictly", "Raise issues with supervisors or report concerns", "I avoid handling sensitive animal-related tasks", "I've never encountered this issue"]
			},
		]
	},

	Government: {
		title: "Government & Defence",
		categories: ['Government & Defence'],
		questions: [
			{
				question: "How do you ensure neutrality and fairness when enforcing rules or regulations?",
				options: ["Stick strictly to policy and law", "Make case-by-case decisions within guidelines", "Follow supervisor instructions", "I try to avoid sensitive enforcement tasks"]
			},
			{
				question: "How do you handle confidential or classified information?",
				options: ["Follow documented access and sharing protocols", "Keep everything on a need-to-know basis", "I leave that to higher clearance levels", "I'm unsure what qualifies as classified"]
			},
			{
				question: "Are you currently or previously employed in a government department or agency?",
				options: ["Yes - currently", "Yes - previously", "No"]
			},
			{
				question: "Do you have NV1 or Baseline Security Clearance?",
				options: ["Yes - current", "Yes - expired", "No - but eligible", "No"]
			},
			{
				question: "Have you worked in a role involving legislation or regulatory compliance?",
				options: ["Yes - in-depth experience", "Yes - some experience", "No"]
			},
		]
	},

	Healthcare: {
		title: "Healthcare & Medical",
		categories: ['Healthcare & Medical'],
		questions: [
			{
				question: "Are you registered with AHPRA?",
				options: ["Yes - full registration", "Yes - limited registration", "No"]
			},
			{
				question: "What areas of care are you most experienced in?",
				options: ["Aged Care", "Acute Care", "Mental Health", "Community Nursing", "Theatre/ICU"]
			},
			{
				question: "Are you credentialed with any health funds or NDIS providers?",
				options: ["Yes - both", "Yes - one of them", "No"]
			},
			{
				question: "Do you have experience in writing treatment plans or conducting assessments?",
				options: ["Yes - regularly", "Occasionally", "No"]
			},
			{
				question: "How do you manage emotional stress in high-pressure environments?",
				options: ["I rely on team support and self-care routines", "I take regular breaks to avoid burnout", "I've developed mental resilience through experience", "I struggle with stress"]
			},
			{
				question: "How do you handle patient confidentiality breaches or ethical dilemmas?",
				options: ["Report immediately to supervisor", "Handle discreetly with the person involved", "Ignore if it doesn't directly affect patient", "Unsure"]
			},
			{
				question: "How do you react when a patient refuses treatment or disagrees with care instructions?",
				options: ["Educate and explain, then respect their choice", "Escalate to a doctor or supervisor", "Document the refusal and move on", "Try to persuade them firmly"]
			},
			{
				question: "How do you prioritize multiple patients needing urgent care at the same time?",
				options: ["Use triage guidelines based on severity", "Rely on instinct and previous experience", "Prioritize based on who arrived first", "Defer to senior staff"]
			},
		]
	},

	Hospitality: {
		title: "Hospitality & Tourism",
		categories: ['Hospitality & Tourism'],
		questions: [
			{
				question: "What type of kitchen environments have you worked in?",
				options: ["Café", "Fine Dining", "Hotel / Resort", "Catering / Events", "Other"]
			},
			{
				question: "Do you hold a current Food Safety or RSA certificate?",
				options: ["Yes - both", "Yes - Food Safety only", "Yes - RSA only", "No"]
			},
			{
				question: "Are you experienced with booking software like Opera, RMS, or RoomKey?",
				options: ["Yes - highly proficient", "Yes - basic level", "No"]
			},
			{
				question: "What's your level of spoken English for guest interactions?",
				options: ["Fluent", "Intermediate", "Basic", "Not fluent"]
			},
			{
				question: "How do you manage multiple customer requests during peak hours?",
				options: ["Prioritize based on urgency and service standards", "Ask for team assistance or delegate", "Handle one at a time patiently", "I avoid peak shifts if possible"]
			},
			{
				question: "How do you respond when a guest leaves a negative review or complaint?",
				options: ["Acknowledge and offer a solution or apology", "Escalate to management", "Ignore if the guest is unreasonable", "I don't monitor reviews"]
			},
		]
	},

	HumanResources: {
		title: "Human Resources & Recruitment",
		categories: ['Human Resources & Recruitment'],
		questions: [
			{
				question: "Which HRIS systems are you familiar with?",
				options: ["SAP SuccessFactors", "Workday", "BambooHR", "Other (please specify)", "None"]
			},
			{
				question: "Do you have experience conducting interviews and onboarding?",
				options: ["Yes - full-cycle", "Yes - partially", "No"]
			},
			{
				question: "Are you trained in Fair Work compliance and Australian workplace law?",
				options: ["Yes - advanced level", "Basic understanding", "No"]
			},
			{
				question: "Do you have a Certificate IV in Work Health & Safety (WHS)?",
				options: ["Yes", "No - but studying", "No"]
			},
			{
				question: "How do you resolve a conflict between two employees on the same team?",
				options: ["Mediate directly and document the resolution", "Refer to senior HR or manager", "Separate them to avoid more issues", "Let them resolve it unless it escalates"]
			},
			{
				question: "How do you ensure hiring decisions are unbiased?",
				options: ["Use structured interviews and scoring", "Conduct panel interviews", "Focus on gut instinct and experience", "I haven't had to make hiring decisions yet"]
			},
		]
	},

	IT: {
		title: "Information & Communication Technology",
		categories: ['Information & Communication Technology'],
		questions: [
			{
				question: "Which languages are you most comfortable with?",
				options: ["JavaScript", "Python", "Java", "PHP", "C#", "Other"]
			},
			{
				question: "Do you follow Agile/Scrum practices?",
				options: ["Yes - certified", "Yes - experienced", "No"]
			},
			{
				question: "Which certifications do you currently hold?",
				options: ["CompTIA A+ / Network+", "CCNA / Cisco", "Microsoft Certified", "None"]
			},
			{
				question: "Have you managed IT infrastructure or security protocols in an organization?",
				options: ["Yes - end-to-end", "Yes - partially", "No"]
			},
			{
				question: "What do you do when you encounter a critical production bug?",
				options: ["Investigate and patch it ASAP with rollback plan", "Notify the team and open a ticket", "Try to isolate the issue quietly", "Let the DevOps team handle it"]
			},
			{
				question: "How do you keep your tech skills up to date?",
				options: ["Follow tech blogs, attend courses or webinars", "Learn from work projects", "Wait until training is offered by employer", "I don't focus on learning new tools unless required"]
			},
		]
	},

	Insurance: {
		title: "Insurance & Superannuation",
		categories: ['Insurance & Superannuation'],
		questions: [
			{
				question: "What types of insurance have you handled?",
				options: ["Life Insurance", "General / Property", "Workers Compensation", "Other (please specify)"]
			},
			{
				question: "Are you Tier 1 or Tier 2 certified under ASIC standards?",
				options: ["Tier 1", "Tier 2", "Both", "No"]
			},
			{
				question: "Do you have experience processing insurance claims or managing policies?",
				options: ["Yes - 100+ claims/month", "Yes - occasional claims", "No"]
			},
			{
				question: "Are you proficient with risk assessment or underwriting software?",
				options: ["Yes - regularly use", "Yes - occasionally", "No"]
			},
			{
				question: "How do you handle a customer who disputes a rejected insurance claim?",
				options: ["Reassess based on policy terms", "Escalate to manager for second opinion", "Apologize and explain process clearly", "Avoid direct conversations if emotional"]
			},
			{
				question: "How do you stay compliant with changing regulations in insurance?",
				options: ["Attend regular compliance training or updates", "Refer to compliance team when unsure", "Stick to old rules until told otherwise", "I wait for alerts from the manager"]
			},
		]
	},

	Legal: {
		title: "Legal",
		categories: ['Legal'],
		questions: [
			{
				question: "Which legal systems or case management tools have you worked with?",
				options: ["LEAP", "Actionstep", "Affinity", "Other", "None"]
			},
			{
				question: "Do you have experience preparing legal briefs, documents or affidavits?",
				options: ["Yes - independently", "Yes - with supervision", "No"]
			},
			{
				question: "Which areas of law are you experienced in?",
				options: ["Family Law", "Criminal Law", "Corporate/Commercial", "Employment Law", "Intellectual Property", "Other"]
			},
			{
				question: "Are you admitted to practice in Australia?",
				options: ["Yes - admitted", "No - waiting admission", "No"]
			},
			{
				question: "What's your process for handling confidential client documents?",
				options: ["Store securely and follow access control policies", "Share only on a need-to-know basis", "Encrypt and log every access", "I'm not involved in document handling"]
			},
			{
				question: "How do you prepare for a time-sensitive case or court appearance?",
				options: ["Prioritize files and prep days ahead", "Coordinate closely with client and legal team", "Review notes the night before", "I rely on legal assistants for that"]
			},
		]
	},

	Manufacturing: {
		title: "Manufacturing, Transport & Logistics",
		categories: ['Manufacturing, Transport & Logistics'],
		questions: [
			{
				question: "Are you experienced with specific machinery (e.g., CNC, forklifts, textile)?",
				options: ["Yes - CNC", "Yes - Forklifts", "Yes - Other industrial machinery", "No"]
			},
			{
				question: "Can you read and interpret technical drawings or production specs?",
				options: ["Yes - confidently", "Yes - limited exposure", "No"]
			},
			{
				question: "Do you hold any of the following licenses?",
				options: ["Forklift", "HR/MR/HC truck license", "Dangerous goods license", "None"]
			},
			{
				question: "Have you used warehouse management systems (e.g., SAP, NetSuite, Cin7)?",
				options: ["Yes - advanced user", "Yes - basic use", "No"]
			},
			{
				question: "Are you comfortable with strict KPIs like delivery time, safety, or packing accuracy?",
				options: ["Yes - thrive in structured environments", "Yes - if realistic", "No - prefer flexible roles"]
			},
			{
				question: "Have you ever reported a workplace safety hazard?",
				options: ["Yes - multiple times", "Yes - once or twice", "No - never had to", "No - would rather not"]
			},
			{
				question: "How do you respond if a machine you operate starts malfunctioning mid-shift?",
				options: ["Stop immediately and report to maintenance", "Try basic troubleshooting", "Continue if still functional and report later", "I don't operate machinery"]
			},
			{
				question: "How do you prioritize safety while meeting production deadlines?",
				options: ["Safety always comes first, even if we fall behind", "Balance both based on supervisor input", "Push through and catch up later", "I follow whatever the team is doing"]
			},
		]
	},

	Marketing: {
		title: "Marketing & Communications",
		categories: ['Marketing & Communications'],
		questions: [
			{
				question: "Which digital marketing platforms/tools are you most experienced in?",
				options: ["Google Ads", "Meta (Facebook) Business Manager", "HubSpot", "Mailchimp", "Other"]
			},
			{
				question: "Are you proficient in Google Analytics or other web reporting tools?",
				options: ["Yes - daily use", "Yes - occasional", "No"]
			},
			{
				question: "Have you managed campaigns across multiple channels (e.g., social, email, TV)?",
				options: ["Yes - end-to-end", "Yes - with support", "No"]
			},
			{
				question: "Do you have event coordination or sponsorship experience?",
				options: ["Yes - regularly", "Yes - occasionally", "No"]
			},
			{
				question: "How do you respond to a marketing campaign that's underperforming?",
				options: ["Analyze data and optimize mid-campaign", "Stop and reassess strategy with the team", "Run it till the end and review afterward", "I leave analysis to a specialist"]
			},
			{
				question: "How do you ensure brand messaging stays consistent across platforms?",
				options: ["Use templates and brand guidelines", "Centralize all content through one person", "Trust each team to manage their channels", "Not something I've worked on"]
			},
		]
	},

	Mining: {
		title: "Mining, Resources & Energy",
		categories: ['Mining, Resources & Energy'],
		questions: [
			{
				question: "Are you experienced in FIFO or DIDO roles?",
				options: ["Yes - FIFO", "Yes - DIDO", "No"]
			},
			{
				question: "Do you hold a current Mining Induction (Standard 11) or BHP/RIIOHS certificate?",
				options: ["Yes - current", "Expired", "No"]
			},
			{
				question: "Have you worked on offshore rigs or gas pipelines?",
				options: ["Yes - offshore", "Yes - pipelines", "No"]
			},
			{
				question: "Are you trained in hazardous area compliance or isolation procedures?",
				options: ["Yes - fully certified", "Yes - partial knowledge", "No"]
			},
			{
				question: "How do you handle working in remote or FIFO locations for extended periods?",
				options: ["I'm used to remote work and manage well", "I need time to adjust but manage it", "I find it challenging", "I've never worked remotely"]
			},
			{
				question: "What's your first step if you identify a safety hazard on site?",
				options: ["Report immediately and isolate the area", "Tell a supervisor or safety officer", "Fix it if it's minor", "Ignore if no one's around"]
			},
		]
	},

	RealEstate: {
		title: "Real Estate & Property",
		categories: ['Real Estate & Property'],
		questions: [
			{
				question: "Do you hold a current real estate certificate or license (e.g., NSW Certificate of Registration)?",
				options: ["Yes - licensed", "No - but studying", "No"]
			},
			{
				question: "Which areas have you worked in?",
				options: ["Residential Sales", "Commercial Leasing", "Property Management", "Buyer Advocacy", "Other"]
			},
			{
				question: "Do you have experience using property software (e.g., Console, PropertyMe)?",
				options: ["Yes - confidently", "Yes - basic use", "No"]
			},
			{
				question: "Have you dealt with tenant disputes or VCAT matters?",
				options: ["Yes - frequently", "Yes - occasionally", "No"]
			},
			{
				question: "How do you handle a property viewing where the client complains about price or quality?",
				options: ["Listen, note feedback, and offer alternatives", "Justify value and explain market trends", "Pass concerns to the vendor", "I avoid dealing with complaints directly"]
			},
			{
				question: "How do you keep your listings and leads organized?",
				options: ["Use CRM software (e.g., Agentbox, VaultRE)", "Spreadsheets and manual follow-ups", "I rely on memory and my calendar", "I don't manage listings directly"]
			},
		]
	},

	Retail: {
		title: "Retail & Consumer Products",
		categories: ['Retail & Consumer Products'],
		questions: [
			{
				question: "What retail environments have you worked in?",
				options: ["Supermarket", "Fashion / Apparel", "Electronics / Tech", "Hospitality / Café", "Other"]
			},
			{
				question: "Do you have POS or inventory management system experience?",
				options: ["Yes - POS only", "Yes - POS + Inventory", "No"]
			},
			{
				question: "Are you confident in managing merchandising plans and planograms?",
				options: ["Yes - independent role", "Yes - with support", "No"]
			},
			{
				question: "Have you worked with suppliers and negotiated wholesale pricing?",
				options: ["Yes - regularly", "Occasionally", "No"]
			},
			{
				question: "What do you do when stock is missing or damaged before a sale?",
				options: ["Log the issue and alert inventory team", "Hide the item and avoid confusion", "Sell as-is with disclosure", "I leave that to the manager"]
			},
			{
				question: "How do you handle a high volume of customers during busy hours?",
				options: ["Stay calm and prioritize each task", "Ask for support or escalate", "Focus on speed more than detail", "I avoid working peak time"]
			},
		]
	},

	Sales: {
		title: "Sales",
		categories: ['Sales'],
		questions: [
			{
				question: "What type of sales are you most experienced in?",
				options: ["B2B (Business to Business)", "B2C (Business to Consumer)", "Telesales", "Retail", "Other"]
			},
			{
				question: "Are you confident in managing your own sales pipeline and CRM tools (e.g., Salesforce, Zoho)?",
				options: ["Yes - highly proficient", "Yes - some experience", "No"]
			},
			{
				question: "What's the average deal size you've handled?",
				options: ["Under $1,000", "$1,000–$10,000", "$10,000–$100,000", "$100,000+"]
			},
			{
				question: "Have you consistently met or exceeded sales targets?",
				options: ["Yes - consistently", "Sometimes", "No"]
			},
			{
				question: "How do you typically approach a cold lead?",
				options: ["Research thoroughly before first contact", "Follow a cold-call script", "Send an email first, then call", "I don't do cold leads"]
			},
			{
				question: "What is your biggest sales achievement to date?",
				options: ["Overachieved quota by 50% or more", "Closed a high-value deal", "Won back a lost client", "Other - [Short answer field]"]
			},
			{
				question: "How do you respond after losing a potential deal you worked hard on?",
				options: ["Ask for feedback and improve next time", "Move on quickly and focus on the next lead", "Re-engage the prospect later", "I find it difficult to let go"]
			},
			{
				question: "How do you handle a situation where a client demands a discount against company policy?",
				options: ["Explain value and decline politely", "Offer alternate product/service options", "Escalate to manager", "Try to make a personal exception"]
			},
		]
	},

	Science: {
		title: "Science & Technology",
		categories: ['Science & Technology'],
		questions: [
			{
				question: "Do you have lab experience in a regulated environment (e.g., GLP/GMP)?",
				options: ["Yes - GLP", "Yes - GMP", "Both", "No"]
			},
			{
				question: "What areas have you worked in?",
				options: ["Biology / Biomedical", "Chemistry / Physics", "Environmental Science", "Food Technology", "Other"]
			},
			{
				question: "What analytical tools or languages are you skilled in?",
				options: ["Python / R", "Excel (Advanced)", "SPSS / SAS", "Tableau / Power BI", "Other"]
			},
			{
				question: "Have you worked on statistical modelling or machine learning projects?",
				options: ["Yes - multiple", "Yes - a few", "No"]
			},
			{
				question: "How do you deal with a failed experiment or unexpected data result?",
				options: ["Re-run with adjusted parameters", "Record and analyze for insights", "Move on and report outcome", "Not my responsibility"]
			},
			{
				question: "How do you ensure your work follows scientific or technical ethics?",
				options: ["Follow guidelines and document everything", "Discuss with peers if unsure", "Trust senior researchers to manage compliance", "I focus on results more than process"]
			},
		]
	},

	SelfEmployment: {
		title: "Self Employment",
		categories: ['Self Employment'],
		questions: [
			{
				question: "What type of self-employment have you been involved in?",
				options: ["Freelancer", "Contractor (ABN holder)", "Sole Trader", "Startup Founder", "Other"]
			},
			{
				question: "Are you currently seeking:",
				options: ["Freelance projects", "Short-term contracts", "Full-time opportunities", "Business partnerships", "All of the above"]
			},
			{
				question: "Do you carry your own public liability or professional indemnity insurance?",
				options: ["Yes", "No - but willing to obtain", "No"]
			},
			{
				question: "How do you manage inconsistent income or downtime in self-employment?",
				options: ["Save during good periods and plan ahead", "Take side gigs or freelance work", "Look for part-time contracts", "I struggle with inconsistency"]
			},
			{
				question: "How do you win and retain clients as a freelancer or contractor?",
				options: ["Provide high-quality work and proactive communication", "Offer discounts or deals", "Rely on referrals", "I mostly wait for inbound leads"]
			},
		]
	},

	Sport: {
		title: "Sport & Recreation",
		categories: ['Sport & Recreation'],
		questions: [
			{
				question: "Are you accredited through Fitness Australia or equivalent?",
				options: ["Yes - current", "No - expired", "No - not registered"]
			},
			{
				question: "Do you hold a current CPR or First Aid certification?",
				options: ["Yes - both", "Yes - First Aid only", "No"]
			},
			{
				question: "Have you managed sport programs, leagues or events?",
				options: ["Yes - regularly", "Yes - occasionally", "No"]
			},
			{
				question: "Are you familiar with player safety guidelines or sports integrity policies?",
				options: ["Yes - strong knowledge", "Yes - general awareness", "No"]
			},
			{
				question: "How do you motivate someone who is losing confidence or interest in training?",
				options: ["Reassess their goals and progress", "Adjust routine to be more enjoyable", "Offer positive reinforcement", "I'm not sure - depends on the person"]
			},
			{
				question: "What's your response to a safety concern during a class or session?",
				options: ["Stop activity and address immediately", "Report to facility supervisor", "Adapt the session on the spot", "Keep going unless someone gets injured"]
			},
		]
	},

	Trades: {
		title: "Trades & Services",
		categories: ['Trades & Services'],
		questions: [
			{
				question: "What licenses or trade certificates do you hold?",
				options: ["Electrical License", "Plumbing License", "Carpentry or Trade Certificate", "White Card", "Other"]
			},
			{
				question: "Are you experienced working with tools or heavy machinery?",
				options: ["Yes - daily use", "Yes - occasionally", "No"]
			},
			{
				question: "Do you have police clearance or security clearance for work?",
				options: ["Yes - current", "No - but willing to obtain", "No"]
			},
			{
				question: "Have you worked independently or as part of a mobile/on-call team?",
				options: ["Independently", "On-call/mobile team", "Both", "No"]
			},
			{
				question: "What do you do if you notice a coworker cutting safety corners?",
				options: ["Speak to them directly and remind them", "Report it to supervisor immediately", "Ignore it if no one is harmed", "I avoid confrontation"]
			},
			{
				question: "How do you handle last-minute job changes or urgent service calls?",
				options: ["Stay flexible and adjust my schedule", "Prioritize based on urgency", "Decline if already busy", "I avoid roles with constant change"]
			},
		]
	},

	AI: {
		title: "AI, Robotics & Emerging Tech",
		categories: ['AI, Robotics & Emerging Tech'],
		questions: [
			{
				question: "How do you stay updated on rapidly evolving AI/tech trends?",
				options: ["Follow leading researchers, newsletters, and GitHub", "Take courses and attend conferences", "Learn on the job or when required", "I'm not actively keeping up"]
			},
			{
				question: "How do you balance innovation with ethical responsibility in AI or robotics?",
				options: ["Follow ethical AI frameworks and safety reviews", "Raise red flags when needed, even if unpopular", "I focus more on performance than ethics", "I'm unsure how to evaluate ethics"]
			},
			{
				question: "Have you worked with any AI or robotics frameworks/tools?",
				options: ["Yes - TensorFlow / PyTorch / ROS / OpenCV / others", "Yes - custom-built solutions", "No - learning currently", "No - but interested"]
			},
		]
	},

	Crypto: {
		title: "Crypto, Blockchain & Web3",
		categories: ['Crypto, Blockchain & Web3'],
		questions: [
			{
				question: "What is your primary area of experience in blockchain?",
				options: ["Smart contract development (e.g., Solidity)", "Tokenomics / DeFi protocols", "Crypto trading / investment", "Community or DAO management", "I'm new to blockchain"]
			},
			{
				question: "How do you approach risk and volatility in crypto-related roles?",
				options: ["I work within regulated frameworks and disclaimers", "I'm comfortable with high-risk projects", "I prefer backend or technical roles without exposure", "I avoid volatile environments"]
			},
			{
				question: "Have you ever participated in an ICO, NFT project, or DeFi launch?",
				options: ["Yes - as a builder or founder", "Yes - as a contributor/community manager", "Yes - as an investor/user", "No - but researching", "No"]
			},
		]
	},

	Startups: {
		title: "Startups & Innovation",
		categories: ['Startups & Innovation'],
		questions: [
			{
				question: "What's your comfort level working in fast-paced, ambiguous startup environments?",
				options: ["I thrive in chaos and love building from scratch", "I like fast-moving environments with some structure", "I prefer clarity and process", "I'm unsure — never worked in a startup"]
			},
			{
				question: "How do you handle failure when launching a new product or initiative?",
				options: ["I reflect, iterate fast, and relaunch", "I consult mentors/team and pivot if needed", "I prefer to avoid risk-heavy roles", "I struggle with failure"]
			},
			{
				question: "What's your preferred style of collaboration in a startup?",
				options: ["Daily stand-ups and async tools like Slack, Notion", "Weekly planning and in-person discussions", "Informal chats and spontaneous decision-making", "I don't enjoy unstructured collaboration"]
			},
		]
	},

}