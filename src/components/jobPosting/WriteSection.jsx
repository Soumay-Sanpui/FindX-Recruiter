import React from 'react';

const WriteSection = ({ handleStageChange }) => {
    return (
        <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Write Section</h2>
                <p className="text-gray-500 mb-8">Coming soon</p>
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
    );
};

export default WriteSection; 