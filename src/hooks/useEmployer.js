import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employerAPI } from '../services/api';
import axios from 'axios';
import CONFIG from '../../config/config';
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
      
      const response = await axios.get(`${CONFIG.apiUrl}/usersearch?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    },
    select: (data) => ({
      users: data?.users || [],
      totalPages: data?.totalPages || 1,
      currentPage: data?.currentPage || 1,
      totalUsers: data?.totalUsers || 0,
    }),
    enabled: enabled && !!token,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get suggested users
export const useSuggestedUsers = () => {
  const token = localStorage.getItem('employerToken');
  
  return useQuery({
    queryKey: [...employerKeys.users(), 'suggested'],
    queryFn: async () => {
      const response = await axios.get(`${CONFIG.apiUrl}/usersearch/suggested`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    select: (data) => data?.users || [],
    enabled: !!token,
    staleTime: 10 * 60 * 1000, // 10 minutes for suggested users
  });
};

// Get user profile
export const useUserProfile = (userId) => {
  const token = localStorage.getItem('employerToken');
  
  return useQuery({
    queryKey: employerKeys.userProfile(userId),
    queryFn: async () => {
      const response = await axios.get(`${CONFIG.apiUrl}/usersearch/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    select: (data) => data?.success ? data.user : null,
    enabled: !!(userId && token),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 