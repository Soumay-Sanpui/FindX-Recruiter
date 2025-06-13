import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { useCreateJob } from '../hooks/useJobs';
import DHeader from '../components/dashboard/DHeader';
import Timeline from '../components/jobPosting/Timeline';
import ClassifySection from '../components/jobPosting/ClassifySection';
import AdTypesSection from '../components/jobPosting/AdTypesSection';
import WriteSection from '../components/jobPosting/WriteSection';
import ManageSection from '../components/jobPosting/ManageSection';

const JobPosting = () => {
    const { employer } = useEmployerStore();
    const navigate = useNavigate();
    const createJobMutation = useCreateJob();
    const [currentStage, setCurrentStage] = useState('Classify');
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobLocation: '',
        workspaceOption: '',
        category: '',
        subcategory: '',
        workType: '',
        payType: '',
        currency: '',
        from: '',
        to: '',
        showSalaryOnAd: true,
        // Keeping other fields for later stages
        jobSkills: '',
        jobKeywords: [],
        jobDescription: '',
        jobBanner: '',
        jobIndustry: '',
        postedBy: employer?._id || '',
        jobSummary: '',
        sellingPoints: [],
        videoLink: '',
        jobSalaryType: 'Per Month',
        companyLogo: '',
        jobQuestions: [],
        internalReference: '',
        premiumListing: false,
        immediateStart: false,
        referencesRequired: false,
        notificationOption: 'both'
    });


    useEffect(() => {
        if(!employer) navigate("/employer-login");
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error for this field when user makes a change
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBannerChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            jobBanner: value
        }));
    };

    const validateClassifySection = () => {
        const errors = {};
        
        if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
        if (!formData.jobLocation.trim()) errors.jobLocation = 'Location is required';
        if (!formData.workspaceOption) errors.workspaceOption = 'Workspace option is required';
        if (!formData.category.trim()) errors.category = 'Category is required';
        if (!formData.subcategory.trim()) errors.subcategory = 'Subcategory is required';
        if (!formData.workType) errors.workType = 'Work type is required';
        if (!formData.payType) errors.payType = 'Pay type is required';
        if (!formData.currency) errors.currency = 'Currency is required';
        if (!formData.from) errors.from = 'From amount is required';
        if (!formData.to) errors.to = 'To amount is required';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleStageChange = (stage) => {
        // If moving away from Classify, validate that section first
        if (currentStage === 'Classify' && stage !== 'Classify') {
            if (!validateClassifySection()) {
                alert('Please complete all required fields in the Classify section before proceeding.');
                return;
            }
        }
        
        // If validation passes or moving to a previous section, update the stage
        setCurrentStage(stage);
    };

    const handleClear = () => {
        setFormData({
            jobTitle: '',
            jobLocation: '',
            workspaceOption: '',
            category: '',
            subcategory: '',
            workType: '',
            payType: '',
            currency: '',
            from: '',
            to: '',
            showSalaryOnAd: true,
            jobSkills: '',
            jobKeywords: [],
            jobDescription: '',
            jobBanner: '',
            jobIndustry: '',
            postedBy: employer?._id || '',
            jobSummary: '',
            sellingPoints: [],
            videoLink: '',
            jobSalaryType: 'Per Month',
            companyLogo: '',
            jobQuestions: [],
            internalReference: '',
            premiumListing: false,
            immediateStart: false,
            referencesRequired: false,
            notificationOption: 'both'
        });
        setFormErrors({});
    };

    const handleSubmit = async () => {
        if (!validateClassifySection()) {
            setCurrentStage('Classify');
            return;
        }
        
        if (!employer?._id) {
            alert('You must be logged in to post a job');
            return;
        }
        
        try {
            // Convert jobQuestions to applicationQuestions format
            const applicationQuestions = formData.jobQuestions?.map(question => {
                // Use selected options from the form, or fall back to default options
                const selectedQuestionOptions = formData.selectedOptions?.[question];
            
                // Define default options for questions that don't have selected options
                const defaultOptionsMap = {
                    "Which of the following statements best describes your right to work in Australia?": [
                        "I am an Australian citizen",
                        "I am a permanent resident",
                        "I have a valid work visa",
                        "I am not authorized to work in Australia"
                    ],
                    "How many years experience do you have in similar roles?": [
                        "Less than 1 year",
                        "1-2 years",
                        "3-5 years",
                        "5-10 years",
                        "More than 10 years"
                    ],
                    "Do you have driver license?": [
                        "Yes, I have a valid driver's license",
                        "No, I don't have a driver's license",
                        "I have a learner's permit"
                    ],
                    "What's your expected annual base salary?": [
                        "Under $40,000",
                        "$40,000 - $60,000",
                        "$60,000 - $80,000",
                        "$80,000 - $100,000",
                        "$100,000 - $120,000",
                        "Over $120,000"
                    ]
                };

                // Use selected options if available, otherwise use default options, otherwise use basic Yes/No
                const questionOptions = selectedQuestionOptions && selectedQuestionOptions.length > 0 
                    ? selectedQuestionOptions 
                    : (defaultOptionsMap[question] || ["Yes", "No", "Maybe"]);

                return {
                    question: question,
                    options: questionOptions,
                    required: formData.mandatoryQuestions?.includes(question) || false
                };
            }) || [];

            const jobData = {
                ...formData,
                from: Number(formData.from),
                to: Number(formData.to),
                jobSkills: formData.jobSkills.split(',').map(skill => skill.trim()),
                jobKeywords: Array.isArray(formData.jobKeywords) 
                    ? formData.jobKeywords 
                    : (formData.jobKeywords || '').split(',').map(keyword => keyword.trim()).filter(keyword => keyword !== ''),
                applicationQuestions: applicationQuestions,
                postedBy: employer._id
            };
            
            // Remove the old jobQuestions field
            delete jobData.jobQuestions;
            
            await createJobMutation.mutateAsync(jobData);
            navigate('/my-jobs');
        } catch (error) {
            console.error('Error posting job:', error);
            // Error handling is done by the mutation hook
        }
    };

    const renderContent = () => {
        switch (currentStage) {
            case 'Classify':
                return (
                    <ClassifySection 
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                        handleClear={handleClear}
                        handleStageChange={handleStageChange}
                        navigate={navigate}
                    />
                );
            case 'Ad Types':
                return (
                    <AdTypesSection 
                        handleStageChange={handleStageChange}
                    />
                );
            case 'Write':
                return (
                    <WriteSection 
                        formData={formData}
                        handleChange={handleChange}
                        handleStageChange={handleStageChange}
                    />
                );
            case 'Manage':
                return (
                    <ManageSection 
                        formData={formData}
                        handleStageChange={handleStageChange}
                        handleSubmit={handleSubmit}
                        isSubmitting={createJobMutation.isPending}
                    />
                );
            default:
                return (
                    <ClassifySection 
                        formData={formData}
                        formErrors={formErrors}
                        handleChange={handleChange}
                        handleClear={handleClear}
                        handleStageChange={handleStageChange}
                        navigate={navigate}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white pb-[10vh]">
            <DHeader employer={employer} />
            <Timeline currentStage={currentStage} onStageChange={handleStageChange} />
            <div className="container mx-auto px-8 py-8">
                <div className="flex flex-col justify-between items-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a New Job</h1>
                    <p className='text-gray-500'>Fill in the details below to post a new job.</p>
                </div>
                {renderContent()}
            </div>
        </div>
    )
}

export default JobPosting;
