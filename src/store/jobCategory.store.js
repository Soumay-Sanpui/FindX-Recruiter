import { advanceQuestion } from './advanceQuestion.js';

// Mapping between main job categories (from ClassifySection) and advance question categories
const categoryMapping = {
    // Business & Finance related
    "Accounting & Finance": ["Accounting", "Banking & Financial Services", "Insurance & Superannuation", "CEO & General Management", "Consulting & Strategy"],
    "Banking & Financial Services": ["Banking & Financial Services", "Insurance & Superannuation", "Accounting"],
    "Sales & Marketing": ["Sales", "Marketing & Communications", "Advertising, Arts & Media"],
    "Management & Consulting": ["CEO & General Management", "Consulting & Strategy", "Human Resources & Recruitment"],
    
    // Technology related
    "Information Technology": ["IT", "AI", "Crypto", "Startups", "Science"],
    "Engineering & Technical": ["Engineering", "Science", "IT"],
    "Science & Research": ["Science", "Engineering", "IT"],
    
    // Professional Services
    "Legal Services": ["Legal"],
    "Human Resources": ["HumanResources", "CEO & General Management"],
    "Real Estate": ["RealEstate"],
    "Education & Training": ["Education"],
    "Government": ["Government"],
    
    // Creative & Media
    "Advertising & Media": ["Advertising", "Design", "Marketing"],
    "Design & Architecture": ["Design", "Engineering"],
    "Marketing & Communications": ["Marketing", "Advertising", "CallCentre"],
    
    // Operations & Support
    "Administration": ["Administration", "CallCentre"],
    "Customer Service": ["CallCentre", "Administration", "Retail"],
    "Call Centre": ["CallCentre", "Administration"],
    
    // Industry & Trade
    "Construction": ["Construction", "Engineering", "Trades"],
    "Manufacturing": ["Manufacturing", "Engineering", "Trades"],
    "Mining & Resources": ["Mining", "Engineering", "Trades"],
    "Transport & Logistics": ["Manufacturing", "Trades"],
    "Trades & Services": ["Trades", "Construction"],
    
    // Health & Community
    "Healthcare": ["Healthcare", "CommunityServices"],
    "Community Services": ["CommunityServices", "Healthcare", "Education"],
    "Sport & Recreation": ["Sport", "Healthcare", "Education"],
    
    // Hospitality & Retail
    "Hospitality & Tourism": ["Hospitality", "Retail", "CallCentre"],
    "Retail": ["Retail", "Sales", "CallCentre"],
    
    // Other
    "Farming & Agriculture": ["Farming"],
    "Self Employment": ["SelfEmployment"],
    
    // Default fallback - show all if no specific mapping
    "Other": Object.keys(advanceQuestion)
};

// Function to get filtered advance questions based on main category
export const getAdvanceQuestionsByCategory = (mainCategory) => {
    if (!mainCategory) {
        return {};
    }
    
    // Get the mapped question categories for this main category
    const questionCategories = categoryMapping[mainCategory] || [];
    
    // If no mapping found, try to find a direct match
    if (questionCategories.length === 0) {
        // Try direct match with advance question keys
        const directMatch = Object.keys(advanceQuestion).find(key => 
            key.toLowerCase().includes(mainCategory.toLowerCase()) ||
            mainCategory.toLowerCase().includes(key.toLowerCase()) ||
            advanceQuestion[key].title.toLowerCase().includes(mainCategory.toLowerCase()) ||
            mainCategory.toLowerCase().includes(advanceQuestion[key].title.toLowerCase())
        );
        
        if (directMatch) {
            return { [directMatch]: advanceQuestion[directMatch] };
        }
        
        // If still no match found, show all questions as fallback for development
        // In production, you might want to return {} instead
        return advanceQuestion;
    }
    
    // Filter advance questions based on mapped categories
    const filteredQuestions = {};
    questionCategories.forEach(category => {
        if (advanceQuestion[category]) {
            filteredQuestions[category] = advanceQuestion[category];
        }
    });
    
    return filteredQuestions;
};

// Function to get organized sections for UI display
export const getAdvanceQuestionSections = (mainCategory) => {
    const filteredQuestions = getAdvanceQuestionsByCategory(mainCategory);
    
    if (Object.keys(filteredQuestions).length === 0) {
        return {};
    }
    
    // Organize questions into logical sections for better UI
    const sections = {};
    
    // Business & Finance section
    const businessCategories = ["Accounting", "Banking & Financial Services", "Insurance & Superannuation", "Sales", "CEO & General Management", "Consulting & Strategy"];
    const businessQuestions = [];
    businessCategories.forEach(cat => {
        if (filteredQuestions[cat]) {
            businessQuestions.push(...filteredQuestions[cat].questions);
        }
    });
    if (businessQuestions.length > 0) {
        sections.business = {
            title: "Business & Finance",
            categories: businessCategories.filter(cat => filteredQuestions[cat]),
            questions: businessQuestions
        };
    }
    
    // Technology section
    const techCategories = ["IT", "AI", "Crypto", "Startups", "Science"];
    const techQuestions = [];
    techCategories.forEach(cat => {
        if (filteredQuestions[cat]) {
            techQuestions.push(...filteredQuestions[cat].questions);
        }
    });
    if (techQuestions.length > 0) {
        sections.technology = {
            title: "Technology & Innovation",
            categories: techCategories.filter(cat => filteredQuestions[cat]),
            questions: techQuestions
        };
    }
    
    // Professional Services section
    const professionalCategories = ["Legal", "HumanResources", "RealEstate", "Education", "Government"];
    const professionalQuestions = [];
    professionalCategories.forEach(cat => {
        if (filteredQuestions[cat]) {
            professionalQuestions.push(...filteredQuestions[cat].questions);
        }
    });
    if (professionalQuestions.length > 0) {
        sections.professional = {
            title: "Professional Services",
            categories: professionalCategories.filter(cat => filteredQuestions[cat]),
            questions: professionalQuestions
        };
    }
    
    // Creative & Operations section
    const creativeCategories = ["Advertising", "Design", "Marketing", "CallCentre", "Administration"];
    const creativeQuestions = [];
    creativeCategories.forEach(cat => {
        if (filteredQuestions[cat]) {
            creativeQuestions.push(...filteredQuestions[cat].questions);
        }
    });
    if (creativeQuestions.length > 0) {
        sections.creative = {
            title: "Creative & Operations",
            categories: creativeCategories.filter(cat => filteredQuestions[cat]),
            questions: creativeQuestions
        };
    }
    
    // Industry & Trade section
    const industryCategories = ["Construction", "Engineering", "Manufacturing", "Mining", "Trades"];
    const industryQuestions = [];
    industryCategories.forEach(cat => {
        if (filteredQuestions[cat]) {
            industryQuestions.push(...filteredQuestions[cat].questions);
        }
    });
    if (industryQuestions.length > 0) {
        sections.industry = {
            title: "Industry & Trade",
            categories: industryCategories.filter(cat => filteredQuestions[cat]),
            questions: industryQuestions
        };
    }
    
    // Health & Community section
    const healthCategories = ["Healthcare", "CommunityServices", "Sport", "Hospitality", "Retail", "Farming", "SelfEmployment"];
    const healthQuestions = [];
    healthCategories.forEach(cat => {
        if (filteredQuestions[cat]) {
            healthQuestions.push(...filteredQuestions[cat].questions);
        }
    });
    if (healthQuestions.length > 0) {
        sections.health = {
            title: "Health & Community",
            categories: healthCategories.filter(cat => filteredQuestions[cat]),
            questions: healthQuestions
        };
    }
    
    return sections;
};

export default {
    getAdvanceQuestionsByCategory,
    getAdvanceQuestionSections,
    categoryMapping
};
