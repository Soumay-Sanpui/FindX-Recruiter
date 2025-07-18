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
import PaymentCheckout from '../components/PaymentCheckout';
import { toast } from 'react-toastify';

const JobPosting = () => {
    const { employer } = useEmployerStore();
    const navigate = useNavigate();
    const createJobMutation = useCreateJob();
    const [currentStage, setCurrentStage] = useState('Classify');
    const [formErrors, setFormErrors] = useState({});
    const [showPayment, setShowPayment] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [isSubmittingJob, setIsSubmittingJob] = useState(false);
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
        notificationOption: 'both',
        shortDescription: '',
        showShortDescription: false,
        mandatoryQuestions: [],
        selectedOptions: {},
    });

    // Payment data configuration
    const getPaymentData = () => {
        const basePrice = 4900;
        let totalAmount = basePrice;
        
        // Add-on pricing
        if (formData.immediateStart) totalAmount += 1900; // $19.00
        if (formData.referencesRequired) totalAmount += 1900; // $19.00
        
        // Notification pricing
        const notificationPricing = {
            'app': 4900,
            'email': 4900,
            'both': 6900,
            'none': 0
        };
        totalAmount += notificationPricing[formData.notificationOption] || 0;
        
        return {
            planId: 'Standard',
            amount: totalAmount,
            currency: 'usd',
            jobData: {
                title: formData.jobTitle,
                location: formData.jobLocation,
                category: formData.category
            },
            addOns: [
                ...(formData.immediateStart ? [{ id: 'immediateStart', name: 'Immediate Start Badge', price: 1900 }] : []),
                ...(formData.referencesRequired ? [{ id: 'referenceCheck', name: 'Reference Check Access', price: 1900 }] : []),
                ...(formData.notificationOption !== 'none' ? [{ 
                    id: `notification_${formData.notificationOption}`, 
                    name: `Notification Package - ${formData.notificationOption}`, 
                    price: notificationPricing[formData.notificationOption] 
                }] : [])
            ]
        };
    };

    useEffect(() => {
        if(!employer) navigate("/employer-login");
    }, []);

    useEffect(() => {
        if (employer && employer.companyLogo && formData.companyLogo === '') {
            setFormData(prevState => ({
                ...prevState,
                companyLogo: employer.companyLogo
            }));
        }
    }, [employer]);

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

    // const handleBannerChange = (e) => {
    //     const { value } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         jobBanner: value
    //     }));
    // };

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
        if (currentStage === 'Classify' && stage !== 'Classify') {
            if (!validateClassifySection()) {
                alert('Please complete all required fields in the Classify section before proceeding.');
                return;
            }
        }
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
            notificationOption: 'both',
            shortDescription: '',
            showShortDescription: false,
            mandatoryQuestions: [],
            selectedOptions: {},
        });
        setFormErrors({});
        setShowPayment(false);
        setPaymentCompleted(false);
    };

    // Handle payment success and create job
    const handlePaymentSuccess = async (paymentIntent) => {
        console.log('Payment successful:', paymentIntent);
        setPaymentCompleted(true);
        setShowPayment(false);
        setIsSubmittingJob(true);
        
        try {
            await createJobAfterPayment();
        } catch (error) {
            console.error('Error creating job after payment:', error);
            toast.error('Payment successful but job creation failed. Please contact support.');
        } finally {
            setIsSubmittingJob(false);
        }
    };

    // Handle payment error
    const handlePaymentError = (error) => {
        console.error('Payment failed:', error);
        toast.error('Payment failed. Please try again.');
        setShowPayment(false);
    };

    // Handle payment cancellation
    const handlePaymentCancel = () => {
        setShowPayment(false);
        toast.info('Payment cancelled. You can try again when ready.');
    };

    // Create job after successful payment
    const createJobAfterPayment = async () => {
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
                postedBy: employer._id,
                isPaid: true, // Mark as paid since payment was successful
                status: 'Open', // Set status to open since it's paid
                // Process short description - only include if showShortDescription is true and shortDescription has content
                shortDescription: formData.showShortDescription && formData.shortDescription ? 
                    formData.shortDescription.split(',').map(point => point.trim()).filter(point => point !== '') : 
                    null
            };
            
            // Remove the old jobQuestions field
            delete jobData.jobQuestions;
            
            await createJobMutation.mutateAsync(jobData);
            toast.success('Job posted successfully! Redirecting to My Jobs...');
            
            // Redirect to my jobs page after successful job creation
            setTimeout(() => {
                navigate('/my-jobs');
            }, 1500);
            
        } catch (error) {
            console.error('Error posting job:', error);
            throw error;
        }
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
        
        // Show payment modal instead of directly creating job
        setShowPayment(true);
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
                        formData={formData}
                        handleChange={handleChange}
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
                        isSubmitting={isSubmittingJob || createJobMutation.isPending}
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
            
            {/* Payment Modal */}
            {showPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">
                                Complete Payment to Post Job
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Pay to post "{formData.jobTitle}" and reach qualified candidates
                            </p>
                        </div>
                        <div className="p-4">
                            <PaymentCheckout
                                paymentData={getPaymentData()}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                                onCancel={handlePaymentCancel}
                            />
                        </div>
                    </div>
                </div>
            )}
            
            {/* Job Creation Loading Modal */}
            {isSubmittingJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-sm w-full mx-4">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Creating Your Job Post</h3>
                            <p className="text-gray-600">Payment successful! Setting up your job listing...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobPosting;
