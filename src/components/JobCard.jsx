import React from 'react';
import { Bookmark, MapPin, Briefcase, DollarSign, X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';

const JobCard = ({ job, onSave, onNotInterested, onChat, isSaved = false }) => {
  const {
    jobTitle,
    jobLocation,
    workType,
    workspaceOption,
    category,
    from,
    to,
    currency,
    jobSalaryType,
    createdAt,
    immediateStart,
    shortDescription,
    showShortDescription,
    companyLogo,
    postedBy,
    _id
  } = job;

  const companyName = typeof postedBy === 'object' && postedBy.companyName 
    ? postedBy.companyName 
    : 'Company Name';
  const logo = companyLogo || (typeof postedBy === 'object' ? postedBy.companyLogo : null);

  // Format salary display
  const formatSalary = () => {
    if (!currency || !from || !to) return 'Salary not specified';
    return `${currency} ${Number(from).toLocaleString()} - ${Number(to).toLocaleString()} ${jobSalaryType || 'Per Month'}`;
  };

  // Format time ago
  const getTimeAgo = () => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1d ago';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`;
    return `${Math.ceil(diffDays / 30)}m ago`;
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (onSave) {
      onSave(_id);
    }
  };

  const handleNotInterestedClick = (e) => {
    e.stopPropagation();
    if (onNotInterested) {
      onNotInterested(_id);
    }
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
    if (onChat) {
      onChat(_id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Header: Logo + Badge + Save Icon */}
        <div className="flex items-start justify-between mb-3">
          {/* Company Logo - Improved design without awkward black box */}
          <div className="flex items-center">
            {logo ? (
              <img
                src={logo}
                alt={companyName}
                className="w-12 h-12 rounded-full mr-3 border border-gray-200 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            {!logo && (
              <div className="w-12 h-12 rounded-full mr-3 bg-gray-100 flex items-center justify-center border border-gray-200">
                <Briefcase className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>

          {/* Right side: Badge + Save Icon */}
          <div className="flex items-center space-x-2">
            {immediateStart && (
              <div className="bg-red-100 px-3 py-1 rounded-full">
                <span className="text-red-600 text-xs font-medium">Immediate start</span>
              </div>
            )}
            <button
              onClick={handleSaveClick}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bookmark 
                className={`w-5 h-5 ${isSaved ? 'text-blue-600 fill-current' : 'text-gray-400'}`} 
              />
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {jobTitle}
            </h3>
            {immediateStart && (
              <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">{companyName}</p>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{jobLocation}</span>
            {workspaceOption && <span className="ml-1">• {workspaceOption}</span>}
          </div>
          <p className="text-sm text-gray-700 font-medium mb-2">{formatSalary()}</p>
          
          {/* Category tag */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
            {category}
          </span>
        </div>

        {/* Short Description */}
        {showShortDescription && shortDescription && Array.isArray(shortDescription) && shortDescription.length > 0 && (
          <div className="mb-4">
            {shortDescription.slice(0, 3).map((point, index) => (
              <div key={index} className="flex items-start mb-1">
                <span className="text-blue-600 mr-2 mt-0.5 text-xs">•</span>
                <span className="text-sm text-gray-700 flex-1">{point}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer: Date + Action Buttons */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{getTimeAgo()}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleChatClick}
              className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="text-xs font-medium">Chat</span>
            </button>
            <button
              onClick={handleNotInterestedClick}
              className="border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link
            to={`/job/${_id}`}
            className="block w-full bg-gray-900 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard; 