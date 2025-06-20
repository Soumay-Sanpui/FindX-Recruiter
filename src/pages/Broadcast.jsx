import React, { useState } from 'react';
import { Send, Users, Bell, CheckCircle, AlertCircle, Loader, Target, MapPin, Clock, BarChart3, Filter, Settings, Globe, Briefcase, Star, Calendar, Zap } from 'lucide-react';
import { broadcastAPI } from '../services/api';

const Broadcast = () => {
  const [message, setMessage] = useState({
    title: '',
    body: '',
    type: 'general'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [sentCount, setSentCount] = useState(0);
  const [activeTab, setActiveTab] = useState('message');
  const [targeting, setTargeting] = useState({
    audience: 'all',
    location: {
      enabled: false,
      countries: [],
      cities: [],
      radius: 50
    },
    skills: {
      enabled: false,
      required: [],
      preferred: []
    },
    experience: {
      enabled: false,
      minYears: 0,
      maxYears: 20,
      level: 'any'
    },
    language: {
      enabled: false,
      primary: [],
      secondary: []
    },
    jobPreferences: {
      enabled: false,
      types: [],
      salary: { min: 0, max: 200000 },
      remote: 'any'
    },
    activity: {
      enabled: false,
      lastActive: 30,
      profileComplete: false,
      appliedRecently: false
    },
    scheduling: {
      enabled: false,
      sendNow: true,
      scheduledDate: '',
      timezone: 'UTC'
    }
  });

  const messageTypes = [
    { value: 'general', label: '📢 General Announcement', color: 'bg-blue-500' },
    { value: 'job_alert', label: '💼 New Job Alert', color: 'bg-green-500' },
    { value: 'urgent', label: '🚨 Urgent Update', color: 'bg-red-500' },
    { value: 'maintenance', label: '🔧 Maintenance Notice', color: 'bg-yellow-500' },
    { value: 'promotion', label: '🎉 Promotion/Event', color: 'bg-purple-500' }
  ];

  const handleSendBroadcast = async () => {
    if (!message.title.trim() || !message.body.trim()) {
      setStatus({ type: 'error', message: 'Please fill in both title and message' });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const result = await broadcastAPI.sendEmail({
        title: message.title,
        body: message.body,
        type: message.type
      });

      setStatus({ 
        type: 'success', 
        message: `Broadcast email sent successfully to ${result.sentCount || result.recipients || 'all'} users!` 
      });
      setSentCount(result.sentCount || result.recipients || 0);
      // Reset form
      setMessage({ title: '', body: '', type: 'general' });
      
      // Refresh stats after successful send
      fetchBroadcastStats();
    } catch (error) {
      console.error('Broadcast error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send broadcast email. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeInfo = (type) => {
    return messageTypes.find(t => t.value === type) || messageTypes[0];
  };

  const tabs = [
    { id: 'message', label: 'Message', icon: Bell },
    { id: 'targeting', label: 'Targeting', icon: Target },
    { id: 'scheduling', label: 'Scheduling', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const [broadcastStats, setBroadcastStats] = useState({
    totalUsers: 0,
    usersWithEmails: 0,
    emailDeliveryRate: 0
  });

  // Fetch broadcast statistics
  const fetchBroadcastStats = async () => {
    try {
      const result = await broadcastAPI.getStats();
      if (result.success) {
        setBroadcastStats(result.stats);
      }
    } catch (error) {
      console.error('Failed to fetch broadcast stats:', error);
    }
  };

  // Fetch stats on component mount
  React.useEffect(() => {
    fetchBroadcastStats();
  }, []);

  const estimatedReach = () => {
    // Use real user count from backend
    let base = broadcastStats.usersWithEmails || 0;
    
    // Apply targeting filters (simplified calculation)
    if (targeting.location.enabled) base *= 0.3;
    if (targeting.skills.enabled) base *= 0.4;
    if (targeting.experience.enabled) base *= 0.6;
    if (targeting.language.enabled) base *= 0.7;
    if (targeting.jobPreferences.enabled) base *= 0.5;
    if (targeting.activity.enabled) base *= 0.8;
    
    return Math.floor(base);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Broadcast Center</h1>
                <p className="text-sm text-gray-500">Send push notifications to all FindX mobile app users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Status Messages */}
            {status && (
              <div className={`mb-6 p-4 rounded-md flex items-center space-x-2 ${
                status.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  status.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {status.message}
                </span>
              </div>
            )}

            {/* Message Tab */}
            {activeTab === 'message' && (
              <div className="space-y-6">

                            {/* Message Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Message Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {messageTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setMessage(prev => ({ ...prev, type: type.value }))}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          message.type === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                          <span className="text-sm font-medium text-gray-900">
                            {type.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                            {/* Message Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Title *
                  </label>
                  <input
                    type="text"
                    value={message.title}
                    onChange={(e) => setMessage(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter notification title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    maxLength={100}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {message.title.length}/100 characters
                  </p>
                </div>

                            {/* Message Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Content *
                  </label>
                  <textarea
                    value={message.body}
                    onChange={(e) => setMessage(prev => ({ ...prev, body: e.target.value }))}
                    placeholder="Enter your broadcast message..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    maxLength={300}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {message.body.length}/300 characters
                  </p>
                </div>

                            {/* Preview Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                    <div className="bg-white rounded-lg p-4 shadow-sm max-w-sm">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Bell className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium text-gray-900">FindX</span>
                            <div className={`w-2 h-2 rounded-full ${getTypeInfo(message.type).color}`}></div>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {message.title || 'Notification Title'}
                          </p>
                          <p className="text-xs text-gray-600">
                            {message.body || 'Your message content will appear here...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Targeting Tab */}
            {activeTab === 'targeting' && (
              <div className="space-y-8">
                {/* Audience Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Audience Selection</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['all', 'active', 'new'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setTargeting(prev => ({ ...prev, audience: type }))}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          targeting.audience === type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium capitalize">{type} Users</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {type === 'all' && 'Send to all registered users'}
                          {type === 'active' && 'Users active in last 30 days'}
                          {type === 'new' && 'Users registered in last 7 days'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Targeting */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Location Targeting</span>
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={targeting.location.enabled}
                        onChange={(e) => setTargeting(prev => ({ 
                          ...prev, 
                          location: { ...prev.location, enabled: e.target.checked }
                        }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`space-y-4 ${!targeting.location.enabled && 'opacity-50 pointer-events-none'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Countries</label>
                        <select multiple className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>India</option>
                          <option>Germany</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cities</label>
                        <select multiple className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>New York</option>
                          <option>London</option>
                          <option>Toronto</option>
                          <option>Sydney</option>
                          <option>San Francisco</option>
                          <option>Berlin</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Radius (km): {targeting.location.radius}
                      </label>
                      <input 
                        type="range" 
                        min="5" 
                        max="200" 
                        value={targeting.location.radius}
                        onChange={(e) => setTargeting(prev => ({ 
                          ...prev, 
                          location: { ...prev.location, radius: parseInt(e.target.value) }
                        }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills Targeting */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <Star className="h-5 w-5" />
                      <span>Skills Targeting</span>
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={targeting.skills.enabled}
                        onChange={(e) => setTargeting(prev => ({ 
                          ...prev, 
                          skills: { ...prev.skills, enabled: e.target.checked }
                        }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`space-y-4 ${!targeting.skills.enabled && 'opacity-50 pointer-events-none'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                        <div className="space-y-2">
                          {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                            <label key={skill} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Skills</label>
                        <div className="space-y-2">
                          {['TypeScript', 'GraphQL', 'Kubernetes', 'Machine Learning', 'DevOps', 'UI/UX'].map((skill) => (
                            <label key={skill} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Level */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Experience Level</span>
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={targeting.experience.enabled}
                        onChange={(e) => setTargeting(prev => ({ 
                          ...prev, 
                          experience: { ...prev.experience, enabled: e.target.checked }
                        }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`space-y-4 ${!targeting.experience.enabled && 'opacity-50 pointer-events-none'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Min Years: {targeting.experience.minYears}
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="20" 
                          value={targeting.experience.minYears}
                          onChange={(e) => setTargeting(prev => ({ 
                            ...prev, 
                            experience: { ...prev.experience, minYears: parseInt(e.target.value) }
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Years: {targeting.experience.maxYears}
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="20" 
                          value={targeting.experience.maxYears}
                          onChange={(e) => setTargeting(prev => ({ 
                            ...prev, 
                            experience: { ...prev.experience, maxYears: parseInt(e.target.value) }
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                        <select 
                          value={targeting.experience.level}
                          onChange={(e) => setTargeting(prev => ({ 
                            ...prev, 
                            experience: { ...prev.experience, level: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="any">Any Level</option>
                          <option value="entry">Entry Level</option>
                          <option value="mid">Mid Level</option>
                          <option value="senior">Senior Level</option>
                          <option value="lead">Lead/Principal</option>
                          <option value="executive">Executive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language Preferences */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Language Preferences</span>
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={targeting.language.enabled}
                        onChange={(e) => setTargeting(prev => ({ 
                          ...prev, 
                          language: { ...prev.language, enabled: e.target.checked }
                        }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`space-y-4 ${!targeting.language.enabled && 'opacity-50 pointer-events-none'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Languages</label>
                        <div className="space-y-2">
                          {['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese'].map((lang) => (
                            <label key={lang} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">{lang}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Languages</label>
                        <div className="space-y-2">
                          {['Portuguese', 'Italian', 'Korean', 'Arabic', 'Hindi', 'Russian'].map((lang) => (
                            <label key={lang} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">{lang}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Preferences */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Job Preferences</span>
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={targeting.jobPreferences.enabled}
                        onChange={(e) => setTargeting(prev => ({ 
                          ...prev, 
                          jobPreferences: { ...prev.jobPreferences, enabled: e.target.checked }
                        }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`space-y-4 ${!targeting.jobPreferences.enabled && 'opacity-50 pointer-events-none'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Types</label>
                        <div className="space-y-2">
                          {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'].map((type) => (
                            <label key={type} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Remote Work Preference</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
                          <option value="any">Any</option>
                          <option value="remote">Remote Only</option>
                          <option value="hybrid">Hybrid</option>
                          <option value="onsite">On-site Only</option>
                        </select>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Salary Range: ${targeting.jobPreferences.salary.min.toLocaleString()} - ${targeting.jobPreferences.salary.max.toLocaleString()}
                          </label>
                          <div className="flex space-x-4">
                            <input 
                              type="range" 
                              min="0" 
                              max="200000" 
                              step="5000"
                              value={targeting.jobPreferences.salary.min}
                              onChange={(e) => setTargeting(prev => ({ 
                                ...prev, 
                                jobPreferences: { 
                                  ...prev.jobPreferences, 
                                  salary: { ...prev.jobPreferences.salary, min: parseInt(e.target.value) }
                                }
                              }))}
                              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <input 
                              type="range" 
                              min="0" 
                              max="200000" 
                              step="5000"
                              value={targeting.jobPreferences.salary.max}
                              onChange={(e) => setTargeting(prev => ({ 
                                ...prev, 
                                jobPreferences: { 
                                  ...prev.jobPreferences, 
                                  salary: { ...prev.jobPreferences.salary, max: parseInt(e.target.value) }
                                }
                              }))}
                              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Based Targeting */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Activity Based Targeting</span>
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={targeting.activity.enabled}
                        onChange={(e) => setTargeting(prev => ({ 
                          ...prev, 
                          activity: { ...prev.activity, enabled: e.target.checked }
                        }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className={`space-y-4 ${!targeting.activity.enabled && 'opacity-50 pointer-events-none'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Active (days): {targeting.activity.lastActive}
                        </label>
                        <input 
                          type="range" 
                          min="1" 
                          max="90" 
                          value={targeting.activity.lastActive}
                          onChange={(e) => setTargeting(prev => ({ 
                            ...prev, 
                            activity: { ...prev.activity, lastActive: parseInt(e.target.value) }
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            checked={targeting.activity.profileComplete}
                            onChange={(e) => setTargeting(prev => ({ 
                              ...prev, 
                              activity: { ...prev.activity, profileComplete: e.target.checked }
                            }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="text-sm">Profile 100% Complete</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            checked={targeting.activity.appliedRecently}
                            onChange={(e) => setTargeting(prev => ({ 
                              ...prev, 
                              activity: { ...prev.activity, appliedRecently: e.target.checked }
                            }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="text-sm">Applied to Jobs Recently</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scheduling Tab */}
            {activeTab === 'scheduling' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Settings</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Send Option</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="sendOption" 
                            checked={targeting.scheduling.sendNow}
                            onChange={() => setTargeting(prev => ({ 
                              ...prev, 
                              scheduling: { ...prev.scheduling, sendNow: true }
                            }))}
                            className="text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="text-sm">Send Immediately</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="sendOption" 
                            checked={!targeting.scheduling.sendNow}
                            onChange={() => setTargeting(prev => ({ 
                              ...prev, 
                              scheduling: { ...prev.scheduling, sendNow: false }
                            }))}
                            className="text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="text-sm">Schedule for Later</span>
                        </label>
                      </div>
                    </div>
                    
                    {!targeting.scheduling.sendNow && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                          <input 
                            type="datetime-local" 
                            value={targeting.scheduling.scheduledDate}
                            onChange={(e) => setTargeting(prev => ({ 
                              ...prev, 
                              scheduling: { ...prev.scheduling, scheduledDate: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                          <select 
                            value={targeting.scheduling.timezone}
                            onChange={(e) => setTargeting(prev => ({ 
                              ...prev, 
                              scheduling: { ...prev.scheduling, timezone: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            <option value="GMT">Greenwich Mean Time</option>
                            <option value="CET">Central European Time</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Optimal Send Times</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>📈 Highest engagement: 9:00 AM - 11:00 AM</p>
                      <p>📊 Good engagement: 2:00 PM - 4:00 PM</p>
                      <p>📉 Lower engagement: After 6:00 PM</p>
                      <p>🌟 Best days: Tuesday - Thursday</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Audience Analytics</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{estimatedReach().toLocaleString()}</div>
                    <div className="text-sm text-blue-800">Estimated Reach</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{broadcastStats.emailDeliveryRate}%</div>
                    <div className="text-sm text-green-800">Email Delivery Rate</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">23%</div>
                    <div className="text-sm text-purple-800">Expected Open Rate</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Audience Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Users</span>
                        <span>{broadcastStats.totalUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Users with Emails</span>
                        <span>{broadcastStats.usersWithEmails.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Email Deliverable</span>
                        <span>{broadcastStats.usersWithEmails.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Rate</span>
                        <span>{broadcastStats.emailDeliveryRate}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Avg. Open Rate</span>
                        <span>23.4%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg. Click Rate</span>
                        <span>4.7%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Best Performing Time</span>
                        <span>10:00 AM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Unsubscribe Rate</span>
                        <span>0.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Send Button */}
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Target className="h-4 w-4" />
                    <span>Estimated reach: {estimatedReach().toLocaleString()} users</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>📧 {broadcastStats.emailDeliveryRate}% email delivery rate</span>
                    <span>👁️ ~25% open rate</span>
                    <span>📊 ~5% click rate</span>
                  </div>
                </div>
                <button
                  onClick={handleSendBroadcast}
                  disabled={isLoading || !message.title.trim() || !message.body.trim()}
                  className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Email Broadcast</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Broadcasts */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Broadcasts</h3>
            <div className="text-sm text-gray-500">
              <p>Broadcast history will appear here once you send your first message.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadcast; 