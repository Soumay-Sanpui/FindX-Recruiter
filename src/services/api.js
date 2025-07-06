import axios from 'axios';
import CONFIG from '../../config/config';

const api = axios.create({
    baseURL: CONFIG.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('employerToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle unauthorized responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear local storage and redirect to login
            localStorage.removeItem('employerToken');
            window.location.href = '/employer-login';
        }
        return Promise.reject(error);
    }
);

// Comprehensive Messaging API methods
export const messageAPI = {
    // Get employer's conversations
    getEmployerConversations: async (employerId) => {
        try {
            const response = await api.get(`/messages/employer/${employerId}/Employer/conversations`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Get conversation history between employer and user for a specific job
    getConversationHistory: async (employerId, userId, jobId) => {
        try {
            const response = await api.get(`/messages/employer/conversation/${employerId}/${userId}/${jobId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Send message as employer
    sendMessage: async (messageData) => {
        try {
            const response = await api.post('/messages/employer/send', messageData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Mark messages as read
    markMessagesAsRead: async (employerId, userId, jobId) => {
        try {
            const response = await api.put('/messages/employer/mark-read', {
                userId: employerId,
                partnerId: userId,
                jobId: jobId
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Get unread message count for employer
    getUnreadMessageCount: async (employerId) => {
        try {
            const response = await api.get(`/messages/employer/${employerId}/unread-count`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Get unread messages for employer
    getUnreadMessages: async (employerId, limit = 10) => {
        try {
            const response = await api.get(`/messages/employer/${employerId}/unread?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Mark all messages as read for employer
    markAllMessagesAsRead: async (employerId) => {
        try {
            const response = await api.put(`/messages/employer/mark-all-read/${employerId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Validate messaging permission
    validateMessagingPermission: async (employerId, userId, jobId) => {
        try {
            const response = await api.post('/messages/validate-permission', {
                userId: userId,
                employerId: employerId,
                jobId: jobId,
                userType: 'Employer'
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Legacy method for backward compatibility
    getMessagesBetweenUsers: async (employerId, userId, jobId) => {
        try {
            return await messageAPI.getConversationHistory(employerId, userId, jobId);
        } catch (error) {
            throw error;
        }
    }
};

// Employer API methods
export const employerAPI = {
    updatePricingPlan: async (pricingPlan, empId) => {
        try {
            const response = await api.patch('/employer/updatePricingPlan', { 
                pricingPlan, 
                empId 
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/employer/updateProfile', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const jobAPI = {
    createJob: async (jobData) => {
        try {
            const response = await api.post('/jobs', jobData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    getAllJobs: async () => {
        try {
            const response = await api.get('/jobs');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    getMyPostedJobs: async () => {
        try {
            const response = await api.get('/jobs/my/posted');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    getJobDetails: async (jobId) => {
        try {
            const response = await api.get(`/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    updateApplicationStatus: async (jobId, applicationId, status, additionalData = {}) => {
        try {
            const requestData = { 
                status,
                ...additionalData
            };
            
            const response = await api.put(`/jobs/${jobId}/applications/${applicationId}`, requestData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    updateJobStatus: async (jobId, status) => {
        try {
            const response = await api.put(`/jobs/${jobId}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Broadcast API methods
export const broadcastAPI = {
    sendEmail: async (broadcastData) => {
        try {
            const response = await api.post('/broadcast/email', broadcastData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    getStats: async () => {
        try {
            const response = await api.get('/broadcast/stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    testConfig: async () => {
        try {
            const response = await api.get('/broadcast/test-config');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Contact API methods
export const contactAPI = {
    submitContactForm: async (contactData) => {
        try {
            const response = await api.post('/contact/submit', contactData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Admin methods (for future use)
    getAllContacts: async (params = {}) => {
        try {
            const response = await api.get('/contact/admin/all', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    getContactById: async (contactId) => {
        try {
            const response = await api.get(`/contact/admin/${contactId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    updateContactStatus: async (contactId, statusData) => {
        try {
            const response = await api.put(`/contact/admin/${contactId}/status`, statusData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    getContactDashboard: async () => {
        try {
            const response = await api.get('/contact/admin/dashboard');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default api; 