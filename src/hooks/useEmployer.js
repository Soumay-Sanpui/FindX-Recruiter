import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employerAPI } from '../services/api';
import api from '../services/api';
import { toast } from 'react-toastify';

// Query keys for employer operations
export const employerKeys = {
  all: ['employer'],
  profile: () => [...employerKeys.all, 'profile'],
  users: () => [...employerKeys.all, 'users'],
  userSearch: (params) => [...employerKeys.users(), 'search', params],
  userProfile: (userId) => [...employerKeys.users(), 'profile', userId],
};

// Update pricing plan mutation
export const useUpdatePricingPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pricingPlan, empId }) => employerAPI.updatePricingPlan(pricingPlan, empId),
    onSuccess: (data) => {
      // Invalidate employer profile to refresh data
      queryClient.invalidateQueries({ queryKey: employerKeys.profile() });
      toast.success('Pricing plan updated successfully!');
    },
    onError: (error) => {
      const message = error?.message || 'Failed to update pricing plan';
      toast.error(message);
    },
  });
};

// Search users hook
export const useSearchUsers = (searchParams, enabled = true) => {
  const token = localStorage.getItem('employerToken');
  
  return useQuery({
    queryKey: employerKeys.userSearch(searchParams),
    queryFn: async () => {
      const { keyword, skills, location, languages, qualifications, jobTypes, workEnv, page = 1 } = searchParams;
      
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.append('keyword', keyword);
      if (skills) queryParams.append('skills', skills);
      if (location) queryParams.append('location', location);
      if (languages?.length) queryParams.append('languages', languages.join(','));
      if (qualifications?.length) queryParams.append('qualifications', qualifications.join(','));
      if (jobTypes?.length) queryParams.append('jobTypes', jobTypes.join(','));
      if (workEnv?.length) queryParams.append('workEnv', workEnv.join(','));
      queryParams.append('page', page.toString());
      
      try {
        const response = await api.get(`/user-search?${queryParams}`);
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Search failed');
        }
        
        return response.data;
      } catch (error) {
        console.error('Search users error:', error);
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('employerToken');
          localStorage.removeItem('employer');
          throw new Error('Authentication expired. Please log in again.');
        }
        throw error;
      }
    },
    select: (data) => ({
      users: data?.users || [],
      totalPages: data?.totalPages || 1,
      currentPage: data?.currentPage || 1,
      totalUsers: data?.totalUsers || 0,
      count: data?.count || 0,
    }),
    enabled: enabled && !!token,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
};

// Get suggested users
export const useSuggestedUsers = () => {
  const token = localStorage.getItem('employerToken');
  
  return useQuery({
    queryKey: [...employerKeys.users(), 'suggested'],
    queryFn: async () => {
      try {
        const response = await api.get('/user-search/suggested');
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch suggested users');
        }
        
        return response.data;
      } catch (error) {
        console.error('Suggested users error:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('employerToken');
          localStorage.removeItem('employer');
          throw new Error('Authentication expired. Please log in again.');
        }
        throw error;
      }
    },
    select: (data) => data?.users || [],
    enabled: !!token,
    staleTime: 10 * 60 * 1000, // 10 minutes for suggested users
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
};

// Get user profile
export const useUserProfile = (userId) => {
  const token = localStorage.getItem('employerToken');
  
  return useQuery({
    queryKey: employerKeys.userProfile(userId),
    queryFn: async () => {
      try {
        const response = await api.get(`/user-search/${userId}`);
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch user profile');
        }
        
        return response.data;
      } catch (error) {
        console.error('User profile error:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('employerToken');
          localStorage.removeItem('employer');
          throw new Error('Authentication expired. Please log in again.');
        }
        throw error;
      }
    },
    select: (data) => data?.success ? data.user : null,
    enabled: !!(userId && token),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}; 