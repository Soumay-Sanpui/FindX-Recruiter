import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import DHeader from '../components/dashboard/DHeader';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  Phone, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  MessageSquare,
  Filter,
  Search,
  Eye
} from 'lucide-react';
import { toast } from 'react-toastify';
import CONFIG from '../../config/config.js';

const InterviewManagement = () => {
  const { employer, isAuthenticated } = useEmployerStore();
  const navigate = useNavigate();
  
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    action: 'approve',
    message: '',
    selectedTime: { date: '', time: '' }
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/employer-login');
    }
  }, [isAuthenticated, navigate]);

  const fetchInvitations = async () => {
    try {
      const token = localStorage.getItem('employerToken');
      const response = await fetch(`${CONFIG.apiUrl}/interviews/sent-invitations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setInvitations(data.invitations || []);
      } else {
        toast.error(data.message || 'Failed to fetch invitations');
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRescheduleResponse = async () => {
    if (!selectedInvitation) return;

    if (rescheduleData.action === 'approve' && (!rescheduleData.selectedTime.date || !rescheduleData.selectedTime.time)) {
      toast.error('Please select a new date and time');
      return;
    }

    try {
      const token = localStorage.getItem('employerToken');
      const response = await fetch(`${CONFIG.apiUrl}/interviews/${selectedInvitation._id}/reschedule-response`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rescheduleData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Reschedule request ${rescheduleData.action}d successfully`);
        setShowRescheduleModal(false);
        setSelectedInvitation(null);
        fetchInvitations();
      } else {
        toast.error(data.message || 'Failed to respond to reschedule request');
      }
    } catch (error) {
      console.error('Error responding to reschedule:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const cancelInvitation = async (invitationId, reason = '') => {
    try {
      const token = localStorage.getItem('employerToken');
      const response = await fetch(`${CONFIG.apiUrl}/interviews/${invitationId}/cancel`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Interview invitation cancelled successfully');
        fetchInvitations();
      } else {
        toast.error(data.message || 'Failed to cancel invitation');
      }
    } catch (error) {
      console.error('Error cancelling invitation:', error);
      toast.error('Network error. Please try again.');
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'reschedule_requested': return 'bg-blue-100 text-blue-800';
      case 'rescheduled': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'accepted': return <CheckCircle size={14} />;
      case 'declined': return <XCircle size={14} />;
      case 'reschedule_requested': return <RefreshCw size={14} />;
      case 'rescheduled': return <Calendar size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const getInterviewTypeIcon = (type) => {
    switch (type) {
      case 'video-call': return <Video size={16} />;
      case 'phone-call': return <Phone size={16} />;
      case 'in-person': return <User size={16} />;
      default: return <Video size={16} />;
    }
  };

  // Filter invitations
  const filteredInvitations = invitations.filter(invitation => {
    const matchesStatus = filterStatus === 'all' || invitation.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      invitation.applicant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.job?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: invitations.length,
    pending: invitations.filter(inv => inv.status === 'pending').length,
    accepted: invitations.filter(inv => inv.status === 'accepted').length,
    declined: invitations.filter(inv => inv.status === 'declined').length,
    reschedule_requested: invitations.filter(inv => inv.status === 'reschedule_requested').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DHeader employer={employer} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading interview invitations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DHeader employer={employer} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Interview Management</h1>
          <p className="text-gray-600">Manage all your interview invitations and responses</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by candidate name or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All ({statusCounts.all})</option>
                <option value="pending">Pending ({statusCounts.pending})</option>
                <option value="accepted">Accepted ({statusCounts.accepted})</option>
                <option value="declined">Declined ({statusCounts.declined})</option>
                <option value="reschedule_requested">Reschedule Requests ({statusCounts.reschedule_requested})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invitations List */}
        {filteredInvitations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No matching invitations found' : 'No interview invitations sent'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search criteria or filters.' 
                : 'Start by inviting candidates for interviews from your job applications.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInvitations.map((invitation) => (
              <div key={invitation._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {invitation.applicant?.name || 'Unknown Candidate'}
                      </h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invitation.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(invitation.status)}
                          <span>{invitation.status.replace('_', ' ').toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{invitation.job?.jobTitle}</p>
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <p>Sent {new Date(invitation.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Interview Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm">{formatDate(invitation.interviewDetails.date)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm">
                        {formatTime(invitation.interviewDetails.time)}
                        {invitation.interviewDetails.duration && ` (${invitation.interviewDetails.duration}m)`}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getInterviewTypeIcon(invitation.interviewDetails.interviewType)}
                      <span className="text-sm capitalize">
                        {invitation.interviewDetails.interviewType?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm">{invitation.interviewDetails.location}</span>
                  </div>

                  {invitation.interviewDetails.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">{invitation.interviewDetails.notes}</p>
                    </div>
                  )}
                </div>

                {/* Reschedule Request Details */}
                {invitation.status === 'reschedule_requested' && invitation.applicantResponse && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Reschedule Request</h4>
                    <p className="text-sm text-blue-800 mb-3">{invitation.applicantResponse.rescheduleReason}</p>
                    
                    {invitation.applicantResponse.suggestedTimes && (
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-2">Suggested Times:</p>
                        <div className="space-y-2">
                          {invitation.applicantResponse.suggestedTimes.map((time, index) => (
                            <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                              <span className="text-sm">
                                {formatDate(time.date)} at {time.time}
                                {time.notes && ` - ${time.notes}`}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedInvitation(invitation);
                                  setRescheduleData({
                                    action: 'approve',
                                    message: '',
                                    selectedTime: { date: time.date, time: time.time }
                                  });
                                  setShowRescheduleModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                Select
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {invitation.status === 'reschedule_requested' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedInvitation(invitation);
                            setRescheduleData({
                              action: 'approve',
                              message: '',
                              selectedTime: { date: '', time: '' }
                            });
                            setShowRescheduleModal(true);
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Approve Reschedule
                        </button>
                        <button
                          onClick={() => {
                            setSelectedInvitation(invitation);
                            setRescheduleData({
                              action: 'reject',
                              message: '',
                              selectedTime: { date: '', time: '' }
                            });
                            setShowRescheduleModal(true);
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Reject Reschedule
                        </button>
                      </>
                    )}
                    
                    {['pending', 'accepted', 'reschedule_requested'].includes(invitation.status) && (
                      <button
                        onClick={() => {
                          const reason = prompt('Reason for cancellation (optional):');
                          if (reason !== null) {
                            cancelInvitation(invitation._id, reason);
                          }
                        }}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                      >
                        Cancel Interview
                      </button>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/messages?userId=${invitation.applicantId}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                    >
                      <MessageSquare size={14} className="mr-1" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reschedule Response Modal */}
        {showRescheduleModal && selectedInvitation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {rescheduleData.action === 'approve' ? 'Approve Reschedule' : 'Reject Reschedule'}
                </h3>

                {rescheduleData.action === 'approve' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                    <input
                      type="date"
                      value={rescheduleData.selectedTime.date}
                      onChange={(e) => setRescheduleData(prev => ({
                        ...prev,
                        selectedTime: { ...prev.selectedTime, date: e.target.value }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">New Time</label>
                    <input
                      type="time"
                      value={rescheduleData.selectedTime.time}
                      onChange={(e) => setRescheduleData(prev => ({
                        ...prev,
                        selectedTime: { ...prev.selectedTime, time: e.target.value }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    value={rescheduleData.message}
                    onChange={(e) => setRescheduleData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Add a message for the candidate..."
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowRescheduleModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRescheduleResponse}
                    className={`px-4 py-2 rounded text-white ${
                      rescheduleData.action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {rescheduleData.action === 'approve' ? 'Approve' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewManagement;