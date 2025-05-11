import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import DHeader from '../components/dashboard/DHeader';
import { Save, LogOut, User, Lock, Bell, MessageSquare, ChevronDown, DollarSign } from 'lucide-react';
import api from '../services/api';
import { employerAPI } from '../services/api';

const Settings = () => {
    const { employer, setEmployer, logout } = useEmployerStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    
    const [profileData, setProfileData] = useState({
        companyName: employer?.companyName || '',
        companyWebsite: employer?.companyWebsite || '',
        companyDescription: employer?.companyDescription || '',
        companyIndustry: employer?.companyIndustry || '',
        companySize: employer?.companySize || '',
        companyLocation: employer?.companyLocation || '',
        EmployerName: employer?.EmployerName || '',
        EmployerEmail: employer?.EmployerEmail || '',
        EmployerPhone: employer?.EmployerPhone || '',
        EmployerDesignation: employer?.EmployerDesignation || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        applicationAlerts: true,
        marketingEmails: false,
        jobStatusUpdates: true
    });

    const [messagingSettings, setMessagingSettings] = useState({
        messagesAllowed: employer?.messagesAllowed || false
    });

    const [pricingSettings, setPricingSettings] = useState({
        currentPlan: employer?.pricingPlan || 'Standard',
        earlyBirdPricing: employer?.earlyBirdPricing || true
    });

    useEffect(() => {
        if (employer) {
            setMessagingSettings({
                messagesAllowed: employer.messagesAllowed || false
            });
            setPricingSettings({
                currentPlan: employer.pricingPlan || 'Standard',
                earlyBirdPricing: employer.earlyBirdPricing || true
            });
        }
    }, [employer]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotificationSettings(prev => ({ ...prev, [name]: checked }));
    };

    const handleMessagingChange = (e) => {
        const { name, checked } = e.target;
        setMessagingSettings(prev => ({ ...prev, [name]: checked }));
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess('');
        setError('');
        
        try {
            // This would be an actual API call in a real application
            // const response = await api.put(`/employer/updateProfile`, profileData);
            
            // Simulating API call success
            setTimeout(() => {
                setEmployer({ ...employer, ...profileData });
                setSuccess('Profile updated successfully');
                setSaving(false);
            }, 1000);
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            setSaving(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        
        setSaving(true);
        setSuccess('');
        setError('');
        
        try {
            // This would be an actual API call in a real application
            // const response = await api.put(`/employer/updatePassword`, passwordData);
            
            // Simulating API call success
            setTimeout(() => {
                setSuccess('Password updated successfully');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setSaving(false);
            }, 1000);
        } catch (err) {
            setError('Failed to update password. Please verify your current password.');
            setSaving(false);
        }
    };

    const saveMessagingSettings = async () => {
        setSaving(true);
        setSuccess('');
        setError('');
        
        try {
            const response = await api.patch('/employer/updateMessagingStatus', {
                messagingStatus: messagingSettings.messagesAllowed,
                empId: employer._id
            });
            
            if (response.data) {
                setEmployer({ ...employer, messagesAllowed: messagingSettings.messagesAllowed });
                setSuccess('Messaging settings updated successfully');
            }
        } catch (err) {
            setError('Failed to update messaging settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('employerToken');
        navigate('/employer-login');
    };

    const handlePlanUpgrade = async (newPlan) => {
        setSaving(true);
        setSuccess('');
        setError('');
        
        try {
            const response = await employerAPI.updatePricingPlan(newPlan, employer._id);
            
            if (response.success) {
                setEmployer({ ...employer, pricingPlan: newPlan });
                setPricingSettings({ ...pricingSettings, currentPlan: newPlan });
                setSuccess('Pricing plan updated successfully');
            }
        } catch (err) {
            setError('Failed to update pricing plan. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    // The pricing plans data for the UI
    const pricingPlans = [
        { 
            id: 'Standard', 
            name: 'Standard Listing', 
            price: pricingSettings.earlyBirdPricing ? 49 : 199,
            isEarlyBird: pricingSettings.earlyBirdPricing,
            description: 'Basic job posting with standard visibility and features.'
        },
        { 
            id: 'Boosted100App', 
            name: 'Boosted 100 - App Only', 
            price: 49,
            description: 'Notify 100 candidates via app notifications.'
        },
        { 
            id: 'Boosted100Email', 
            name: 'Boosted 100 - Email Only', 
            price: 49,
            description: 'Notify 100 candidates via email.'
        },
        { 
            id: 'Boosted100Both', 
            name: 'Boosted 100 - Both', 
            price: 69,
            savings: 29,
            description: 'Notify 100 candidates via both app and email.'
        },
        { 
            id: 'Boosted250App', 
            name: 'Boosted 250 - App Only', 
            price: 99,
            description: 'Notify 250 candidates via app notifications.'
        },
        { 
            id: 'Boosted250Email', 
            name: 'Boosted 250 - Email Only', 
            price: 99,
            description: 'Notify 250 candidates via email.'
        },
        { 
            id: 'Boosted250Both', 
            name: 'Boosted 250 - Both', 
            price: 129,
            savings: 69,
            description: 'Notify 250 candidates via both app and email.'
        },
        { 
            id: 'Boosted500App', 
            name: 'Boosted 500 - App Only', 
            price: 149,
            description: 'Notify 500 candidates via app notifications.'
        },
        { 
            id: 'Boosted500Email', 
            name: 'Boosted 500 - Email Only', 
            price: 149,
            description: 'Notify 500 candidates via email.'
        },
        { 
            id: 'Boosted500Both', 
            name: 'Boosted 500 - Both', 
            price: 189,
            savings: 109,
            description: 'Notify 500 candidates via both app and email.'
        },
        { 
            id: 'Boosted750App', 
            name: 'Boosted 750 - App Only', 
            price: 199,
            description: 'Notify 750 candidates via app notifications.'
        },
        { 
            id: 'Boosted750Email', 
            name: 'Boosted 750 - Email Only', 
            price: 199,
            description: 'Notify 750 candidates via email.'
        },
        { 
            id: 'Boosted750Both', 
            name: 'Boosted 750 - Both', 
            price: 249,
            savings: 149,
            description: 'Notify 750 candidates via both app and email.'
        },
        { 
            id: 'Boosted1000App', 
            name: 'Boosted 1000 - App Only', 
            price: 249,
            description: 'Notify 1000 candidates via app notifications.'
        },
        { 
            id: 'Boosted1000Email', 
            name: 'Boosted 1000 - Email Only', 
            price: 249,
            description: 'Notify 1000 candidates via email.'
        },
        { 
            id: 'Boosted1000Both', 
            name: 'Boosted 1000 - Both', 
            price: 299,
            savings: 199,
            description: 'Notify 1000 candidates via both app and email.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white">
            <DHeader employer={employer} />
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>
                
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white shadow rounded">
                            <div className="py-4 px-6 border-b">
                                <h2 className="font-semibold">Settings Menu</h2>
                            </div>
                            <div className="py-2">
                                <button 
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center py-3 px-6 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <User size={18} className="mr-3" />
                                    Profile
                                </button>
                                <button 
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full flex items-center py-3 px-6 ${activeTab === 'security' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <Lock size={18} className="mr-3" />
                                    Security
                                </button>
                                <button 
                                    onClick={() => setActiveTab('messaging')}
                                    className={`w-full flex items-center py-3 px-6 ${activeTab === 'messaging' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <MessageSquare size={18} className="mr-3" />
                                    Messaging
                                </button>
                                <button 
                                    onClick={() => setActiveTab('pricing')}
                                    className={`w-full flex items-center py-3 px-6 ${activeTab === 'pricing' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <DollarSign size={18} className="mr-3" />
                                    Pricing
                                </button>
                                <button 
                                    onClick={() => setActiveTab('notifications')}
                                    className={`w-full flex items-center py-3 px-6 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <Bell size={18} className="mr-3" />
                                    Notifications
                                </button>
                                <div className="border-t my-2"></div>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center py-3 px-6 text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={18} className="mr-3" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white shadow rounded p-6">
                            {activeTab === 'profile' && (
                                <form onSubmit={saveProfile}>
                                    <h2 className="text-xl font-bold text-gray-800 mb-6">Company Profile</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={profileData.companyName}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                                            <input
                                                type="url"
                                                name="companyWebsite"
                                                value={profileData.companyWebsite}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                                            <textarea
                                                name="companyDescription"
                                                value={profileData.companyDescription}
                                                onChange={handleProfileChange}
                                                rows="4"
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                            <input
                                                type="text"
                                                name="companyIndustry"
                                                value={profileData.companyIndustry}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                                            <input
                                                type="number"
                                                name="companySize"
                                                value={profileData.companySize}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                name="companyLocation"
                                                value={profileData.companyLocation}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <hr className="my-6" />
                                    
                                    <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Person Information</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input
                                                type="text"
                                                name="EmployerName"
                                                value={profileData.EmployerName}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                            <input
                                                type="text"
                                                name="EmployerDesignation"
                                                value={profileData.EmployerDesignation}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="EmployerEmail"
                                                value={profileData.EmployerEmail}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                name="EmployerPhone"
                                                value={profileData.EmployerPhone}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                            disabled={saving}
                                        >
                                            {saving ? 'Saving...' : (
                                                <>
                                                    <Save size={18} className="mr-2" />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                            
                            {activeTab === 'security' && (
                                <form onSubmit={handlePasswordUpdate}>
                                    <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                                minLength="6"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                            disabled={saving}
                                        >
                                            {saving ? 'Updating...' : (
                                                <>
                                                    <Lock size={18} className="mr-2" />
                                                    Update Password
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'messaging' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-6">Messaging Settings</h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                                            <p className="text-blue-700">
                                                Messaging allows job applicants to contact you directly. Enabling this feature can improve communication with potential candidates.
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center justify-between py-3 border-b">
                                            <div>
                                                <h3 className="font-medium">Allow Direct Messages</h3>
                                                <p className="text-sm text-gray-500">
                                                    Enable or disable direct messaging from job applicants
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    name="messagesAllowed"
                                                    checked={messagingSettings.messagesAllowed}
                                                    onChange={handleMessagingChange}
                                                    className="sr-only peer" 
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={saveMessagingSettings}
                                            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                            disabled={saving}
                                        >
                                            {saving ? 'Saving...' : (
                                                <>
                                                    <MessageSquare size={18} className="mr-2" />
                                                    Save Messaging Settings
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'pricing' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-6">Pricing & Subscription</h2>
                                    
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                                        <div className="flex items-center">
                                            <DollarSign size={20} className="text-blue-700 mr-2" />
                                            <p className="text-blue-700 font-medium">Current Plan: {pricingPlans.find(plan => plan.id === pricingSettings.currentPlan)?.name || 'Standard'}</p>
                                        </div>
                                        {employer?.planExpiryDate && (
                                            <p className="text-blue-600 mt-2">
                                                Expires on: {new Date(employer.planExpiryDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Plans</h3>
                                    
                                    <div className="space-y-4">
                                        {/* Standard Plan */}
                                        <div className="border rounded-lg overflow-hidden">
                                            <div className="bg-gray-50 p-4 border-b">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-semibold text-gray-800">Standard Listing</h4>
                                                    <span className="text-primary font-bold">
                                                        ${pricingSettings.earlyBirdPricing ? '49' : '199'} 
                                                        {pricingSettings.earlyBirdPricing && 
                                                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">Early Bird</span>
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-gray-600 mb-4">Post a single job listing with standard visibility and features.</p>
                                                <button 
                                                    onClick={() => handlePlanUpgrade('Standard')}
                                                    disabled={pricingSettings.currentPlan === 'Standard' || saving}
                                                    className={`px-4 py-2 rounded font-medium ${
                                                        pricingSettings.currentPlan === 'Standard' 
                                                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                                            : 'bg-primary text-white hover:bg-blue-600'
                                                    }`}
                                                >
                                                    {pricingSettings.currentPlan === 'Standard' ? 'Current Plan' : (saving ? 'Updating...' : 'Select Plan')}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Boosted Plans Section */}
                                        <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4">Boosted Notification Packages</h3>
                                        
                                        {/* 100 Candidates Section */}
                                        <div className="border rounded-lg overflow-hidden">
                                            <div className="bg-gray-50 p-4 border-b">
                                                <h4 className="font-semibold text-gray-800">Notify 100 Candidates</h4>
                                            </div>
                                            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* App Only */}
                                                <div className="border rounded p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium">App Only</span>
                                                        <span className="text-primary font-bold">$49</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-4">Notify 100 candidates via app notifications.</p>
                                                    <button 
                                                        onClick={() => handlePlanUpgrade('Boosted100App')}
                                                        disabled={pricingSettings.currentPlan === 'Boosted100App' || saving}
                                                        className={`w-full px-3 py-2 rounded text-sm font-medium ${
                                                            pricingSettings.currentPlan === 'Boosted100App' 
                                                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                                                : 'bg-primary text-white hover:bg-blue-600'
                                                        }`}
                                                    >
                                                        {pricingSettings.currentPlan === 'Boosted100App' ? 'Current Plan' : (saving ? 'Updating...' : 'Select Plan')}
                                                    </button>
                                                </div>
                                                
                                                {/* Email Only */}
                                                <div className="border rounded p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium">Email Only</span>
                                                        <span className="text-primary font-bold">$49</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-4">Notify 100 candidates via email.</p>
                                                    <button 
                                                        onClick={() => handlePlanUpgrade('Boosted100Email')}
                                                        disabled={pricingSettings.currentPlan === 'Boosted100Email' || saving}
                                                        className={`w-full px-3 py-2 rounded text-sm font-medium ${
                                                            pricingSettings.currentPlan === 'Boosted100Email' 
                                                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                                                : 'bg-primary text-white hover:bg-blue-600'
                                                        }`}
                                                    >
                                                        {pricingSettings.currentPlan === 'Boosted100Email' ? 'Current Plan' : (saving ? 'Updating...' : 'Select Plan')}
                                                    </button>
                                                </div>
                                                
                                                {/* Both */}
                                                <div className="border rounded p-4 bg-blue-50 border-blue-200">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium">Both Channels</span>
                                                        <span className="text-primary font-bold">$69</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">Notify 100 candidates via both app and email.</p>
                                                    <p className="text-sm text-green-600 font-medium mb-4">Save $29</p>
                                                    <button 
                                                        onClick={() => handlePlanUpgrade('Boosted100Both')}
                                                        disabled={pricingSettings.currentPlan === 'Boosted100Both' || saving}
                                                        className={`w-full px-3 py-2 rounded text-sm font-medium ${
                                                            pricingSettings.currentPlan === 'Boosted100Both' 
                                                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                                                : 'bg-primary text-white hover:bg-blue-600'
                                                        }`}
                                                    >
                                                        {pricingSettings.currentPlan === 'Boosted100Both' ? 'Current Plan' : (saving ? 'Updating...' : 'Best Value')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* More candidate packages would follow the same pattern */}
                                        <div className="mt-4 text-center">
                                            <button 
                                                onClick={() => document.getElementById('morePackages').classList.toggle('hidden')}
                                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto"
                                            >
                                                Show More Packages
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>
                                        
                                        <div id="morePackages" className="hidden space-y-4 mt-4">
                                            {/* 250, 500, 750, and 1000 Candidate packages would go here */}
                                            {/* Example for 250 */}
                                            <div className="border rounded-lg overflow-hidden">
                                                <div className="bg-gray-50 p-4 border-b">
                                                    <h4 className="font-semibold text-gray-800">Notify 250 Candidates</h4>
                                                </div>
                                                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="border rounded p-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-medium">App Only</span>
                                                            <span className="text-primary font-bold">$99</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-4">Notify 250 candidates via app notifications.</p>
                                                        <button 
                                                            onClick={() => handlePlanUpgrade('Boosted250App')}
                                                            disabled={pricingSettings.currentPlan === 'Boosted250App' || saving}
                                                            className={`w-full px-3 py-2 rounded text-sm font-medium ${
                                                                pricingSettings.currentPlan === 'Boosted250App' 
                                                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                                                    : 'bg-primary text-white hover:bg-blue-600'
                                                            }`}
                                                        >
                                                            {pricingSettings.currentPlan === 'Boosted250App' ? 'Current Plan' : (saving ? 'Updating...' : 'Select Plan')}
                                                        </button>
                                                    </div>
                                                    
                                                    {/* Other options for 250 level */}
                                                    {/* Similar code for Email Only and Both options */}
                                                </div>
                                            </div>
                                            
                                            {/* Additional candidate tiers would follow */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between py-3 border-b">
                                            <div>
                                                <h3 className="font-medium">Email Notifications</h3>
                                                <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    name="emailNotifications"
                                                    checked={notificationSettings.emailNotifications}
                                                    onChange={handleNotificationChange}
                                                    className="sr-only peer" 
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        
                                        <div className="flex items-center justify-between py-3 border-b">
                                            <div>
                                                <h3 className="font-medium">Application Alerts</h3>
                                                <p className="text-sm text-gray-500">Get notified when someone applies to your job</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    name="applicationAlerts"
                                                    checked={notificationSettings.applicationAlerts}
                                                    onChange={handleNotificationChange}
                                                    className="sr-only peer" 
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        
                                        <div className="flex items-center justify-between py-3 border-b">
                                            <div>
                                                <h3 className="font-medium">Marketing Emails</h3>
                                                <p className="text-sm text-gray-500">Receive emails about new features and offers</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    name="marketingEmails"
                                                    checked={notificationSettings.marketingEmails}
                                                    onChange={handleNotificationChange}
                                                    className="sr-only peer" 
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        
                                        <div className="flex items-center justify-between py-3 border-b">
                                            <div>
                                                <h3 className="font-medium">Job Status Updates</h3>
                                                <p className="text-sm text-gray-500">Get notified when your job posting status changes</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    name="jobStatusUpdates"
                                                    checked={notificationSettings.jobStatusUpdates}
                                                    onChange={handleNotificationChange}
                                                    className="sr-only peer" 
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <Save size={18} className="mr-2" />
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings; 