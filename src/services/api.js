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
      const token = localStorage.getItem("employerToken");
      console.log(
        `🔍 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
      console.log(`🔍 Token available: ${!!token}`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(
          `🔍 Authorization header set: Bearer ${token.substring(0, 20)}...`
        );
      } else {
        console.log(`❌ No token found in localStorage`);
      }
      return config;
    },
      (error) => {
        console.error(`❌ Request interceptor error:`, error);
        return Promise.reject(error);
      };
);

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(
      `❌ API Error: ${error.response?.status || "Network Error"} ${
        error.config?.url || "Unknown URL"
      }`
    );
    console.error(`❌ Error details:`, error.response?.data || error.message);

    if (error.response && error.response.status === 401) {
      console.log(`🔐 Unauthorized - redirecting to login`);
      // Clear local storage and redirect to login
      localStorage.removeItem("employerToken");
      window.location.href = "/employer-login";
    }
    return Promise.reject(error);
  }
);

// Comprehensive Messaging API methods
export const messageAPI = {
  // Get employer's conversations
  getEmployerConversations: async (employerId) => {
    try {
      const response = await api.get(
        `/messages/employer/${employerId}/Employer/conversations`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get conversation history between employer and user for a specific job
  getConversationHistory: async (employerId, userId, jobId) => {
    try {
      const response = await api.get(
        `/messages/employer/conversation/${employerId}/${userId}/${jobId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Send message as employer
  sendMessage: async (messageData) => {
    try {
      const response = await api.post("/messages/employer/send", messageData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark messages as read
  markMessagesAsRead: async (employerId, userId, jobId) => {
    try {
      console.log(`🔍 Web client calling markMessagesAsRead:`, {
        employerId,
        userId,
        jobId,
      });
      const response = await api.put("/messages/employer/mark-read", {
        userId: employerId,
        partnerId: userId,
        jobId: jobId,
      });
      console.log(`✅ Web client markMessagesAsRead response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Web client markMessagesAsRead error:`, error);
      throw error.response?.data || error.message;
    }
  },

  // Get unread message count for employer
  getUnreadMessageCount: async (employerId) => {
    try {
      const response = await api.get(
        `/messages/employer/${employerId}/unread-count`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get unread messages for employer
  getUnreadMessages: async (employerId, limit = 10) => {
    try {
      const response = await api.get(
        `/messages/employer/${employerId}/unread?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark all messages as read for employer
  markAllMessagesAsRead: async (employerId) => {
    try {
      console.log(
        `🔍 Web client calling markAllMessagesAsRead for employerId: ${employerId}`
      );
      const response = await api.put(
        `/messages/employer/mark-all-read/${employerId}`
      );
      console.log(
        `✅ Web client markAllMessagesAsRead response:`,
        response.data
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Web client markAllMessagesAsRead error:`, error);
      throw error.response?.data || error.message;
    }
  },

  // Validate messaging permission
  validateMessagingPermission: async (employerId, userId, jobId) => {
    try {
      const response = await api.post("/messages/validate-permission", {
        userId: userId,
        employerId: employerId,
        jobId: jobId,
        userType: "Employer",
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Legacy method for backward compatibility
  getMessagesBetweenUsers: async (employerId, userId, jobId) => {
    return await messageAPI.getConversationHistory(employerId, userId, jobId);
  },
};

// Employer API methods
export const employerAPI = {
  updatePricingPlan: async (pricingPlan, empId) => {
    try {
      const response = await api.patch("/employer/updatePricingPlan", {
        pricingPlan,
        empId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/employer/updateProfile", profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export const jobAPI = {
  createJob: async (jobData, maxUsers = 500) => {
    try {
      // Add maxUsers to jobData if not already present
      const jobDataWithMaxUsers = {
        ...jobData,
        maxUsers: maxUsers,
      };

      const response = await api.post("/jobs", jobDataWithMaxUsers);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAllJobs: async () => {
    try {
      const response = await api.get("/jobs");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyPostedJobs: async () => {
    try {
      const response = await api.get("/jobs/my/posted");
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

  applyForJob: async (
    jobId,
    questionResponses = [],
    selectedResume = null,
    selectedCoverLetter = null
  ) => {
    try {
      const requestBody = { questionResponses };

      // Add resume and cover letter information if provided
      if (selectedResume) {
        requestBody.selectedResume = selectedResume;
      }

      if (selectedCoverLetter) {
        requestBody.selectedCoverLetter = selectedCoverLetter;
      }

      console.log("Website API applyForJob sending:", {
        jobId,
        requestBody,
        questionResponsesLength: questionResponses?.length || 0,
      });

      const response = await api.post(`/jobs/${jobId}/apply`, requestBody);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateApplicationStatus: async (
    jobId,
    applicationId,
    status,
    additionalData = {}
  ) => {
    try {
      const requestData = {
        status,
        ...additionalData,
      };

      const response = await api.put(
        `/jobs/${jobId}/applications/${applicationId}`,
        requestData
      );
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
  },

  getApplicationResponses: async (jobId) => {
    try {
      const response = await api.get(`/jobs/${jobId}/responses`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserApplicationResponse: async (jobId) => {
    try {
      const response = await api.get(`/jobs/${jobId}/my-response`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getJobRecommendations: async () => {
    try {
      const response = await api.get("/jobs/recommendations");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getJobCategories: async () => {
    try {
      const response = await api.get("/jobs/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getJobSubcategories: async (category) => {
    try {
      const response = await api.get(
        `/jobs/categories/${encodeURIComponent(category)}/subcategories`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getJobStatistics: async () => {
    try {
      const response = await api.get("/jobs/statistics");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getSavedJobs: async () => {
    try {
      const response = await api.get("/jobs/saved");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getMyApplications: async () => {
    try {
      const response = await api.get("/jobs/my/applications");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  saveJob: async (jobId, action) => {
    try {
      const response = await api.put(`/jobs/${jobId}/save`, { action });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Contact API methods
export const contactAPI = {
  submitContactForm: async (contactData) => {
    try {
      const response = await api.post("/contact/submit", contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Admin methods (for future use)
  getAllContacts: async (params = {}) => {
    try {
      const response = await api.get("/contact/admin/all", { params });
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
      const response = await api.put(
        `/contact/admin/${contactId}/status`,
        statusData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getContactDashboard: async () => {
    try {
      const response = await api.get("/contact/admin/dashboard");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api; 
