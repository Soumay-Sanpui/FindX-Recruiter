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

export default api; 