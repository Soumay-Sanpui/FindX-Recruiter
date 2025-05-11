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
    
    updateApplicationStatus: async (jobId, applicationId, status) => {
        try {
            const response = await api.put(`/jobs/${jobId}/applications/${applicationId}`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default api; 