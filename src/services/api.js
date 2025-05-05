import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust this to your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
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

// Job related API calls
export const jobAPI = {
    // Create a new job
    createJob: async (jobData) => {
        try {
            const response = await api.post('/jobs', jobData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Get all jobs
    getAllJobs: async () => {
        try {
            const response = await api.get('/jobs');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Get jobs posted by current employer
    getMyPostedJobs: async (employerId) => {
        try {
            // Use the filter query to find jobs by employer ID
            const response = await api.get(`/jobs?postedBy=${employerId}`);
            return {
                success: true,
                jobs: response.data.jobs || []
            };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Get job details
    getJobDetails: async (jobId) => {
        try {
            const response = await api.get(`/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Update application status
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