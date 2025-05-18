import React from 'react';
import { Plus } from 'lucide-react';

const ManageSection = ({ handleStageChange, handleSubmit, isSubmitting }) => {
    return (
        <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Section</h2>
                <p className="text-gray-500 mb-8">Coming soon</p>
            </div>
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
                    <Plus className="mr-2" /> {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
            </div>
        </div>
    );
};

export default ManageSection; 