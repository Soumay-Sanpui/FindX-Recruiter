import React, { useState } from 'react';
import { Check, X, AlertCircle, DollarSign, MapPin, Briefcase, Globe, BarChart4, Tag, FileText, Clock, Image, Video, List, Info, HelpCircle, CheckCircle, Smartphone, X as CloseIcon } from 'lucide-react';

const ManageSection = ({ formData, handleStageChange, handleSubmit, isSubmitting }) => {
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    
    const formatCurrency = (amount) => {
        if (!amount) return '';
        return new Intl.NumberFormat('en-US').format(amount);
    };

    // Format salary display for mobile preview
    const formatSalary = () => {
        if (!formData.currency || !formData.from || !formData.to) return 'Salary not specified';
        return `${formData.currency} ${Number(formData.from).toLocaleString()} - ${Number(formData.to).toLocaleString()} ${formData.payType}`;
    };

    // Format time ago for mobile preview
    const getTimeAgo = () => {
        return 'Just posted';
    };

    return (
        <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Job Details</h2>
                <p className="text-gray-500">Review all details before posting your job</p>
                <button
                    type="button"
                    onClick={() => setShowMobilePreview(true)}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Smartphone className="mr-2" size={16} />
                    Preview Mobile Card
                </button>
            </div>

            {/* Job Summary Card */}
            <div className="mb-8 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Job Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-start">
                        <Briefcase className="mr-3 text-blue-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Job Title</p>
                            <p className="font-medium">{formData.jobTitle || 'Not specified'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <MapPin className="mr-3 text-blue-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{formData.jobLocation || 'Not specified'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <Globe className="mr-3 text-blue-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Workspace Option</p>
                            <p className="font-medium">{formData.workspaceOption || 'Not specified'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <Tag className="mr-3 text-blue-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium">{formData.category || 'Not specified'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <Tag className="mr-3 text-blue-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Subcategory</p>
                            <p className="font-medium">{formData.subcategory || 'Not specified'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <Clock className="mr-3 text-blue-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Work Type</p>
                            <p className="font-medium">{formData.workType || 'Not specified'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Salary Information */}
            <div className="mb-8 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">Salary Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-start">
                        <DollarSign className="mr-3 text-green-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Pay Type</p>
                            <p className="font-medium">{formData.payType || 'Not specified'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <DollarSign className="mr-3 text-green-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Salary Range</p>
                            <p className="font-medium">
                                {formData.currency} {formatCurrency(formData.from)} - {formatCurrency(formData.to)}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <Info className="mr-3 text-green-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Show Salary on Ad</p>
                            <p className="font-medium flex items-center">
                                {formData.showSalaryOnAd ? 
                                    <><Check size={16} className="text-green-600 mr-1" /> Yes</> : 
                                    <><X size={16} className="text-red-600 mr-1" /> No</>
                                }
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <DollarSign className="mr-3 text-green-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Salary Type</p>
                            <p className="font-medium">{formData.jobSalaryType || 'Per Month'}</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Job Description */}
            {formData.jobDescription && (
                <div className="mb-8 bg-gray-50 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Job Description</h3>
                    <div className="flex items-start">
                        <FileText className="mr-3 text-gray-600 mt-1" size={18} />
                        <div className="flex-1">
                            <p className="whitespace-pre-line text-gray-700">{formData.jobDescription}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Questions */}
            {(formData.jobQuestions && formData.jobQuestions.length > 0) && (
                <div className="mb-8 bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">Selected Questions</h3>
                    <div className="space-y-4">
                        {formData.jobQuestions.map((question, index) => (
                            <div key={index} className="bg-white p-4 rounded-md border border-blue-100">
                                <div className="flex items-start">
                                    <HelpCircle className="mr-3 text-blue-600 mt-1 flex-shrink-0" size={18} />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800 mb-2">{question}</p>
                                        
                                        {/* Show if question is mandatory */}
                                        {formData.mandatoryQuestions && formData.mandatoryQuestions.includes(question) && (
                                            <div className="mb-2">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    <AlertCircle size={12} className="mr-1" />
                                                    Mandatory
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Show selected options if any */}
                                        {formData.selectedOptions && formData.selectedOptions[question] && formData.selectedOptions[question].length > 0 ? (
                                            <div>
                                                <p className="text-sm text-gray-600 mb-2">Answer Options:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.selectedOptions[question].map((option, optionIndex) => (
                                                        <span key={optionIndex} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            <CheckCircle size={12} className="mr-1" />
                                                            {option}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                    <FileText size={12} className="mr-1" />
                                                    Open text response
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Summary stats */}
                        <div className="mt-4 pt-4 border-t border-blue-200">
                            <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                                <span className="flex items-center">
                                    <List className="mr-1" size={14} />
                                    {formData.jobQuestions.length} question{formData.jobQuestions.length !== 1 ? 's' : ''} selected
                                </span>
                                {formData.mandatoryQuestions && formData.mandatoryQuestions.length > 0 && (
                                    <span className="flex items-center">
                                        <AlertCircle className="mr-1" size={14} />
                                        {formData.mandatoryQuestions.length} mandatory
                                    </span>
                                )}
                                {formData.selectedOptions && Object.keys(formData.selectedOptions).length > 0 && (
                                    <span className="flex items-center">
                                        <CheckCircle className="mr-1" size={14} />
                                        {Object.keys(formData.selectedOptions).length} with predefined options
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Key Selling Points */}
            {(formData.sellingPoints && formData.sellingPoints.some(point => point && point.trim())) && (
                <div className="mb-8 bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-800 mb-4">Key Selling Points</h3>
                    <div className="flex items-start">
                        <BarChart4 className="mr-3 text-purple-600 mt-1" size={18} />
                        <div className="flex-1">
                            <ul className="space-y-2">
                                {formData.sellingPoints
                                    .filter(point => point && point.trim())
                                    .map((point, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check className="mr-2 text-purple-600 mt-0.5 flex-shrink-0" size={16} />
                                            <span className="text-gray-700">{point}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Company Branding */}
            {(formData.companyLogo || formData.jobBanner || formData.videoLink) && (
                <div className="mb-8 bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-800 mb-4">Company Branding</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {formData.companyLogo && (
                            <div className="flex items-start">
                                <Image className="mr-3 text-green-600 mt-1" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Company Logo</p>
                                    <div className="mt-2">
                                        <img 
                                            src={formData.companyLogo} 
                                            alt="Company Logo" 
                                            className="h-16 object-contain rounded border border-gray-200 bg-white" 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {formData.jobBanner && (
                            <div className="flex items-start">
                                <Image className="mr-3 text-green-600 mt-1" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Job Banner</p>
                                    <div className="mt-2">
                                        <img 
                                            src={formData.jobBanner} 
                                            alt="Job Banner" 
                                            className="h-24 object-cover rounded border border-gray-200" 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {formData.videoLink && (
                            <div className="flex items-start">
                                <Video className="mr-3 text-green-600 mt-1" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Video Link</p>
                                    <a 
                                        href={formData.videoLink} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="text-green-600 hover:underline break-all"
                                    >
                                        {formData.videoLink}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}



            {/* Missing Information Alert */}
            {(!formData.jobTitle || !formData.jobLocation || !formData.workspaceOption || 
              !formData.category || !formData.subcategory || !formData.workType || 
              !formData.payType || !formData.currency || !formData.from || !formData.to ||
              !formData.jobDescription) && (
                <div className="mb-8 bg-yellow-50 border border-yellow-100 p-4 rounded-md flex items-start">
                    <AlertCircle className="text-yellow-500 mr-3 mt-0.5" size={20} />
                    <div className="flex-1">
                        <h4 className="font-medium text-yellow-800">Required Information Missing</h4>
                        <p className="text-yellow-700 text-sm mt-1">
                            Please complete all required fields before posting the job.
                        </p>
                        <div className="mt-2">
                            <p className="text-yellow-800 text-sm font-medium">Missing fields:</p>
                            <ul className="list-disc ml-4 text-yellow-700 text-sm mt-1">
                                {!formData.jobTitle && <li>Job Title</li>}
                                {!formData.jobLocation && <li>Job Location</li>}
                                {!formData.workspaceOption && <li>Workspace Option</li>}
                                {!formData.category && <li>Category</li>}
                                {!formData.subcategory && <li>Subcategory</li>}
                                {!formData.workType && <li>Work Type</li>}
                                {!formData.payType && <li>Pay Type</li>}
                                {!formData.currency && <li>Currency</li>}
                                {!formData.from && <li>Salary Range (From)</li>}
                                {!formData.to && <li>Salary Range (To)</li>}
                                {!formData.jobDescription && <li>Job Description</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between gap-4 mt-10">
                <button
                    onClick={() => handleStageChange('Write')}
                    className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Back to Write
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </button>
            </div>

            {/* Mobile Preview Modal */}
            {showMobilePreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-sm w-full max-h-screen overflow-y-auto">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">Mobile App Preview</h3>
                            <button
                                onClick={() => setShowMobilePreview(false)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <CloseIcon size={20} className="text-gray-600" />
                            </button>
                        </div>
                        
                        <div className="p-4">
                            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                <p className="text-sm text-gray-600 text-center mb-2">How your job will appear on mobile</p>
                                
                                {/* Mobile Job Card Preview */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-xs mx-auto">
                                    {/* Premium badge */}
                                    {formData.premiumListing && (
                                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 py-1">
                                            <p className="text-white text-xs font-semibold text-center">✨ Premium Listing</p>
                                        </div>
                                    )}
                                    
                                    <div className="p-4">
                                        {/* Save icon positioned at top right */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <div className="p-1">
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                            </div>
                                        </div>
                                        
                                        {/* Header: Logo + Title + Company + Actions */}
                                        <div className="flex-col gap-2 items-start">
                                            {formData.companyLogo && (
                                                <img
                                                    src={formData.companyLogo}
                                                    className="w-14 h-14 rounded-xl mr-3 border border-gray-200 object-cover"
                                                    alt="Company Logo"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-lg font-bold text-gray-900 leading-tight w-[50vw]">
                                                    {formData.jobTitle || 'Job Title'}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">Company Name</p>
                                                <p className="text-xs text-gray-500 mt-1">{getTimeAgo()}</p>
                                            </div>
                                            <div className="flex-row items-center space-x-2">
                                                {formData.immediateStart && (
                                                    <div className="bg-red-100 px-2 py-1 rounded-full">
                                                        <p className="text-red-600 text-xs font-medium">Urgent</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Category and Subcategory */}
                                        <div className="flex-row items-center mt-3 space-x-2">
                                            <div className="bg-blue-50 px-3 py-1 rounded-full">
                                                <p className="text-blue-700 text-xs font-medium">{formData.category || 'Category'}</p>
                                            </div>
                                        </div>

                                        {/* Short Description */}
                                        {formData.showShortDescription && formData.shortDescription && (
                                            <div className="mt-3">
                                                {formData.shortDescription.split(',').map((point, index) => (
                                                    <div key={index} className="flex-row items-start mb-1">
                                                        <p className="text-blue-600 mr-2 mt-0.5">•</p>
                                                        <p className="text-sm text-gray-700 flex-1">{point.trim()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Location + Workspace + Type */}
                                        <div className="mt-4 space-y-2">
                                            <div className="flex-row items-center">
                                                <div className="w-3.5 h-3.5 bg-gray-500 rounded-full mr-2"></div>
                                                <p className="ml-2 text-sm text-gray-700">{formData.jobLocation || 'Location'}</p>
                                                <p className="ml-3 text-xs font-medium">{formData.workspaceOption || 'Workspace'}</p>
                                            </div>

                                            <div className="flex-row items-center justify-between">
                                                <div className="flex-row items-center">
                                                    <p className="ml-2 text-sm text-gray-700 font-medium">{formatSalary()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* X Icon at bottom */}
                                        <div className="mt-4 flex-row justify-end items-center">
                                            <div className="p-2">
                                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <button
                                    onClick={() => setShowMobilePreview(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSection; 