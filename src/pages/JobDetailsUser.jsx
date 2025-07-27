import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Clock, Building, DollarSign, Calendar, Users, Briefcase, MessageCircle, Bookmark, X } from 'lucide-react';
import { jobAPI } from '../services/api';
import ApplicationModal from '../components/ApplicationModal';
import { toast } from 'react-toastify';

const JobDetailsUser = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await jobAPI.getJobDetails(jobId);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save job functionality
    console.log('Save job:', jobId);
  };

  const handleNotInterested = () => {
    // TODO: Implement not interested functionality
    console.log('Not interested in job:', jobId);
    navigate('/jobs');
  };

  const handleChat = () => {
    // Navigate to messages page for this specific job
    navigate(`/chat/${jobId}`);
  };

  const handleApply = () => {
    // Check if job has application questions
    if (job.applicationQuestions && job.applicationQuestions.length > 0) {
      setShowApplicationModal(true);
    } else {
      // Apply directly without questions
      handleSubmitApplication();
    }
  };

  const handleSubmitApplication = async (questionResponses = []) => {
    try {
      setApplying(true);
      
      // Get user's primary resume and cover letter from localStorage or user context
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const primaryResume = user?.resumes?.find(r => r.isPrimary) || user?.resumes?.[0];
      const coverLetter = user?.cover_letter || '';
      
      const result = await jobAPI.applyForJob(jobId, questionResponses, primaryResume, coverLetter);
      
      if (result.success) {
        toast.success('Application submitted successfully!');
        // Update job to show applied status
        setJob(prev => ({
          ...prev,
          applicants: [...(prev.applicants || []), { user: 'current-user', status: 'Pending' }]
        }));
      } else {
        toast.error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setApplying(false);
      setShowApplicationModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Job Details</h1>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveJob}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bookmark 
                  className={`w-5 h-5 ${isSaved ? 'text-blue-600 fill-current' : 'text-gray-400'}`} 
                />
              </button>
              <button
                onClick={handleNotInterested}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Card */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            {/* Company Info */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                {job.companyLogo || job.postedBy?.companyLogo ? (
                  <img 
                    src={job.companyLogo || job.postedBy?.companyLogo} 
                    alt={job.postedBy?.companyName || 'Company'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Building className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
                <p className="text-lg text-gray-600 mb-1">{job.postedBy?.companyName || 'Company Name'}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.jobLocation}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.workType}
                  </div>
                </div>
              </div>
              {job.immediateStart && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Immediate Start
                </span>
              )}
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium text-gray-900">
                    {job.currency} {Number(job.from).toLocaleString()} - {Number(job.to).toLocaleString()} {job.jobSalaryType || 'Per Month'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{job.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Work Type</p>
                  <p className="font-medium text-gray-900">{job.workType}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.jobDescription}</p>
              </div>
            </div>

            {/* Job Keywords */}
            {job.jobKeywords && job.jobKeywords.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {job.jobKeywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Application Questions */}
            {job.applicationQuestions && job.applicationQuestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Application Questions ({job.applicationQuestions.length})</h3>
                <div className="space-y-3">
                  {job.applicationQuestions.map((question, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        Q{index + 1}: {question.question}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </p>
                      {question.options && question.options.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          Options: {question.options.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleChat}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>Chat with Employer</span>
                </button>
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applying ? 'Applying...' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleSubmitApplication}
        questions={job?.applicationQuestions || []}
        jobTitle={job?.jobTitle || ''}
        isLoading={applying}
        selectedResume={user?.resumes?.find(r => r.isPrimary) || user?.resumes?.[0]}
        selectedCoverLetter={user?.cover_letter}
      />
    </div>
  );
};

export default JobDetailsUser; 