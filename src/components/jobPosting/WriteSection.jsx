import React, { useState, useEffect } from 'react';
import PricingSummary from './PricingSummary';
import { getAdvanceQuestionSections } from '../../store/jobCategory.store.js';

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
    
    // Add state for selected question options
    const [selectedOptions, setSelectedOptions] = useState(formData.selectedOptions || {});
    
    // State for filtered advanced questions based on selected category
    const [filteredAdvancedQuestions, setFilteredAdvancedQuestions] = useState({});
    
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
      

    // Effect to update filtered advanced questions when category changes
    useEffect(() => {
        if (formData.category) {
            const filtered = getAdvanceQuestionSections(formData.category);
            setFilteredAdvancedQuestions(filtered);
        } else {
            setFilteredAdvancedQuestions({});
        }
    }, [formData.category]);
      
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

    // Handle option selection
    const handleOptionSelect = (question, option, isSelected) => {
        let updatedOptions = { ...selectedOptions };
        
        if (!updatedOptions[question]) {
            updatedOptions[question] = [];
        }
        
        if (isSelected) {
            if (!updatedOptions[question].includes(option)) {
                updatedOptions[question].push(option);
            }
        } else {
            updatedOptions[question] = updatedOptions[question].filter(opt => opt !== option);
            // If no options are selected for this question, remove the question key
            if (updatedOptions[question].length === 0) {
                delete updatedOptions[question];
            }
        }
        
        setSelectedOptions(updatedOptions);
        handleChange({
            target: {
                name: 'selectedOptions',
                value: updatedOptions
            }
        });
    };

    // Validate selected questions have options
    const validateQuestionsWithOptions = () => {
        if (!formData.jobQuestions || formData.jobQuestions.length === 0) {
            return true; // No questions selected, no validation needed
        }

        const questionsWithoutOptions = [];
        
        formData.jobQuestions.forEach(question => {
            // Find the question object to check if it has options
            let questionObj = null;
            
            // Check in basic questions
            const allBasicQuestions = Object.values(questionSections).flat().map(section => section.questions).flat();
            questionObj = allBasicQuestions.find(q => q.question === question);
            
            // Check in advanced questions if not found in basic
            if (!questionObj) {
                const allAdvancedQuestions = Object.values(filteredAdvancedQuestions).map(section => section.questions).flat();
                questionObj = allAdvancedQuestions.find(q => q.question === question);
            }
            
            // If question has options but no options are selected
            if (questionObj && questionObj.options && questionObj.options.length > 0) {
                if (!selectedOptions[question] || selectedOptions[question].length === 0) {
                    questionsWithoutOptions.push(question);
                }
            }
        });

        if (questionsWithoutOptions.length > 0) {
            const questionList = questionsWithoutOptions.map(q => `• ${q}`).join('\n');
            alert(`Please select answer options for the following questions before continuing:\n\n${questionList}`);
            return false;
        }

        return true;
    };

    // Effect to update filtered advanced questions when category changes
    useEffect(() => {
        if (formData.category) {
            const filtered = getAdvanceQuestionSections(formData.category);
            setFilteredAdvancedQuestions(filtered);
        } else {
            setFilteredAdvancedQuestions({});
        }
    }, [formData.category]);

    // Initialize basic questions on component mount - removed auto-inclusion
    useEffect(() => {
        // Initialize mandatory questions state from formData
        if (formData.mandatoryQuestions) {
            setMandatoryQuestions(formData.mandatoryQuestions);
        }
        // Initialize selected options state from formData
        if (formData.selectedOptions) {
            setSelectedOptions(formData.selectedOptions);
        }
    }, [formData.mandatoryQuestions, formData.selectedOptions]);

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
                                                                        <div className="bg-white rounded-md p-3 border border-gray-300">
                                                                            <p className="text-xs font-medium text-gray-700 mb-2">Select answer options to show to candidates:</p>
                                                                            <div className="space-y-2">
                                                                                {questionObj.options.map((option, optionIndex) => (
                                                                                    <div key={optionIndex} className="flex items-start">
                                                                                        <input 
                                                                                            type="checkbox" 
                                                                                            className="mt-0.5 mr-2 h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                                                                                            id={`basic-option-${sectionKey}-${questionIndex}-${optionIndex}`}
                                                                                            checked={selectedOptions[questionObj.question] && selectedOptions[questionObj.question].includes(option)}
                                                                                            onChange={(e) => handleOptionSelect(questionObj.question, option, e.target.checked)}
                                                                                        />
                                                                                        <label 
                                                                                            htmlFor={`basic-option-${sectionKey}-${questionIndex}-${optionIndex}`}
                                                                                            className="text-xs text-gray-600 cursor-pointer flex-1"
                                                                                        >
                                                                                            {option}
                                                                                        </label>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="mt-2 pt-2 border-t border-gray-200">
                                                                                <p className="text-xs text-gray-500">
                                                                                    Selected: {selectedOptions[questionObj.question] ? selectedOptions[questionObj.question].length : 0} / {questionObj.options.length}
                                                                                </p>
                                                                            </div>
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
                                    {formData.category ? 
                                        `Specialized questions for "${formData.category}" category` : 
                                        'Select a category in Classify section to see specialized questions'
                                    }
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
                                {Object.keys(filteredAdvancedQuestions).length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="text-gray-500 mb-2">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-1">No Advanced Questions Available</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {formData.category ? 
                                                `No specialized questions are available for "${formData.category}". You can still use the basic questions above.` : 
                                                'Please select a main category in the Classify section to see relevant advanced questions.'
                                            }
                                        </p>
                                        {!formData.category && (
                                            <button
                                                onClick={() => handleStageChange('Classify')}
                                                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                                            >
                                                Go to Classify Section
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {formData.category && (
                                            <div className="mb-4 p-3 bg-purple-100 border border-purple-200 rounded-md">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm text-purple-700 font-medium">
                                                        Showing questions relevant to "{formData.category}" category
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="space-y-4">
                                            {Object.entries(filteredAdvancedQuestions).map(([sectionKey, section]) => (
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
                                                                        <div className="bg-white rounded-md p-3 border border-gray-300">
                                                                            <p className="text-xs font-medium text-gray-700 mb-2">Select answer options to show to candidates:</p>
                                                                            <div className="space-y-2">
                                                                                {questionObj.options.map((option, optionIndex) => (
                                                                                    <div key={optionIndex} className="flex items-start">
                                                                                        <input 
                                                                                            type="checkbox" 
                                                                                            className="mt-0.5 mr-2 h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                                                                                            id={`advanced-option-${sectionKey}-${questionIndex}-${optionIndex}`}
                                                                                            checked={selectedOptions[questionObj.question] && selectedOptions[questionObj.question].includes(option)}
                                                                                            onChange={(e) => handleOptionSelect(questionObj.question, option, e.target.checked)}
                                                                                        />
                                                                                        <label 
                                                                                            htmlFor={`advanced-option-${sectionKey}-${questionIndex}-${optionIndex}`}
                                                                                            className="text-xs text-gray-600 cursor-pointer flex-1"
                                                                                        >
                                                                                            {option}
                                                                                        </label>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="mt-2 pt-2 border-t border-gray-200">
                                                                                <p className="text-xs text-gray-500">
                                                                                    Selected: {selectedOptions[questionObj.question] ? selectedOptions[questionObj.question].length : 0} / {questionObj.options.length}
                                                                                </p>
                                                                            </div>
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
                                    </>
                                )}
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
                        onClick={() => {
                            if (validateQuestionsWithOptions()) {
                                handleStageChange('Manage');
                            }
                        }}
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