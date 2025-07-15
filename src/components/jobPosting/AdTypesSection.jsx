import React, { useState } from 'react';
import { BsCheckCircleFill, BsInfoCircle } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import PricingSummary from './PricingSummary';

const AdTypesSection = ({ formData, handleChange, handleStageChange }) => {
    const [premiumSelected, setPremiumSelected] = useState(formData?.premiumListing ?? false);
    const [immediateStartSelected, setImmediateStartSelected] = useState(formData?.immediateStart ?? false);
    const [referencesSelected, setReferencesSelected] = useState(formData?.referencesRequired ?? false);
    const [notificationOption, setNotificationOption] = useState(formData?.notificationOption ?? 'both');

    // Calculate total cost
    const premiumCost = premiumSelected ? 750 : 0;
    const immediateCost = immediateStartSelected ? 85 : 0;
    const referencesCost = referencesSelected ? 75 : 0;
    const notificationCost = notificationOption === 'both' ? 69 : (notificationOption === 'none' ? 0 : 49);
    const totalCost = premiumCost + immediateCost + referencesCost + notificationCost;

    // Handle premium selection
    const handlePremiumToggle = () => {
        const newValue = !premiumSelected;
        setPremiumSelected(newValue);
        if (handleChange) {
            handleChange({
                target: {
                    name: 'premiumListing',
                    value: newValue,
                    type: 'checkbox',
                    checked: newValue
                }
            });
        }
    };

    // Handle immediate start selection
    const handleImmediateStartToggle = () => {
        const newValue = !immediateStartSelected;
        setImmediateStartSelected(newValue);
        if (handleChange) {
            handleChange({
                target: {
                    name: 'immediateStart',
                    value: newValue,
                    type: 'checkbox',
                    checked: newValue
                }
            });
        }
    };

    // Handle references selection
    const handleReferencesToggle = () => {
        const newValue = !referencesSelected;
        setReferencesSelected(newValue);
        if (handleChange) {
            handleChange({
                target: {
                    name: 'referencesRequired',
                    value: newValue,
                    type: 'checkbox',
                    checked: newValue
                }
            });
        }
    };

    // Handle notification option change
    const handleNotificationChange = (option) => {
        setNotificationOption(option);
        if (handleChange) {
            handleChange({
                target: {
                    name: 'notificationOption',
                    value: option
                }
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-white shadow-lg border-2 border-blue-800">
            {/* Main Content */}
            <div className="lg:w-3/4 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Job Ad Type</h2>
                    <p className="text-gray-600">Choose the best option for your job posting needs</p>
                </div>

                <div className="text-lg font-semibold mb-3">Included in Your 30 day advertisement</div>

                {/* Premium Option */}
                <div className="mb-8">
                    <div className={`border-2 ${premiumSelected ? 'border-blue-600' : 'border-gray-200'} rounded-lg overflow-hidden transition-all shadow-md`}>
                        <div className="flex justify-between items-start p-5 bg-blue-900 text-white">
                            <div>
                                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2">Recommended</span>
                                <h3 className="text-xl font-bold">Premium</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">$750</p>
                                <p className="text-sm">+GST</p>
                            </div>
                        </div>
                        
                        <div className="p-5">
                            <p className="text-gray-700 mb-4">Top performing ad, for critical & hard-to-fill roles</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-700">
                                        <BsCheckCircleFill className="text-blue-600 mr-2 flex-shrink-0" />
                                        <span>598 total applications</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <BsCheckCircleFill className="text-blue-600 mr-2 flex-shrink-0" />
                                        <span>273 high-fit applications</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <BsCheckCircleFill className="text-blue-600 mr-2 flex-shrink-0" />
                                        <span>2.5k views</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-5 flex justify-center">
                                <button 
                                    onClick={handlePremiumToggle}
                                    className={`w-full py-2 rounded font-medium ${premiumSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                    {premiumSelected ? 'Selected' : 'Select Premium'}
                                </button>
                            </div>

                            <div className="border-t pt-4">
                                <p className="font-medium mb-3">Included in your 30 day ad</p>
                                <div className="space-y-3">
                                    <div className="flex items-start text-gray-700">
                                        <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                        <span>Priority AI-driven visibility in search and candidate recommendations</span>
                                        <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                                    </div>
                                    <div className="flex items-start text-gray-700">
                                        <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                        <span>Personally invite 80 high-fit candidates to apply</span>
                                        <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                                    </div>
                                    <div className="flex items-start text-gray-700">
                                        <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                        <span>Your ad featured on similar ads</span>
                                        <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                                    </div>
                                    <div className="flex items-start text-gray-700">
                                        <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                        <span>Other ads don't appear on yours</span>
                                        <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                                    </div>
                                    <div className="flex items-start text-gray-700">
                                        <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                        <span>FindX exclusively sends your ad to high-fit candidates</span>
                                        <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                                    </div>
                                    <div className="flex items-start text-gray-700">
                                        <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                                        <span>Your company's logo, cover image and key selling points</span>
                                        <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Immediate Start Option */}
                <div className="mb-8">
                    <div className={`border-2 ${immediateStartSelected ? 'border-blue-600' : 'border-gray-200'} rounded-lg overflow-hidden transition-all shadow-md`}>
                        <div className="p-5 flex">
                            <div className="flex-1">
                                <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">New</div>
                                <h3 className="text-xl font-bold mb-1">Need to hire someone quickly?</h3>
                                <p className="text-gray-600 mb-3">Include an 'Immediate start' badge on your job ad to attract job seekers who are ready to start.</p>
                                <p className="font-bold text-xl">$85 <span className="text-sm text-gray-500 font-normal">+GST</span></p>
                            </div>
                            <div className="w-1/3 flex items-center justify-center">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <div className="border border-blue-200 rounded p-2 mb-2 inline-block">
                                        <span className="text-blue-600 text-sm font-medium">Immediate start</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Example ad with immediate start badge</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            <button 
                                onClick={handleImmediateStartToggle}
                                className={`py-2 px-6 rounded font-medium ${immediateStartSelected ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                                {immediateStartSelected ? "— Remove" : "+ Add"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* References Option */}
                <div className="mb-8">
                    <div className={`border-2 ${referencesSelected ? 'border-blue-600' : 'border-gray-200'} rounded-lg overflow-hidden transition-all shadow-md`}>
                        <div className="p-5 flex">
                            <div className="flex-1">
                                <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">New</div>
                                <h3 className="text-xl font-bold mb-1">Get references quickly and confidently</h3>
                                <p className="text-gray-600 mb-3">Request references in a few clicks for up to 3 applicants. Our automated system will contact 2 referees per applicant using our standard questions.</p>
                                <p className="font-bold text-xl">$75 <span className="text-sm text-gray-500 font-normal">+GST</span></p>
                            </div>
                            <div className="w-1/3 flex items-center justify-center">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <div className="border border-blue-200 rounded p-2 mb-2">
                                        <button className="bg-blue-600 text-white text-xs rounded px-3 py-1 flex items-center">
                                            <FaCheck className="mr-1" /> Check references
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Example of checking references</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            <button 
                                onClick={handleReferencesToggle}
                                className={`py-2 px-6 rounded font-medium ${referencesSelected ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                                {referencesSelected ? "— Remove" : "+ Add"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notification Options */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`border rounded-lg p-4 ${notificationOption === 'app' ? 'border-blue-600' : 'border-gray-200'}`}>
                        <h3 className="font-semibold mb-1">App Only</h3>
                        <p className="text-gray-600 text-sm mb-2">Notify 100 candidates via app notifications.</p>
                        <p className="font-bold mb-3">$49</p>
                        <button 
                            onClick={() => handleNotificationChange('app')}
                            className={`w-full py-2 rounded text-sm font-medium ${
                                notificationOption === 'app' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                            }`}>
                            Select Plan
                        </button>
                    </div>
                    
                    <div className={`border rounded-lg p-4 ${notificationOption === 'email' ? 'border-blue-600' : 'border-gray-200'}`}>
                        <h3 className="font-semibold mb-1">Email Only</h3>
                        <p className="text-gray-600 text-sm mb-2">Notify 100 candidates via email.</p>
                        <p className="font-bold mb-3">$49</p>
                        <button 
                            onClick={() => handleNotificationChange('email')}
                            className={`w-full py-2 rounded text-sm font-medium ${
                                notificationOption === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                            }`}>
                            Select Plan
                        </button>
                    </div>
                    
                    <div className={`border rounded-lg p-4 ${notificationOption === 'both' ? 'border-blue-600' : 'border-gray-200'}`}>
                        <h3 className="font-semibold mb-1">Both Channels</h3>
                        <p className="text-gray-600 text-sm mb-2">Notify 100 candidates via both app and email.</p>
                        <div className="flex justify-between mb-3">
                            <p className="font-bold">$69</p>
                            <p className="text-green-600 text-sm">Save $29</p>
                        </div>
                        <button 
                            onClick={() => handleNotificationChange('both')}
                            className={`w-full py-2 rounded text-sm font-medium ${
                                notificationOption === 'both' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                            }`}>
                            Best Value
                        </button>
                    </div>
            </div>

                {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-10">
                <button
                    onClick={() => handleStageChange('Classify')}
                        className="flex items-center justify-center border border-gray-300 text-gray-700 font-medium py-3 px-8 transition hover:bg-gray-50"
                    >
                        &lt; BACK
                    </button>
                    
                    <button
                        className="flex items-center justify-center border border-gray-300 text-gray-700 font-medium py-3 px-8 transition hover:bg-gray-50"
                    >
                        Save draft
                </button>
                    
                <button
                    onClick={() => handleStageChange('Write')}
                        className="flex items-center justify-center border border-blue-600 bg-white text-blue-600 font-medium py-3 px-8 transition hover:bg-blue-50"
                >
                        PROCEED &gt;
                </button>
                </div>
                
                {/* Mobile Job Ad Summary - Only visible on mobile devices */}
                <div className="block lg:hidden mt-10 border border-gray-300 shadow-md rounded-md bg-white">
                    <div className="bg-blue-600 text-white py-3 px-4 font-bold">
                        Your Job Ad Summary
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Standard Job Ad Package:</span>
                            <span className="font-bold text-xl">$199</span>
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
                                <span className="font-semibold">$19</span>
                            </div>
                        )}
                        
                        {immediateStartSelected && (
                            <p className="text-xs text-gray-600 mb-4">Let candidates know you're hiring urgently</p>
                        )}
                        
                        {referencesSelected && (
                            <div className="flex justify-between mt-4 mb-2">
                                <span>Reference Check Access:</span>
                                <span className="font-semibold">$19</span>
                            </div>
                        )}
                        
                        {referencesSelected && (
                            <p className="text-xs text-gray-600 mb-4">Request references from candidates instantly</p>
                        )}
                        
                        <div className="font-medium mt-6">
                            Just like this email and app package as well
                        </div>
                        
                        <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4">
                            <span>Total Cost:</span>
                            <span>${totalCost}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Job Ad Summary - Right Side */}
            <PricingSummary 
                premiumSelected={premiumSelected}
                immediateStartSelected={immediateStartSelected}
                referencesSelected={referencesSelected}
                notificationOption={notificationOption}
                totalCost={totalCost}
            />
        </div>
    );
};

export default AdTypesSection; 