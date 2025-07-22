import React from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Zap } from 'lucide-react';

const BoostJobComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link 
            to="/my-jobs"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to My Jobs</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8">
            <Zap className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Coming Soon
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Boost Job Feature
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          We're working hard to bring you the most powerful job boosting feature. 
          Get ready to reach more qualified candidates and hire faster than ever before.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What to expect:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Enhanced job visibility</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Targeted candidate reach</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Priority notifications</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700">Performance analytics</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            to="/pricing"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Features
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoostJobComingSoon;
