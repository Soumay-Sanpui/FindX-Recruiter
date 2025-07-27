import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const ApplicationModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    questions = [], 
    jobTitle = '',
    isLoading = false,
    selectedResume = null,
    selectedCoverLetter = null
}) => {
    const [responses, setResponses] = useState([]);
    const [errors, setErrors] = useState({});

    // Initialize responses when modal opens
    useEffect(() => {
        if (isOpen && questions.length > 0) {
            const initialResponses = questions.map((question, index) => ({
                questionIndex: index,
                question: question.question,
                selectedOption: '',
                options: question.options,
                required: question.required
            }));
            setResponses(initialResponses);
            setErrors({});
        }
    }, [isOpen, questions]);

    const handleOptionSelect = (questionIndex, option) => {
        setResponses(prev => 
            prev.map((response, index) => 
                index === questionIndex 
                    ? { ...response, selectedOption: option }
                    : response
            )
        );
        
        // Clear error for this question
        if (errors[questionIndex]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[questionIndex];
                return newErrors;
            });
        }
    };

    const validateResponses = () => {
        const newErrors = {};
        
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const response = responses[i];
            
            if (question.required && (!response?.selectedOption || response.selectedOption.trim() === '')) {
                newErrors[i] = `Please answer required question ${i + 1}: "${question.question}"`;
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateResponses()) {
            return;
        }

        try {
            await onSubmit(responses);
            onClose();
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    const handleClose = () => {
        if (isLoading) return;
        setResponses([]);
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">
                            Application Questions
                        </h2>
                        <p className="text-sm text-gray-600 mt-1" title={jobTitle}>
                            {jobTitle.length > 50 ? jobTitle.substring(0, 50) + '...' : jobTitle}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {/* Resume and Cover Letter Information */}
                    {(selectedResume || selectedCoverLetter) && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="text-sm font-semibold text-blue-900 mb-3">Application Documents</h3>
                            {selectedResume && (
                                <div className="mb-3">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">Resume:</span> {selectedResume.resumeName || 'Selected Resume'}
                                    </p>
                                </div>
                            )}
                            {selectedCoverLetter && (
                                <div>
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">Cover Letter:</span> Included
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {questions.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No application questions for this job.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {responses.map((response, index) => {
                                const question = questions[index];
                                const hasError = errors[index];
                                
                                return (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-start space-x-2">
                                            <span className="text-sm font-medium text-gray-900 mt-1">
                                                Q{index + 1}:
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {question.question}
                                                    {question.required && (
                                                        <span className="text-red-500 ml-1">*</span>
                                                    )}
                                                </p>
                                                
                                                {hasError && (
                                                    <div className="flex items-center mt-2 text-red-600">
                                                        <AlertCircle size={16} className="mr-1" />
                                                        <span className="text-sm">{hasError}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="ml-6 space-y-2">
                                            {(() => {
                                                // Ensure we have options, fallback to default if none provided
                                                const displayOptions = question.options && question.options.length > 0 
                                                    ? question.options 
                                                    : ['Yes', 'No'];
                                                
                                                return displayOptions.map((option, optionIndex) => (
                                                    <label
                                                        key={optionIndex}
                                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`question-${index}`}
                                                            value={option}
                                                            checked={response.selectedOption === option}
                                                            onChange={() => handleOptionSelect(index, option)}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">{option}</span>
                                                    </label>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-600">
                        {questions.filter(q => q.required).length > 0 && (
                            <span className="text-red-500">* Required questions</span>
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <span>Submit Application</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal; 