import React, { useState, useEffect } from 'react';
import PricingSummary from './PricingSummary';

const WriteSection = ({ formData, handleChange, handleStageChange }) => {
    const [logoFile, setLogoFile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    // pricing elements
    const [premiumSelected, setPremiumSelected] = useState(formData.premiumListing || true);
    const [immediateStartSelected, setImmediateStartSelected] = useState(formData.immediateStart || false);
    const [referencesSelected, setReferencesSelected] = useState(formData.referencesRequired || false);
    const [notificationOption, setNotificationOption] = useState(formData.notificationOption || 'both');
    
    // dropdown sections
    const [showBasicQuestions, setShowBasicQuestions] = useState(false);
    const [showAdvancedQuestions, setShowAdvancedQuestions] = useState(false);
    const [showQuestionOptions, setShowQuestionOptions] = useState({});
    const [showSectionDropdowns, setShowSectionDropdowns] = useState({
        section1: false,
        section2: false,
        section3: false,
        section4: false,
        section5: false
    });
    const [showAdvancedSectionDropdowns, setShowAdvancedSectionDropdowns] = useState({
        business: false,
        technology: false,
        professional: false,
        creative: false,
        industry: false,
        health: false
    });
    
    // Add state for mandatory questions
    const [mandatoryQuestions, setMandatoryQuestions] = useState(formData.mandatoryQuestions || []);
    
    // Calculate total cost
    const premiumCost = 750;
    const immediateCost = immediateStartSelected ? 85 : 0;
    const referencesCost = referencesSelected ? 75 : 0;
    const notificationCost = notificationOption === 'both' ? 69 : (notificationOption === 'none' ? 0 : 49);
    const totalCost = premiumCost + immediateCost + referencesCost + notificationCost;

    // Updated basic questions with options from the Common question first set.txt
    const basicQuestionsWithOptions = [
        // 🔹 SECTION 1: WORK RIGHTS & LEGAL ELIGIBILITY
        {
          question: "What best describes your right to work in Australia?",
          options: [
            "I am an Australian citizen",
            "I am a permanent resident",
            "I hold a valid temporary work visa with no restrictions",
            "I hold a valid temporary work visa with restrictions",
            "I am on a student visa with limited work rights",
            "I am on a working holiday visa",
            "I require sponsorship to work in Australia",
            "Other (please specify)"
          ]
        },
        {
          question: "Are you legally allowed to work with children or vulnerable people?",
          options: [
            "Yes – I have a current Working with Children Check (WWCC)",
            "No – but I'm willing to obtain one",
            "No – and I'm not planning to work in such roles"
          ]
        },
        {
          question: "Do you have a current Police Check?",
          options: [
            "Yes – issued within the last 6 months",
            "Yes – issued within the last 12 months",
            "Yes – issued more than 12 months ago",
            "No, but I'm willing to obtain one",
            "No"
          ]
        },
        {
          question: "Do you have a current Australian driver's licence?",
          options: [
            "Yes – full unrestricted licence",
            "Yes – provisional licence",
            "Yes – international licence",
            "No"
          ]
        },
        {
          question: "Do you own or have regular access to a car?",
          options: [
            "Yes – I own a car",
            "Yes – I have regular access to a car",
            "No"
          ]
        },
      
        // 🔹 SECTION 2: AVAILABILITY & LOGISTICS
        {
          question: "How much notice are you required to give your current employer?",
          options: [
            "I'm available immediately",
            "1 week",
            "2 weeks",
            "3 weeks",
            "4 weeks",
            "5 weeks",
            "6 or more weeks",
            "Other (please specify)"
          ]
        },
        {
          question: "What is your availability during weekdays?",
          options: [
            "Available full weekdays (Mon–Fri)",
            "Available only mornings",
            "Available only afternoons",
            "Available only evenings",
            "Varies – schedule-dependent",
            "Not available on weekdays"
          ]
        },
        {
          question: "Are you available to work weekends?",
          options: [
            "Yes – available both Saturdays and Sundays",
            "Yes – available only Saturdays",
            "Yes – available only Sundays",
            "Yes – on a rotating weekend basis",
            "No"
          ]
        },
        {
          question: "Are you available to work on public holidays?",
          options: [
            "Yes – available any public holiday",
            "Yes – available only on selected public holidays",
            "No"
          ]
        },
        {
          question: "Are you willing to relocate for this role?",
          options: [
            "Yes – I'm open to relocating anywhere in Australia",
            "Yes – I'm willing to relocate within my state",
            "No – I prefer to work in my current location",
            "I already live in the region"
          ]
        },
        {
          question: "Are you open to travel for work-related purposes?",
          options: [
            "Yes – frequently",
            "Yes – occasionally",
            "No – I prefer local or remote work"
          ]
        },
        {
          question: "Are you open to shift-based work (e.g., morning/night shifts)?",
          options: [
            "Yes – open to all shift types",
            "Yes – but prefer day shifts",
            "Yes – but prefer night shifts",
            "No"
          ]
        },
      
        // 🔹 SECTION 3: WORK PREFERENCES
        {
          question: "What type of work are you looking for?",
          options: [
            "Full-time",
            "Part-time",
            "Casual",
            "Contract/Freelance",
            "Internship",
            "Open to all types"
          ]
        },
        {
          question: "Are you currently studying or planning to study soon?",
          options: [
            "Yes – I'm studying part-time",
            "Yes – I'm studying full-time",
            "No – but planning to enrol soon",
            "No"
          ]
        },
        {
          question: "Do you have experience working in remote or hybrid environments?",
          options: [
            "Yes – fully remote",
            "Yes – hybrid (some days in office, some remote)",
            "No – only onsite/in-person roles",
            "No – but I'm open to it"
          ]
        },
        {
          question: "Are you open to completing additional training if the role requires it?",
          options: [
            "Yes – open to ongoing professional development",
            "Yes – if it's job-relevant and provided by the employer",
            "No"
          ]
        },
      
        // 🔹 SECTION 4: EDUCATION & CERTIFICATIONS
        {
          question: "What is your highest completed level of education?",
          options: [
            "No formal education",
            "High school (Year 12 or equivalent)",
            "Certificate I/II/III/IV",
            "Diploma or Advanced Diploma",
            "Bachelor's degree",
            "Postgraduate degree (Master's/PhD)",
            "Currently studying"
          ]
        },
        {
          question: "Do you have any industry-specific certifications?",
          options: [
            "Yes – [please specify]",
            "No – but I'm working towards it",
            "No"
          ]
        },
        {
          question: "Have you completed any safety training or certifications (e.g., First Aid, White Card)?",
          options: [
            "Yes – First Aid",
            "Yes – White Card",
            "Yes – Other (please specify)",
            "No – but I'm planning to",
            "No"
          ]
        },
        {
          question: "Do you have a forklift or heavy vehicle licence?",
          options: [
            "Yes – Forklift licence",
            "Yes – Heavy Rigid (HR) licence",
            "Yes – Multi Combination (MC) or other",
            "No – but I'm willing to get licensed",
            "No"
          ]
        },
      
        // 🔹 SECTION 5: COMMUNICATION & LANGUAGE
        {
          question: "What is your level of proficiency in English?",
          options: [
            "Native speaker",
            "Fluent",
            "Intermediate",
            "Basic",
            "Not proficient"
          ]
        },
        {
          question: "Are you fluent in any languages other than English?",
          options: [
            "Yes – [please specify]",
            "No"
          ]
        },
        {
          question: "Are you comfortable using workplace technology/tools (e.g., Zoom, Slack, CRM)?",
          options: [
            "Yes – highly proficient",
            "Yes – basic knowledge",
            "No – but willing to learn",
            "No – I prefer non-digital workflows"
          ]
        },
        {
          question: "Do you have customer service experience?",
          options: [
            "Yes – in-person (e.g. retail, hospitality)",
            "Yes – remote/phone-based (e.g. call centre)",
            "Yes – both in-person and remote",
            "No – but I'm willing to learn",
            "No"
          ]
        },
        {
          question: "Do you have experience handling cash or point-of-sale (POS) systems?",
          options: [
            "Yes – extensive cash handling and POS experience",
            "Yes – some experience",
            "No – but I'm willing to learn",
            "No"
          ]
        },
        {
          question: "Do you have experience with customer conflict resolution?",
          options: [
            "Yes – extensive experience handling complaints and escalations",
            "Yes – some experience",
            "No – but I've been trained in it",
            "No"
          ]
        },
        {
          question: "Do you have previous team management or leadership experience?",
          options: [
            "Yes – I have managed large teams (10+ people)",
            "Yes – I have managed small teams (2–9 people)",
            "Yes – but only on short-term projects",
            "No – but I have mentored others",
            "No – but I'm interested in leadership roles",
            "No"
          ]
        },
        {
          question: "Do you have experience working in multicultural teams or diverse environments?",
          options: [
            "Yes – regularly",
            "Yes – occasionally",
            "No – but I'm comfortable doing so",
            "No"
          ]
        },
        {
          question: "Are you comfortable working in high-pressure environments?",
          options: [
            "Yes – I thrive in fast-paced settings",
            "Yes – I can manage under pressure when required",
            "Somewhat – depends on the task",
            "No – I prefer steady-paced work environments"
          ]
        },
        {
          question: "Are you physically fit for roles that require manual labour or standing for long periods?",
          options: [
            "Yes – I can handle heavy lifting and physical work",
            "Yes – I'm comfortable standing or walking long hours",
            "Somewhat – I have mild limitations",
            "No – I require a seated/desk-based role"
          ]
        },
        {
          question: "Are you comfortable using or wearing personal protective equipment (PPE)?",
          options: [
            "Yes – I'm trained in PPE use",
            "Yes – I'm comfortable following PPE protocols",
            "No – but I'm willing to comply",
            "No"
          ]
        },
        {
          question: "Are you comfortable working in environments that require confidentiality (e.g., healthcare, legal)?",
          options: [
            "Yes – I've worked in such settings before",
            "Yes – I understand confidentiality practices",
            "No – but I'm willing to learn",
            "No"
          ]
        },
        {
          question: "Have you worked in compliance-heavy industries (e.g., finance, insurance, healthcare)?",
          options: [
            "Yes – extensive experience",
            "Yes – some experience",
            "No – but willing to undergo training",
            "No"
          ]
        },
      
        // This question is handled via UI dropdown/input
        {
          question: "What's your expected annual base salary?",
          options: []
        },
      
        {
          question: "Are you willing to undergo a pre-employment medical check?",
          options: [
            "Yes – no issues",
            "Yes – but I have medical conditions to declare",
            "No"
          ]
        }
      ];
      

    // Advanced questions organized by industry categories
    const advancedQuestionSections = {
        business: {
          title: "Business & Finance",
          categories: ["Accounting", "Banking & Financial Services", "Insurance & Superannuation", "Sales", "CEO & General Management", "Consulting & Strategy"],
          questions: [
            // Accounting
            {
              question: "Do you have experience using MYOB or Xero for invoicing?",
              options: ["Yes – MYOB", "Yes – Xero", "Yes – both", "No – but willing to learn", "No"]
            },
            {
              question: "Can you manage high-volume transactional processing?",
              options: ["Yes – regularly in past roles", "Yes – some experience", "No – not my strength"]
            },
            {
              question: "Are you familiar with Single Touch Payroll (STP) compliance in Australia?",
              options: ["Yes – fully confident", "Yes – basic knowledge", "No – unfamiliar"]
            },
            {
              question: "How many employees have you managed payroll for in previous roles?",
              options: ["1–10", "11–50", "51–200", "200+"]
            },
            {
              question: "Have you worked with Big 4 audit firms or equivalent clients?",
              options: ["Yes – Big 4", "Yes – non-Big 4 corporate clients", "No"]
            },
            {
              question: "Are you familiar with risk-based audit methodologies?",
              options: ["Yes – proficient", "Basic knowledge", "No"]
            },
            // Banking & Financial Services
            {
              question: "Are you RG146 compliant?",
              options: ["Yes – currently certified", "Previously certified (expired)", "No – not certified"]
            },
            {
              question: "Have you handled financial products such as loans, superannuation, or insurance?",
              options: ["Yes – all of the above", "Yes – some of the above", "No – but familiar with basic concepts", "No"]
            },
            {
              question: "What level of lending authority have you held in past roles?",
              options: ["Up to $50K", "$50K – $200K", "$200K – $1M", "Above $1M", "None"]
            },
            {
              question: "Have you worked with mortgage aggregation software or loan origination tools?",
              options: ["Yes – extensively", "Yes – limited experience", "No – but I'm willing to learn", "No"]
            },
            // Insurance & Superannuation
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
              options: ["Yes – 100+ claims/month", "Yes – occasional claims", "No"]
            },
            {
              question: "Are you proficient with risk assessment or underwriting software?",
              options: ["Yes – regularly use", "Yes – occasionally", "No"]
            },
            // Sales
            {
              question: "What type of sales are you most experienced in?",
              options: ["B2B (Business to Business)", "B2C (Business to Consumer)", "Telesales", "Retail", "Other"]
            },
            {
              question: "Are you confident in managing your own sales pipeline and CRM tools (e.g., Salesforce, Zoho)?",
              options: ["Yes – highly proficient", "Yes – some experience", "No"]
            },
            {
              question: "What's the average deal size you've handled?",
              options: ["Under $1,000", "$1,000–$10,000", "$10,000–$100,000", "$100,000+"]
            },
            {
              question: "Have you consistently met or exceeded sales targets?",
              options: ["Yes – consistently", "Sometimes", "No"]
            },
            // CEO & General Management
            {
              question: "Have you held full P&L responsibility in a leadership role?",
              options: ["Yes – full ownership", "Yes – partial responsibility", "No"]
            },
            {
              question: "Have you led business transformation or turnaround projects?",
              options: ["Yes – multiple times", "Yes – once", "No"]
            },
            {
              question: "What's the largest team you have managed?",
              options: ["1–10", "11–50", "51–200", "200+"]
            },
            {
              question: "Have you directly overseen budgeting and forecasting?",
              options: ["Yes – department-level", "Yes – full organization", "No"]
            },
            // Consulting & Strategy
            {
              question: "Are you experienced in using tools like Power BI, Tableau or SQL for reporting?",
              options: ["Yes – highly proficient", "Yes – beginner level", "No"]
            },
            {
              question: "Have you conducted SWOT, PESTEL or competitor analysis for clients?",
              options: ["Yes – all", "Yes – some", "No"]
            },
            {
              question: "Have you advised senior stakeholders or government on policy?",
              options: ["Yes – extensively", "Yes – limited projects", "No"]
            },
            {
              question: "Do you have experience in risk or change management frameworks?",
              options: ["Yes – certified (e.g., Prosci, ISO31000)", "Yes – non-certified", "No"]
            }
          ]
        },
        technology: {
          title: "Technology & Innovation",
          categories: ["Information & Communication Technology", "AI, Robotics & Emerging Tech", "Crypto, Blockchain & Web3", "Startups & Innovation", "Science & Technology"],
          questions: [
            // Information & Communication Technology
            {
              question: "Which languages are you most comfortable with?",
              options: ["JavaScript", "Python", "Java", "PHP", "C#", "Other"]
            },
            {
              question: "Do you follow Agile/Scrum practices?",
              options: ["Yes – certified", "Yes – experienced", "No"]
            },
            {
              question: "Which certifications do you currently hold?",
              options: ["CompTIA A+ / Network+", "CCNA / Cisco", "Microsoft Certified", "None"]
            },
            {
              question: "Have you managed IT infrastructure or security protocols in an organization?",
              options: ["Yes – end-to-end", "Yes – partially", "No"]
            },
            // Science & Technology
            {
              question: "Do you have lab experience in a regulated environment (e.g., GLP/GMP)?",
              options: ["Yes – GLP", "Yes – GMP", "Both", "No"]
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
              options: ["Yes – multiple", "Yes – a few", "No"]
            },
            // AI, Robotics & Emerging Tech
            {
              question: "Have you worked with any AI or robotics frameworks/tools?",
              options: ["Yes – TensorFlow / PyTorch / ROS / OpenCV / others", "Yes – custom-built solutions", "No – learning currently", "No – but interested"]
            },
            {
              question: "How do you stay updated on rapidly evolving AI/tech trends?",
              options: ["Follow leading researchers, newsletters, and GitHub", "Take courses and attend conferences", "Learn on the job or when required", "I'm not actively keeping up"]
            },
            {
              question: "How do you balance innovation with ethical responsibility in AI or robotics?",
              options: ["Follow ethical AI frameworks and safety reviews", "Raise red flags when needed, even if unpopular", "I focus more on performance than ethics", "I'm unsure how to evaluate ethics"]
            },
            // Crypto, Blockchain & Web3
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
              options: ["Yes – as a builder or founder", "Yes – as a contributor/community manager", "Yes – as an investor/user", "No – but researching", "No"]
            },
            // Startups & Innovation
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
            }
          ]
        },
        professional: {
          title: "Professional Services",
          categories: ["Legal", "Human Resources & Recruitment", "Real Estate & Property", "Education & Training", "Government & Defence"],
          questions: [
            // Legal
            {
              question: "Which legal systems or case management tools have you worked with?",
              options: ["LEAP", "Actionstep", "Affinity", "Other", "None"]
            },
            {
              question: "Do you have experience preparing legal briefs, documents or affidavits?",
              options: ["Yes – independently", "Yes – with supervision", "No"]
            },
            {
              question: "Which areas of law are you experienced in?",
              options: ["Family Law", "Criminal Law", "Corporate/Commercial", "Employment Law", "Intellectual Property", "Other"]
            },
            {
              question: "Are you admitted to practice in Australia?",
              options: ["Yes – admitted", "No – waiting admission", "No"]
            },
            // Human Resources & Recruitment
            {
              question: "Which HRIS systems are you familiar with?",
              options: ["SAP SuccessFactors", "Workday", "BambooHR", "Other (please specify)", "None"]
            },
            {
              question: "Do you have experience conducting interviews and onboarding?",
              options: ["Yes – full-cycle", "Yes – partially", "No"]
            },
            {
              question: "Are you trained in Fair Work compliance and Australian workplace law?",
              options: ["Yes – advanced level", "Basic understanding", "No"]
            },
            {
              question: "Do you have a Certificate IV in Work Health & Safety (WHS)?",
              options: ["Yes", "No – but studying", "No"]
            },
            // Real Estate & Property
            {
              question: "Do you hold a current real estate certificate or license (e.g., NSW Certificate of Registration)?",
              options: ["Yes – licensed", "No – but studying", "No"]
            },
            {
              question: "Which areas have you worked in?",
              options: ["Residential Sales", "Commercial Leasing", "Property Management", "Buyer Advocacy", "Other"]
            },
            {
              question: "Do you have experience using property software (e.g., Console, PropertyMe)?",
              options: ["Yes – confidently", "Yes – basic use", "No"]
            },
            {
              question: "Have you dealt with tenant disputes or VCAT matters?",
              options: ["Yes – frequently", "Yes – occasionally", "No"]
            },
            // Education & Training
            {
              question: "Are you registered with the relevant teaching authority (e.g., TRB or VIT)?",
              options: ["Yes – fully registered", "Yes – provisionally registered", "No – but in process", "No"]
            },
            {
              question: "Which curriculum are you most experienced in teaching?",
              options: ["Australian Curriculum", "IB (International Baccalaureate)", "British Curriculum", "Other (please specify)"]
            },
            {
              question: "Are you a certified workplace trainer (e.g., TAE40122)?",
              options: ["Yes", "No – but studying", "No"]
            },
            {
              question: "Do you have experience delivering online or hybrid training programs?",
              options: ["Yes – online only", "Yes – hybrid (online + face-to-face)", "No"]
            },
            // Government & Defence
            {
              question: "Are you currently or previously employed in a government department or agency?",
              options: ["Yes – currently", "Yes – previously", "No"]
            },
            {
              question: "Do you have NV1 or Baseline Security Clearance?",
              options: ["Yes – current", "Yes – expired", "No – but eligible", "No"]
            },
            {
              question: "Have you worked in a role involving legislation or regulatory compliance?",
              options: ["Yes – in-depth experience", "Yes – some experience", "No"]
            }
          ]
        },
        creative: {
          title: "Creative & Operations",
          categories: ["Advertising, Arts & Media", "Design & Architecture", "Marketing & Communications", "Call Centre & Customer Service", "Administration & Office Support"],
          questions: [
            // Advertising, Arts & Media
            {
              question: "Which design tools are you proficient in?",
              options: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva", "Other (please specify)"]
            },
            {
              question: "Do you have experience designing for both print and digital formats?",
              options: ["Yes – both print and digital", "Yes – digital only", "Yes – print only", "No"]
            },
            {
              question: "Have you published articles for mainstream media outlets or blogs?",
              options: ["Yes – mainstream media", "Yes – blogs or niche platforms", "No – personal writing only", "No"]
            },
            {
              question: "What writing styles are you most experienced in?",
              options: ["Editorial writing", "Copywriting/Advertising", "News reporting", "Scriptwriting", "Technical writing", "Other (please specify)"]
            },
            // Design & Architecture
            {
              question: "Are you proficient in AutoCAD, Revit, or SketchUp?",
              options: ["Yes – all", "Yes – some", "No"]
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
              options: ["Yes – UX/UI", "Yes – Branding", "Yes – Both", "No"]
            },
            // Marketing & Communications
            {
              question: "Which digital marketing platforms/tools are you most experienced in?",
              options: ["Google Ads", "Meta (Facebook) Business Manager", "HubSpot", "Mailchimp", "Other"]
            },
            {
              question: "Are you proficient in Google Analytics or other web reporting tools?",
              options: ["Yes – daily use", "Yes – occasional", "No"]
            },
            {
              question: "Have you managed campaigns across multiple channels (e.g., social, email, TV)?",
              options: ["Yes – end-to-end", "Yes – with support", "No"]
            },
            {
              question: "Do you have event coordination or sponsorship experience?",
              options: ["Yes – regularly", "Yes – occasionally", "No"]
            },
            // Call Centre & Customer Service
            {
              question: "What is your average call handling time (AHT)?",
              options: ["Less than 2 minutes", "2–5 minutes", "5–10 minutes", "Above 10 minutes", "I don't know"]
            },
            {
              question: "Have you consistently met KPIs in outbound call campaigns?",
              options: ["Yes – regularly exceeded targets", "Yes – consistently met targets", "Sometimes met targets", "No – struggled with targets", "No – not applicable"]
            },
            {
              question: "Have you led a team in a BPO or contact centre environment?",
              options: ["Yes – more than 10 people", "Yes – up to 10 people", "No – but I've acted in a supervisor role", "No"]
            },
            {
              question: "Do you have experience with workforce management tools (e.g., Genesys, NICE)?",
              options: ["Yes – proficient in multiple tools", "Yes – one specific tool", "Familiar with dashboards only", "No"]
            },
            // Administration & Office Support
            {
              question: "Are you comfortable handling multi-line phone systems?",
              options: ["Yes – experienced", "Yes – with limited experience", "No"]
            },
            {
              question: "Do you have experience greeting clients or visitors in a corporate environment?",
              options: ["Yes – regularly", "Yes – occasionally", "No"]
            },
            {
              question: "How many keystrokes per hour (KPH) can you type accurately?",
              options: ["Below 7,000 KPH", "7,000–10,000 KPH", "10,000–13,000 KPH", "Above 13,000 KPH", "I'm not sure"]
            },
            {
              question: "Are you familiar with CRM or ERP data entry systems?",
              options: ["Yes – CRM", "Yes – ERP", "Yes – both", "No – but willing to learn", "No"]
            }
          ]
        },
        industry: {
          title: "Industry & Trade",
          categories: ["Construction", "Engineering", "Manufacturing, Transport & Logistics", "Mining, Resources & Energy", "Trades & Services"],
          questions: [
            // Construction
            {
              question: "Do you have a valid White Card and First Aid certificate?",
              options: ["Yes – both", "Yes – only White Card", "Yes – only First Aid", "No"]
            },
            {
              question: "Have you supervised subcontractors or trades on-site?",
              options: ["Yes – frequently", "Yes – occasionally", "No"]
            },
            {
              question: "Have you managed residential, commercial, or civil construction projects?",
              options: ["Residential", "Commercial", "Civil", "All of the above", "None"]
            },
            {
              question: "What project values have you worked on (AUD)?",
              options: ["Under $100K", "$100K–$500K", "$500K–$1M", "$1M–$10M", "$10M+"]
            },
            // Engineering
            {
              question: "Do you have CPEng (Chartered Professional Engineer) or RPEQ registration?",
              options: ["Yes – current", "No – but eligible", "No"]
            },
            {
              question: "Which types of engineering projects have you worked on?",
              options: ["Infrastructure (roads, bridges)", "Commercial buildings", "Manufacturing / Industrial", "Energy / Utilities", "Other (please specify)"]
            },
            {
              question: "Are you proficient with CAD, SolidWorks, or engineering simulation tools?",
              options: ["Yes – expert", "Yes – intermediate", "No"]
            },
            {
              question: "Have you been involved in Lean, Six Sigma, or other process improvement methodologies?",
              options: ["Yes – certified", "Yes – practical experience only", "No"]
            },
            // Manufacturing, Transport & Logistics
            {
              question: "Are you experienced with specific machinery (e.g., CNC, forklifts, textile)?",
              options: ["Yes – CNC", "Yes – Forklifts", "Yes – Other industrial machinery", "No"]
            },
            {
              question: "Can you read and interpret technical drawings or production specs?",
              options: ["Yes – confidently", "Yes – limited exposure", "No"]
            },
            {
              question: "Do you hold any of the following licenses?",
              options: ["Forklift", "HR/MR/HC truck license", "Dangerous goods license", "None"]
            },
            {
              question: "Have you used warehouse management systems (e.g., SAP, NetSuite, Cin7)?",
              options: ["Yes – advanced user", "Yes – basic use", "No"]
            },
            {
              question: "Are you comfortable with strict KPIs like delivery time, safety, or packing accuracy?",
              options: ["Yes – thrive in structured environments", "Yes – if realistic", "No – prefer flexible roles"]
            },
            // Mining, Resources & Energy
            {
              question: "Are you experienced in FIFO or DIDO roles?",
              options: ["Yes – FIFO", "Yes – DIDO", "No"]
            },
            {
              question: "Do you hold a current Mining Induction (Standard 11) or BHP/RIIOHS certificate?",
              options: ["Yes – current", "Expired", "No"]
            },
            {
              question: "Have you worked on offshore rigs or gas pipelines?",
              options: ["Yes – offshore", "Yes – pipelines", "No"]
            },
            {
              question: "Are you trained in hazardous area compliance or isolation procedures?",
              options: ["Yes – fully certified", "Yes – partial knowledge", "No"]
            },
            // Trades & Services
            {
              question: "What licenses or trade certificates do you hold?",
              options: ["Electrical License", "Plumbing License", "Carpentry or Trade Certificate", "White Card", "Other"]
            },
            {
              question: "Are you experienced working with tools or heavy machinery?",
              options: ["Yes – daily use", "Yes – occasionally", "No"]
            },
            {
              question: "Do you have police clearance or security clearance for work?",
              options: ["Yes – current", "No – but willing to obtain", "No"]
            },
            {
              question: "Have you worked independently or as part of a mobile/on-call team?",
              options: ["Independently", "On-call/mobile team", "Both", "No"]
            }
          ]
        },
        health: {
          title: "Health & Community",
          categories: ["Healthcare & Medical", "Community Services & Development", "Sport & Recreation", "Hospitality & Tourism", "Retail & Consumer Products", "Farming, Animals & Conservation", "Self Employment"],
          questions: [
            // Healthcare & Medical
            {
              question: "Are you registered with AHPRA?",
              options: ["Yes – full registration", "Yes – limited registration", "No"]
            },
            {
              question: "What areas of care are you most experienced in?",
              options: ["Aged Care", "Acute Care", "Mental Health", "Community Nursing", "Theatre/ICU"]
            },
            {
              question: "Are you credentialed with any health funds or NDIS providers?",
              options: ["Yes – both", "Yes – one of them", "No"]
            },
            {
              question: "Do you have experience in writing treatment plans or conducting assessments?",
              options: ["Yes – regularly", "Occasionally", "No"]
            },
            // Community Services & Development
            {
              question: "Do you hold a Certificate III or IV in Individual Support or equivalent?",
              options: ["Yes – Certificate III", "Yes – Certificate IV", "No – but currently studying", "No"]
            },
            {
              question: "Are you comfortable with personal care and mobility assistance?",
              options: ["Yes", "Yes – with some support", "No"]
            },
            {
              question: "Do you hold a Working With Children Check (WWCC)?",
              options: ["Yes – current", "No – but willing to obtain", "No"]
            },
            {
              question: "Do you have trauma-informed care training?",
              options: ["Yes – advanced level", "Yes – introductory level", "No"]
            },
            // Sport & Recreation
            {
              question: "Are you accredited through Fitness Australia or equivalent?",
              options: ["Yes – current", "No – expired", "No – not registered"]
            },
            {
              question: "Do you hold a current CPR or First Aid certification?",
              options: ["Yes – both", "Yes – First Aid only", "No"]
            },
            {
              question: "Have you managed sport programs, leagues or events?",
              options: ["Yes – regularly", "Yes – occasionally", "No"]
            },
            {
              question: "Are you familiar with player safety guidelines or sports integrity policies?",
              options: ["Yes – strong knowledge", "Yes – general awareness", "No"]
            },
            // Hospitality & Tourism
            {
              question: "What type of kitchen environments have you worked in?",
              options: ["Café", "Fine Dining", "Hotel / Resort", "Catering / Events", "Other"]
            },
            {
              question: "Do you hold a current Food Safety or RSA certificate?",
              options: ["Yes – both", "Yes – Food Safety only", "Yes – RSA only", "No"]
            },
            {
              question: "Are you experienced with booking software like Opera, RMS, or RoomKey?",
              options: ["Yes – highly proficient", "Yes – basic level", "No"]
            },
            {
              question: "What's your level of spoken English for guest interactions?",
              options: ["Fluent", "Intermediate", "Basic", "Not fluent"]
            },
            // Retail & Consumer Products
            {
              question: "What retail environments have you worked in?",
              options: ["Supermarket", "Fashion / Apparel", "Electronics / Tech", "Hospitality / Café", "Other"]
            },
            {
              question: "Do you have POS or inventory management system experience?",
              options: ["Yes – POS only", "Yes – POS + Inventory", "No"]
            },
            {
              question: "Are you confident in managing merchandising plans and planograms?",
              options: ["Yes – independent role", "Yes – with support", "No"]
            },
            {
              question: "Have you worked with suppliers and negotiated wholesale pricing?",
              options: ["Yes – regularly", "Occasionally", "No"]
            },
            // Farming, Animals & Conservation
            {
              question: "Do you have qualifications in agriculture, biology or animal sciences?",
              options: ["Yes – agriculture", "Yes – animal sciences", "Yes – both", "No"]
            },
            {
              question: "Are you familiar with organic or sustainable farming practices?",
              options: ["Yes – in-depth knowledge", "Some knowledge", "No"]
            },
            {
              question: "Are you licensed or certified to work with animals (e.g., vet nurse, ranger)?",
              options: ["Yes – certified/licensed", "No – but studying", "No"]
            },
            {
              question: "Do you have fieldwork or park ranger experience?",
              options: ["Yes – government agency", "Yes – private sector", "No"]
            },
            // Self Employment
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
              options: ["Yes", "No – but willing to obtain", "No"]
            },
            {
              question: "How do you manage inconsistent income or downtime in self-employment?",
              options: ["Save during good periods and plan ahead", "Take side gigs or freelance work", "Look for part-time contracts", "I struggle with inconsistency"]
            }
          ]
        }
      };
      
    // Group questions by sections
    const questionSections = {
        section1: {
            title: "Work Rights & Legal Eligibility",
            questions: basicQuestionsWithOptions.slice(0, 5) // Questions 1-5
        },
        section2: {
            title: "Availability & Logistics", 
            questions: basicQuestionsWithOptions.slice(5, 12) // Questions 6-12
        },
        section3: {
            title: "Work Preferences",
            questions: basicQuestionsWithOptions.slice(12, 16) // Questions 13-16
        },
        section4: {
            title: "Education & Certifications", 
            questions: basicQuestionsWithOptions.slice(16, 20) // Questions 17-20
        },
        section5: {
            title: "Communication & Languages",
            questions: basicQuestionsWithOptions.slice(20) // Questions 21 to end
        }
    };

    // Toggle section dropdown visibility
    const toggleSectionDropdown = (sectionKey) => {
        setShowSectionDropdowns(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    // Toggle advanced section dropdown visibility
    const toggleAdvancedSectionDropdown = (sectionKey) => {
        setShowAdvancedSectionDropdowns(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    // Toggle question options visibility
    const toggleQuestionOptions = (sectionKey, questionIndex) => {
        const key = `${sectionKey}-${questionIndex}`;
        setShowQuestionOptions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleLogoUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setLogoFile(e.target.files[0]);
            
            // Update the formData with the logo file
            const reader = new FileReader();
            reader.onload = (event) => {
                handleChange({
                    target: {
                        name: 'companyLogo',
                        value: event.target.result
                    }
                });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    // Helper function to handle textarea and input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange({ target: { name, value } });
    };
    
    // Handle pricing option changes
    const handlePricingChange = (option, value) => {
        switch(option) {
            case 'premium':
                setPremiumSelected(value);
                handleChange({ 
                    target: { 
                        name: 'premiumListing', 
                        value, 
                        type: 'checkbox', 
                        checked: value 
                    } 
                });
                break;
            case 'immediate':
                setImmediateStartSelected(value);
                handleChange({ 
                    target: { 
                        name: 'immediateStart', 
                        value, 
                        type: 'checkbox', 
                        checked: value 
                    } 
                });
                break;
            case 'references':
                setReferencesSelected(value);
                handleChange({ 
                    target: { 
                        name: 'referencesRequired', 
                        value, 
                        type: 'checkbox', 
                        checked: value 
                    } 
                });
                break;
            case 'notification':
                setNotificationOption(value);
                handleChange({ 
                    target: { 
                        name: 'notificationOption', 
                        value 
                    } 
                });
                break;
            default:
                break;
        }
    };

    // Handle question selection
    const handleQuestionSelect = (e, question) => {
        const isChecked = e.target.checked;
        let updatedQuestions = [...(formData.jobQuestions || [])];
        
        if (isChecked) {
            updatedQuestions.push(question);
        } else {
            updatedQuestions = updatedQuestions.filter(q => q !== question);
            // Also remove from mandatory questions if unchecked
            const updatedMandatory = mandatoryQuestions.filter(q => q !== question);
            setMandatoryQuestions(updatedMandatory);
            handleChange({
                target: {
                    name: 'mandatoryQuestions',
                    value: updatedMandatory
                }
            });
        }
        
        handleChange({
            target: {
                name: 'jobQuestions',
                value: updatedQuestions
            }
        });
    };

    // Handle mandatory toggle
    const handleMandatoryToggle = (question, isMandatory) => {
        let updatedMandatory = [...mandatoryQuestions];
        
        if (isMandatory) {
            if (!updatedMandatory.includes(question)) {
                updatedMandatory.push(question);
            }
        } else {
            updatedMandatory = updatedMandatory.filter(q => q !== question);
        }
        
        setMandatoryQuestions(updatedMandatory);
        handleChange({
            target: {
                name: 'mandatoryQuestions',
                value: updatedMandatory
            }
        });
    };

    // Initialize basic questions on component mount - removed auto-inclusion
    useEffect(() => {
        // Initialize mandatory questions state from formData
        if (formData.mandatoryQuestions) {
            setMandatoryQuestions(formData.mandatoryQuestions);
        }
    }, [formData.mandatoryQuestions]);

    return (
        <div className="flex flex-col lg:flex-row bg-white shadow-lg border-2 border-blue-800">
            {/* Main Content */}
            <div className="lg:w-3/4 p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Write Ad</h2>
                    <p className="text-gray-600">Get started with a draft job description and summary, based on your role information.</p>
                </div>
                
                {/* Job Description Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Job description</label>
                    <textarea 
                        className="w-full border border-gray-300 p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter detailed job description here"
                        name="jobDescription"
                        value={formData.jobDescription || ''}
                        onChange={handleInputChange}
                    />
                </div>
                
                {/* Job Summary Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Job summary</label>
                    <p className="text-gray-500 text-sm mb-2">Write a compelling statement about your role in white to more candidates.</p>
                    <textarea 
                        className="w-full border border-gray-300 p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter job summary here"
                        name="jobSummary"
                        value={formData.jobSummary || ''}
                        onChange={handleInputChange}
                    />
                </div>
                
                {/* Key Selling Points Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Key selling points <span className="text-gray-500">(optional)</span></label>
                    <p className="text-gray-500 text-sm mb-2">Enter 3 key selling points to attract candidates to view your role.</p>
                    <div className="space-y-2">
                        {[0, 1, 2].map((index) => (
                            <input 
                                key={index}
                                type="text" 
                                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Enter a key selling point"
                                value={formData.sellingPoints && formData.sellingPoints[index] ? formData.sellingPoints[index] : ''}
                                onChange={(e) => {
                                    const updatedPoints = [...(formData.sellingPoints || [])];
                                    updatedPoints[index] = e.target.value;
                                    handleChange({
                                        target: {
                                            name: 'sellingPoints',
                                            value: updatedPoints
                                        }
                                    });
                                }}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Company Logo Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Company brand <span className="text-gray-500">(optional)</span></label>
                    <p className="text-gray-500 text-sm mb-2">Create your first brand by uploading your company logo.</p>
                    <div className="border border-gray-300 p-4 flex items-center justify-center h-32 bg-gray-100">
                        {logoFile || formData.companyLogo ? (
                            <div className="text-center">
                                {logoFile ? (
                                <p>{logoFile.name}</p>
                                ) : (
                                    <img 
                                        src={formData.companyLogo} 
                                        alt="Company Logo" 
                                        className="h-24 object-contain" 
                                    />
                                )}
                                <button 
                                    className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                                    onClick={() => {
                                        setLogoFile(null);
                                        handleChange({
                                            target: {
                                                name: 'companyLogo',
                                                value: ''
                                            }
                                        });
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-500 mb-2">Cover image can be added from the uploads page, after payment.</p>
                                <label className="bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-700">
                                    Add logo
                                    <input type="file" className="hidden" onChange={handleLogoUpload} />
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Job Banner Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Job banner <span className="text-gray-500">(optional)</span></label>
                    <p className="text-gray-500 text-sm mb-2">Add a banner image URL to make your job post stand out.</p>
                    <input 
                        type="text" 
                        className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter banner image URL"
                        name="jobBanner"
                        value={formData.jobBanner || ''}
                        onChange={handleInputChange}
                    />
                    {formData.jobBanner && (
                        <div className="mt-2">
                            <img 
                                src={formData.jobBanner} 
                                alt="Job Banner Preview" 
                                className="h-24 object-cover border border-gray-200" 
                            />
                        </div>
                    )}
                </div>
                
                {/* Video Section */}
                <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-2">Video <span className="text-gray-500">(optional)</span></label>
                    <p className="text-gray-500 text-sm mb-2">Enter a link to your ad with a YouTube link. The video will appear at the bottom of your ad.</p>
                    <input 
                        type="text" 
                        className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="e.g. https://www.youtube.com/watch?v=abc123"
                        name="videoLink"
                        value={formData.videoLink || ''}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Job Questions Section */}
                <div className="mb-8 border-t pt-8 border-gray-300">
                    <div className="flex items-center mb-2">
                        <h2 className="text-xl font-bold text-gray-800">Questions</h2>
                        <span className="ml-2 text-gray-500 text-sm">(optional)</span>
                    </div>
                    
                    {/* Basic Questions Section */}
                    <div className="mb-6">
                        <div 
                            className="flex items-center justify-between cursor-pointer p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                            onClick={() => setShowBasicQuestions(!showBasicQuestions)}
                        >
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Basic Questions</h3>
                                <p className="text-gray-500 text-sm">
                                    Essential questions that you can choose to include in your application form
                                </p>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                                <svg 
                                    className={`w-6 h-6 text-gray-600 font-bold transition-transform duration-200 ${showBasicQuestions ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        {showBasicQuestions && (
                            <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                                <div className="space-y-4">
                                    {Object.entries(questionSections).map(([sectionKey, section]) => (
                                        <div key={sectionKey} className="bg-white rounded-md border border-blue-200 overflow-hidden">
                                            {/* Section Header */}
                                            <div 
                                                className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                                onClick={() => toggleSectionDropdown(sectionKey)}
                                            >
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-white text-sm font-bold">
                                                            {sectionKey.replace('section', '')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-semibold text-gray-800">
                                                            Section {sectionKey.replace('section', '')}: {section.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {section.questions.length} questions
                                                        </p>
                                                    </div>
                                                </div>
                                                <svg 
                                                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                                                        showSectionDropdowns[sectionKey] ? 'rotate-180' : ''
                                                    }`}
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            
                                            {/* Section Questions */}
                                            {showSectionDropdowns[sectionKey] && (
                                                <div className="p-4 space-y-3 border-t border-gray-200">
                                                    {section.questions.map((questionObj, questionIndex) => (
                                                        <div key={questionIndex} className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                                                            <input 
                                                                type="checkbox" 
                                                                className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                                                                id={`basic-question-${sectionKey}-${questionIndex}`} 
                                                                checked={formData.jobQuestions && formData.jobQuestions.includes(questionObj.question)}
                                                                onChange={(e) => handleQuestionSelect(e, questionObj.question)}
                                                            />
                                                            <div className="flex-1">
                                                                <label htmlFor={`basic-question-${sectionKey}-${questionIndex}`} className="text-gray-700 cursor-pointer text-sm font-medium">
                                                                    {questionObj.question}
                                                                </label>
                                                                <div className="flex items-center space-x-4 mt-2">
                                                                    {questionObj.options && questionObj.options.length > 0 ? (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                toggleQuestionOptions(sectionKey, questionIndex);
                                                                            }}
                                                                            className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                                                            title="View answer options"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                            </svg>
                                                                        </button>
                                                                    ) : (
                                                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                                            Candidate will fill from app
                                                                        </span>
                                                                    )}
                                                                    
                                                                    {/* Mandatory Toggle Switch */}
                                                                    {formData.jobQuestions && formData.jobQuestions.includes(questionObj.question) && (
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="text-xs text-gray-600">Make Mandatory:</span>
                                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    className="sr-only peer"
                                                                                    checked={mandatoryQuestions.includes(questionObj.question)}
                                                                                    onChange={(e) => handleMandatoryToggle(questionObj.question, e.target.checked)}
                                                                                />
                                                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                
                                                                {/* Question Options Dropdown */}
                                                                {questionObj.options && questionObj.options.length > 0 && showQuestionOptions[`${sectionKey}-${questionIndex}`] && (
                                                                    <div className="mt-2">
                                                                        <div className="bg-white rounded-md p-2 border border-gray-300">
                                                                            <p className="text-xs font-medium text-gray-700 mb-1">Answer options:</p>
                                                                            <ul className="space-y-1">
                                                                                {questionObj.options.map((option, optionIndex) => (
                                                                                    <li key={optionIndex} className="text-xs text-gray-600 flex items-center">
                                                                                        <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                                                                                        {option}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Advanced Questions Section */}
                    <div className="mb-6">
                        <div 
                            className="flex items-center justify-between cursor-pointer p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                            onClick={() => setShowAdvancedQuestions(!showAdvancedQuestions)}
                        >
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Advanced Questions</h3>
                                <p className="text-gray-500 text-sm">
                                    Optional questions to help you better screen applicants
                                </p>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                                <svg 
                                    className={`w-6 h-6 text-gray-600 font-bold transition-transform duration-200 ${showAdvancedQuestions ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        {showAdvancedQuestions && (
                            <div className="mt-4 bg-purple-50 p-4 rounded-md border border-purple-100">
                                <div className="space-y-4">
                                    {Object.entries(advancedQuestionSections).map(([sectionKey, section]) => (
                                        <div key={sectionKey} className="bg-white rounded-md border border-purple-200 overflow-hidden">
                                            {/* Section Header */}
                                            <div 
                                                className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                                onClick={() => toggleAdvancedSectionDropdown(sectionKey)}
                                            >
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-white text-xs font-bold">
                                                            {sectionKey.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-semibold text-gray-800">
                                                            {section.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {section.categories.join(", ")}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {section.questions.length} questions available
                                                        </p>
                                                    </div>
                                                </div>
                                                <svg 
                                                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                                                        showAdvancedSectionDropdowns[sectionKey] ? 'rotate-180' : ''
                                                    }`}
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            
                                            {/* Section Questions */}
                                            {showAdvancedSectionDropdowns[sectionKey] && (
                                                <div className="p-4 space-y-3 border-t border-gray-200">
                                                    {section.questions.map((questionObj, questionIndex) => (
                                                        <div key={questionIndex} className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                                                            <input 
                                                                type="checkbox" 
                                                                className="mt-1 mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                                                                id={`advanced-question-${sectionKey}-${questionIndex}`} 
                                                                checked={formData.jobQuestions && formData.jobQuestions.includes(questionObj.question)}
                                                                onChange={(e) => handleQuestionSelect(e, questionObj.question)}
                                                            />
                                                            <div className="flex-1">
                                                                <label htmlFor={`advanced-question-${sectionKey}-${questionIndex}`} className="text-gray-700 cursor-pointer text-sm font-medium">
                                                                    {questionObj.question}
                                                                </label>
                                                                <div className="flex items-center space-x-4 mt-2">
                                                                    {questionObj.options && questionObj.options.length > 0 ? (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                toggleQuestionOptions(sectionKey, questionIndex);
                                                                            }}
                                                                            className="p-1 text-purple-600 hover:bg-purple-100 rounded-full transition-colors"
                                                                            title="View answer options"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                            </svg>
                                                                        </button>
                                                                    ) : (
                                                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                                            Candidate will fill from app
                                                                        </span>
                                                                    )}
                                                                    
                                                                    {/* Mandatory Toggle Switch */}
                                                                    {formData.jobQuestions && formData.jobQuestions.includes(questionObj.question) && (
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="text-xs text-gray-600">Make Mandatory:</span>
                                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    className="sr-only peer"
                                                                                    checked={mandatoryQuestions.includes(questionObj.question)}
                                                                                    onChange={(e) => handleMandatoryToggle(questionObj.question, e.target.checked)}
                                                                                />
                                                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                
                                                                {/* Question Options Dropdown */}
                                                                {questionObj.options && questionObj.options.length > 0 && showQuestionOptions[`${sectionKey}-${questionIndex}`] && (
                                                                    <div className="mt-2">
                                                                        <div className="bg-white rounded-md p-2 border border-gray-300">
                                                                            <p className="text-xs font-medium text-gray-700 mb-1">Answer options:</p>
                                                                            <ul className="space-y-1">
                                                                                {questionObj.options.map((option, optionIndex) => (
                                                                                    <li key={optionIndex} className="text-xs text-gray-600 flex items-center">
                                                                                        <span className="w-1 h-1 bg-purple-400 rounded-full mr-2 flex-shrink-0"></span>
                                                                                        {option}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="mb-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="ml-2 text-sm text-blue-700">
                                Your questions and answers can't be changed after you post your job ad. This is to ensure 
                                a fair application process for all candidates.
                            </p>
                        </div>
                    </div>
                    
                </div>
                
                <div className="flex justify-between gap-4 mt-10">
                    <button
                        onClick={() => handleStageChange('Ad Types')}
                        className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Back to Ad Types
                    </button>
                    <button
                        onClick={() => handleStageChange('Manage')}
                        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Continue to Manage
                    </button>
                </div>
            </div>
            
            {/* Pricing Summary Sidebar */}
            <div className="lg:w-1/4 bg-gray-50 p-6 border-l border-gray-200 hidden lg:block">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your Job Ad Summary</h3>
                
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden mb-6">
                    <div className="bg-blue-600 text-white p-3 font-bold">
                        Premium Job Ad
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Premium Job Ad:</span>
                            <span className="font-bold text-lg">${premiumCost}</span>
                        </div>
                        
                        <div className="text-sm space-y-1 mb-4">
                            <p className="font-medium">Includes:</p>
                            <ul className="list-disc ml-4 text-gray-600 space-y-1">
                                <li>30-day job listing</li>
                                <li>Unlimited applicants</li>
                                <li>Dashboard & management tools</li>
                                <li>Free access to candidates profiles</li>
                                <li>Complete branding</li>
                                <li>Priority placement in search results</li>
                                <li>Featured job badge</li>
                            </ul>
                        </div>
                        
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id="immediate-start" 
                                        className="mr-2 h-4 w-4"
                                        checked={immediateStartSelected}
                                        onChange={(e) => handlePricingChange('immediate', e.target.checked)}
                                    />
                                    <label htmlFor="immediate-start" className="text-sm font-medium">Immediate Start Badge</label>
                                </div>
                                <span className="text-sm font-semibold">${immediateCost}</span>
                            </div>
                            
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id="references" 
                                        className="mr-2 h-4 w-4"
                                        checked={referencesSelected}
                                        onChange={(e) => handlePricingChange('references', e.target.checked)}
                                    />
                                    <label htmlFor="references" className="text-sm font-medium">References Required</label>
                                </div>
                                <span className="text-sm font-semibold">${referencesCost}</span>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <p className="text-sm font-medium mb-2">Notification Options:</p>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            id="notify-both" 
                                            name="notification" 
                                            className="mr-2 h-4 w-4"
                                            checked={notificationOption === 'both'}
                                            onChange={() => handlePricingChange('notification', 'both')}
                                        />
                                        <label htmlFor="notify-both" className="text-sm">
                                            Email & SMS ($69)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            id="notify-email" 
                                            name="notification" 
                                            className="mr-2 h-4 w-4"
                                            checked={notificationOption === 'email'}
                                            onChange={() => handlePricingChange('notification', 'email')}
                                        />
                                        <label htmlFor="notify-email" className="text-sm">
                                            Email only ($49)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            id="notify-sms" 
                                            name="notification" 
                                            className="mr-2 h-4 w-4"
                                            checked={notificationOption === 'sms'}
                                            onChange={() => handlePricingChange('notification', 'sms')}
                                        />
                                        <label htmlFor="notify-sms" className="text-sm">
                                            SMS only ($49)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            id="notify-none" 
                                            name="notification" 
                                            className="mr-2 h-4 w-4"
                                            checked={notificationOption === 'none'}
                                            onChange={() => handlePricingChange('notification', 'none')}
                                        />
                                        <label htmlFor="notify-none" className="text-sm">
                                            No notifications
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="font-bold">Total:</span>
                            <span className="font-bold text-xl text-blue-600">${totalCost}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Plus applicable taxes</p>
                    </div>
                </div>
                </div>
                
                {/* Mobile Job Ad Summary - Only visible on mobile devices */}
                <div className="block lg:hidden mt-10 border border-gray-300 shadow-md rounded-md bg-white">
                    <div className="bg-blue-600 text-white py-3 px-4 font-bold">
                        Your Job Ad Summary
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between mb-2">
                        <span className="font-semibold">Premium Job Ad Package:</span>
                        <span className="font-bold text-xl">${premiumCost}</span>
                        </div>
                        
                        <div className="text-sm space-y-1 mb-4">
                            <p className="font-medium">Includes:</p>
                            <ul className="list-disc ml-4 text-gray-600 space-y-1">
                                <li>30-day job listing</li>
                                <li>Unlimited applicants</li>
                                <li>Dashboard & management tools</li>
                                <li>Free access to candidates profiles</li>
                                <li>Send & Receive messages with candidates</li>
                                <li>Complete branding</li>
                            </ul>
                            <p className="mt-2 text-gray-600">Add your logo, cover photo, embedded video to stand out</p>
                            <p className="text-gray-600">LinkedIn, Career profile access (if provided by candidate)</p>
                        </div>
                        
                        {immediateStartSelected && (
                            <div className="flex justify-between mt-4 mb-2">
                                <span>Immediate Start Badge:</span>
                            <span className="font-semibold">${immediateCost}</span>
                            </div>
                        )}
                        
                        {immediateStartSelected && (
                            <p className="text-xs text-gray-600 mb-4">Let candidates know you're hiring urgently</p>
                        )}
                        
                    <div className="flex justify-between mt-4 font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600 text-xl">${totalCost}</span>
                            </div>
                        </div>
                        </div>
        </div>
    );
};

export default WriteSection; 