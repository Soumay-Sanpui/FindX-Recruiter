import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone, User, X, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import CONFIG from '../../config/config.js';

const InterviewInvitationModal = ({ 
  isOpen, 
  onClose, 
  applicant, 
  job, 
  onSuccess 
}) => {
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    time: '',
    duration: 60,
    location: '',
    interviewType: 'video-call',
    meetingLink: '',
    contactNumber: '',
    notes: '',
    requirements: ['']
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!interviewDetails.date || !interviewDetails.time || !interviewDetails.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSending(true);

    try {
      const token = localStorage.getItem('employerToken');
      const response = await fetch(`${CONFIG.apiUrl}/interviews/send-invitation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: job._id,
          applicantId: applicant.user._id || applicant.user,
          applicationId: applicant._id,
          interviewDetails: {
            ...interviewDetails,
            requirements: interviewDetails.requirements.filter(req => req.trim() !== '')
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Interview invitation sent successfully!');
        onSuccess && onSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to send interview invitation');
      }
    } catch (error) {
      console.error('Error sending interview invitation:', error);
      toast.error('Failed to send interview invitation');
    } finally {
      setSending(false);
    }
  };

  const addRequirement = () => {
    setInterviewDetails(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index, value) => {
    setInterviewDetails(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index) => {
    if (interviewDetails.requirements.length > 1) {
      setInterviewDetails(prev => ({
        ...prev,
        requirements: prev.requirements.filter((_, i) => i !== index)
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Send Interview Invitation</h2>
              <p className="text-sm text-gray-600 mt-1">
                Invite {applicant.user?.name || 'candidate'} for an interview
              </p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Interview Date *
              </label>
              <input
                type="date"
                value={interviewDetails.date}
                onChange={(e) => setInterviewDetails(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-1" />
                Interview Time *
              </label>
              <input
                type="time"
                value={interviewDetails.time}
                onChange={(e) => setInterviewDetails(prev => ({ ...prev, time: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <select
              value={interviewDetails.duration}
              onChange={(e) => setInterviewDetails(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          {/* Interview Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setInterviewDetails(prev => ({ ...prev, interviewType: 'video-call' }))}
                className={`p-3 border rounded-lg flex flex-col items-center space-y-2 ${
                  interviewDetails.interviewType === 'video-call'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Video size={20} />
                <span className="text-sm font-medium">Video Call</span>
              </button>

              <button
                type="button"
                onClick={() => setInterviewDetails(prev => ({ ...prev, interviewType: 'phone-call' }))}
                className={`p-3 border rounded-lg flex flex-col items-center space-y-2 ${
                  interviewDetails.interviewType === 'phone-call'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Phone size={20} />
                <span className="text-sm font-medium">Phone Call</span>
              </button>

              <button
                type="button"
                onClick={() => setInterviewDetails(prev => ({ ...prev, interviewType: 'in-person' }))}
                className={`p-3 border rounded-lg flex flex-col items-center space-y-2 ${
                  interviewDetails.interviewType === 'in-person'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <User size={20} />
                <span className="text-sm font-medium">In Person</span>
              </button>
            </div>
          </div>

          {/* Location/Meeting Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin size={16} className="inline mr-1" />
              Location/Meeting Details *
            </label>
            <input
              type="text"
              value={interviewDetails.location}
              onChange={(e) => setInterviewDetails(prev => ({ ...prev, location: e.target.value }))}
              placeholder={
                interviewDetails.interviewType === 'video-call' ? 'Meeting link will be provided separately' :
                interviewDetails.interviewType === 'phone-call' ? 'Phone number will be provided' :
                'Office address or meeting location'
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Meeting Link (for video calls) */}
          {interviewDetails.interviewType === 'video-call' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Link (Optional)
              </label>
              <input
                type="url"
                value={interviewDetails.meetingLink}
                onChange={(e) => setInterviewDetails(prev => ({ ...prev, meetingLink: e.target.value }))}
                placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Contact Number (for phone calls) */}
          {interviewDetails.interviewType === 'phone-call' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number (Optional)
              </label>
              <input
                type="tel"
                value={interviewDetails.contactNumber}
                onChange={(e) => setInterviewDetails(prev => ({ ...prev, contactNumber: e.target.value }))}
                placeholder="+1 (555) 123-4567"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements/Things to Bring
            </label>
            <div className="space-y-2">
              {interviewDetails.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="e.g., Portfolio, Resume, ID card"
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {interviewDetails.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Requirement
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={interviewDetails.notes}
              onChange={(e) => setInterviewDetails(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information for the candidate..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              disabled={sending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center disabled:opacity-50"
            >
              {sending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Send Invitation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewInvitationModal; 