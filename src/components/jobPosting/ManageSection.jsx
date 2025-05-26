import React from 'react';
import { Check, X, AlertCircle, DollarSign, MapPin, Briefcase, Globe, BarChart4, Tag, FileText, Clock, Image, Video, List, Info } from 'lucide-react';

const ManageSection = ({ formData, handleStageChange, handleSubmit, isSubmitting }) => {
    const formatCurrency = (amount) => {
        if (!amount) return '';
        return new Intl.NumberFormat('en-US').format(amount);
    };

    return (
        <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Job Details</h2>
                <p className="text-gray-500">Review all details before posting your job</p>
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

            {/* Skills and Experience */}
            {/* <div className="mb-8 bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Skills</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-4">
                    <div className="flex items-start">
                        <List className="mr-3 text-purple-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Skills</p>
                            {formData.jobSkills ? (
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {typeof formData.jobSkills === 'string' 
                                        ? formData.jobSkills.split(',').map((skill, index) => (
                                            <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {skill.trim()}
                                            </span>
                                        ))
                                        : formData.jobSkills.map((skill, index) => (
                                            <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {skill}
                                            </span>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No skills specified</p>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}

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

            {/* Media Elements */}
            <div className="mb-8 bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Media Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-start">
                        <Image className="mr-3 text-gray-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Job Banner</p>
                            {formData.jobBanner ? (
                                <div className="mt-2">
                                    <img 
                                        src={formData.jobBanner} 
                                        alt="Job Banner" 
                                        className="h-24 object-cover rounded border border-gray-200" 
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No banner uploaded</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <Video className="mr-3 text-gray-600 mt-1" size={18} />
                        <div>
                            <p className="text-sm text-gray-500">Video Link</p>
                            {formData.videoLink ? (
                                <a 
                                    href={formData.videoLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {formData.videoLink}
                                </a>
                            ) : (
                                <p className="text-gray-500 italic">No video link provided</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
                    {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
            </div>
        </div>
    );
};

export default ManageSection; 