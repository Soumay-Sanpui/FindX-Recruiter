import React from 'react';

const PricingSummary = ({ 
    premiumSelected = false, 
    immediateStartSelected = false, 
    // referencesSelected = false,
    notificationOption = 'both',
}) => {
    // Calculate individual costs
    const premiumCost = premiumSelected ? 99 : 0;
    const immediateCost = immediateStartSelected ? 45 : 0;
    const notificationCost = notificationOption === 'both' ? 69 : (notificationOption === 'none' ? 0 : 49);
    const standardCost =  49;
    
    // Calculate total cost including premium
    const calculatedTotalCost = premiumCost + immediateCost + notificationCost + standardCost;

    return (
        <div className="hidden lg:block lg:w-1/4 bg-gray-50 border-l border-gray-300">
            <div className="sticky top-0 p-0">
                <div className="bg-blue-600 text-white py-3 px-4 font-bold">
                    Your Job Ad Summary
                </div>
                <div className="p-4">
                    {premiumSelected ? (
                        <>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Premium Job Ad Package:</span>
                                <span className="font-bold text-xl">$99</span>
                            </div>
                            <div className="text-sm space-y-1 mb-4">
                                <p className="font-medium">Includes:</p>
                                <ul className="list-disc ml-4 text-gray-600 space-y-1">
                                    <li>Priority AI-driven visibility</li>
                                    <li>80 high-fit candidate invitations</li>
                                    <li>Featured on similar ads</li>
                                    <li>Exclusive candidate targeting</li>
                                    <li>Complete branding & company showcase</li>
                                    <li>30-day job listing</li>
                                    <li>Unlimited applicants</li>
                                    <li>Dashboard & management tools</li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Standard Job Ad Package:</span>
                                <span className="font-bold text-xl">${standardCost}</span>
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
                        </>
                    )}

                    {immediateStartSelected && (
                        <div className="flex justify-between mt-4 mb-2">
                            <span>Immediate Start Badge:</span>
                            <span className="font-semibold">$45</span>
                        </div>
                    )}

                    {immediateStartSelected && (
                        <p className="text-xs text-gray-600 mb-4">Let candidates know you're hiring urgently</p>
                    )}
{/*
                    {referencesSelected && (
                        <div className="flex justify-between mt-4 mb-2">
                            <span>Reference Check Access:</span>
                            <span className="font-semibold">$75</span>
                        </div>
                    )}

                    {referencesSelected && (
                        <p className="text-xs text-gray-600 mb-4">Request references from candidates instantly</p>
                    )}*/}

                    {notificationOption !== 'none' && (
                        <>
                            <div className="flex justify-between mt-4 mb-2">
                                <span>Notification Package:</span>
                                <span className="font-semibold">${notificationCost}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-4">
                                {notificationOption === 'both' 
                                    ? 'Email and app notifications to candidates' 
                                    : notificationOption === 'email' 
                                        ? 'Email notifications to candidates' 
                                        : 'App notifications to candidates'}
                            </p>
                        </>
                    )}

                    <div className="font-medium mt-6">
                        Just like this email and app package as well
                    </div>

                    <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4">
                        <span>Total Cost:</span>
                        <span>${calculatedTotalCost}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingSummary;