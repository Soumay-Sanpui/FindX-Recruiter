import React, { useState } from 'react';
import PricingSummary from './PricingSummary';

const WriteSection = ({ formData, handleChange, handleStageChange }) => {
    const [logoFile, setLogoFile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Add state variables for pricing elements
    const [premiumSelected, setPremiumSelected] = useState(formData.premiumListing || true);
    const [immediateStartSelected, setImmediateStartSelected] = useState(formData.immediateStart || false);
    const [referencesSelected, setReferencesSelected] = useState(formData.referencesRequired || false);
    const [notificationOption, setNotificationOption] = useState(formData.notificationOption || 'both');
    
    // Calculate total cost
    const premiumCost = 750;
    const immediateCost = immediateStartSelected ? 85 : 0;
    const referencesCost = referencesSelected ? 75 : 0;
    const notificationCost = notificationOption === 'both' ? 69 : (notificationOption === 'none' ? 0 : 49);
    const totalCost = premiumCost + immediateCost + referencesCost + notificationCost;

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

    const recommendedQuestions = [
        "Which of the following statements best describes your right to work in Australia?",
        "How many years experience do you have in similar roles?",
        "Do you have driver license?",
        "Are you willing to undergo pre-employment medical check?",
        "What's your expected annual base salary?",
        "How much notice are you required to give your current employer?",
        "Do you have a current Police Check (National Police Certificate) for employment?",
        "Do you have a current Australian driver's license?",
        "Do you own or have regular access to a car?",
        "Are you available to work outside holidays?"
    ];
    
    // Handle question selection
    const handleQuestionSelect = (e, question) => {
        const isChecked = e.target.checked;
        let updatedQuestions = [...(formData.jobQuestions || [])];
        
        if (isChecked) {
            updatedQuestions.push(question);
        } else {
            updatedQuestions = updatedQuestions.filter(q => q !== question);
        }
        
        handleChange({
            target: {
                name: 'jobQuestions',
                value: updatedQuestions
            }
        });
    };

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
                    
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Questions are recommended for your role</p>
                        <p className="text-gray-500 text-sm mb-4">
                            Your recommendations show questions that other most employers select. These questions will
                            be displayed at the end of your application questions.
                        </p>
                        
                        <div className="space-y-2">
                            {recommendedQuestions.map((question, index) => (
                                <div key={index} className="flex items-start">
                                    <input 
                                        type="checkbox" 
                                        className="mt-1 mr-3" 
                                        id={`question-${index}`} 
                                        checked={formData.jobQuestions && formData.jobQuestions.includes(question)}
                                        onChange={(e) => handleQuestionSelect(e, question)}
                                    />
                                    <label htmlFor={`question-${index}`} className="text-gray-700">{question}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-gray-700 mb-2">Search for relevant questions by keyword</p>
                        <div className="relative">
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="E.g. certification, experience, skills"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg 
                                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button 
                                    className="absolute right-3 top-3 text-blue-600 font-medium"
                                    onClick={() => setSearchQuery('')}
                                >
                                    Tell us what's missing
                                </button>
                            )}
                        </div>
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
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">
                            Internal job reference # <span className="text-gray-500 text-sm">(optional)</span>
                        </label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="internalReference"
                            value={formData.internalReference || ''}
                            onChange={handleInputChange}
                        />
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