import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobAPI } from '../services/api';
import { toast } from 'react-toastify';
import CONFIG from '../../config/config.js';

// Query keys for consistent cache management
export const jobKeys = {
  all: ['jobs'],
  lists: () => [...jobKeys.all, 'list'],
  list: (filters) => [...jobKeys.lists(), { filters }],
  details: () => [...jobKeys.all, 'detail'],
  detail: (id) => [...jobKeys.details(), id],
  myJobs: () => [...jobKeys.all, 'myJobs'],
  categories: () => [...jobKeys.all, 'categories'],
  subcategories: (category) => [...jobKeys.categories(), category],
  savedJobs: () => [...jobKeys.all, 'saved'],
  myApplications: () => [...jobKeys.all, 'applications'],
};

// Get all jobs
export const useJobs = (filters = {}) => {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => jobAPI.getAllJobs(),
    select: (data) => data?.success ? data.jobs : [],
    staleTime: 2 * 60 * 1000, // 2 minutes for job listings
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (authentication issues)
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Get my posted jobs
export const useMyPostedJobs = () => {
  return useQuery({
    queryKey: jobKeys.myJobs(),
    queryFn: () => jobAPI.getMyPostedJobs(),
    select: (data) => data?.success ? data.jobs : [],
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (authentication issues)
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Get job details
export const useJobDetails = (jobId) => {
  return useQuery({
    queryKey: jobKeys.detail(jobId),
    queryFn: () => jobAPI.getJobDetails(jobId),
    select: (data) => data?.success ? data.job : null,
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000, // 5 minutes for job details
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 404 errors (job not found)
      if (error?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Get job recommendations for users
export const useJobRecommendations = () => {
  return useQuery({
    queryKey: [...jobKeys.all, 'recommendations'],
    queryFn: () => jobAPI.getJobRecommendations(),
    select: (data) => data?.success ? data.jobs : [],
    staleTime: 3 * 60 * 1000, // 3 minutes for recommendations
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (authentication issues)
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Get job categories (for job posting form) - now using config file
export const useJobCategories = () => {
  return useQuery({
    queryKey: jobKeys.categories(),
    queryFn: () => {
      return Promise.resolve({
        success: true,
        categories: Object.keys(CONFIG.jobAdIndustries)
      });
    },
    select: (data) => data?.success ? data.categories : [],
    staleTime: Infinity, // Categories from config never change during runtime
    refetchOnWindowFocus: false,
    retry: false, // No retry needed for static data
  });
};

// Get job subcategories based on category - now using config file
export const useJobSubcategories = (category) => {
  return useQuery({
    queryKey: jobKeys.subcategories(category),
    queryFn: () => {
      const subcategories = CONFIG.jobAdIndustries[category] || [];
      return Promise.resolve({
        success: true,
        subcategories
      });
    },
    select: (data) => data?.success ? data.subcategories : [],
    enabled: !!category,
    staleTime: Infinity, // Subcategories from config never change during runtime
    refetchOnWindowFocus: false,
    retry: false, // No retry needed for static data
  });
};

// Get job statistics for dashboard
export const useJobStatistics = () => {
  return useQuery({
    queryKey: [...jobKeys.all, 'statistics'],
    queryFn: () => jobAPI.getJobStatistics(),
    select: (data) => data?.success ? data.statistics : null,
    staleTime: 5 * 60 * 1000, // 5 minutes for statistics
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (authentication issues)
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Get saved jobs
export const useSavedJobs = () => {
  return useQuery({
    queryKey: jobKeys.savedJobs(),
    queryFn: () => jobAPI.getSavedJobs(),
    select: (data) => data?.success ? data.jobs : [],
    staleTime: 2 * 60 * 1000, // 2 minutes for saved jobs
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (authentication issues)
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Get my applications
export const useMyApplications = () => {
  return useQuery({
    queryKey: jobKeys.myApplications(),
    queryFn: () => jobAPI.getMyApplications(),
    select: (data) => data?.success ? data.applications : [],
    staleTime: 2 * 60 * 1000, // 2 minutes for applications
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors (authentication issues)
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobData) => jobAPI.createJob(jobData),
    onSuccess: () => {
      // Invalidate and refetch jobs
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      // Don't show toast here since we handle it in the component after payment
    },
    onError: (error) => {
      const message = error?.message || 'Failed to create job';
      toast.error(message);
    },
  });
};

// Update job status mutation
export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, status }) => jobAPI.updateJobStatus(jobId, status),
    onMutate: async ({ jobId, status }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(jobId) });
      
      // Snapshot the previous value
      const previousJob = queryClient.getQueryData(jobKeys.detail(jobId));
      
      // Optimistically update the job status
      queryClient.setQueryData(jobKeys.detail(jobId), (old) => {
        if (!old) return old;
        return {
          ...old,
          job: { ...old.job, status }
        };
      });
      
      // Return a context object with the snapshotted value
      return { previousJob };
    },
    onSuccess: (data, { jobId }) => {
      // Invalidate job lists to refresh them
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      queryClient.invalidateQueries({ queryKey: jobKeys.myJobs() });
      
      toast.success('Job status updated successfully!');
    },
    onError: (error, { jobId }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(jobId), context.previousJob);
      }
      
      const message = error?.message || 'Failed to update job status';
      toast.error(message);
    },
    onSettled: (data, error, { jobId }) => {
      // Always refetch after error or success to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    },
  });
};

// Update application status mutation
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, applicationId, status, additionalData = {} }) => 
      jobAPI.updateApplicationStatus(jobId, applicationId, status, additionalData),
    onMutate: async ({ jobId, applicationId, status }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(jobId) });
      
      // Snapshot the previous value
      const previousJob = queryClient.getQueryData(jobKeys.detail(jobId));
      
      // Optimistically update the application status
      queryClient.setQueryData(jobKeys.detail(jobId), (old) => {
        if (!old?.job?.applicants) return old;
        
        const updatedApplicants = old.job.applicants.map(applicant => 
          applicant._id === applicationId 
            ? { ...applicant, status }
            : applicant
        );
        
        return {
          ...old,
          job: {
            ...old.job,
            applicants: updatedApplicants
          }
        };
      });
      
      // Return a context object with the snapshotted value
      return { previousJob };
    },
    onSuccess: (data, { jobId, applicationId, status }) => {
      // Invalidate my jobs to refresh applicant statuses
      queryClient.invalidateQueries({ queryKey: jobKeys.myJobs() });
      
      toast.success('Application status updated successfully!');
    },
    onError: (error, { jobId, applicationId, status }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(jobId), context.previousJob);
      }
      
      const message = error?.message || 'Failed to update application status';
      toast.error(message);
    },
    onSettled: (data, error, { jobId }) => {
      // Always refetch after error or success to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    },
  });
};

// Apply for job mutation
export const useApplyForJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, questionResponses = [], selectedResume = null, selectedCoverLetter = null }) => 
      jobAPI.applyForJob(jobId, questionResponses, selectedResume, selectedCoverLetter),
    onMutate: async ({ jobId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(jobId) });
      
      // Snapshot the previous value
      const previousJob = queryClient.getQueryData(jobKeys.detail(jobId));
      
      // Optimistically update the job to show as applied
      queryClient.setQueryData(jobKeys.detail(jobId), (old) => {
        if (!old?.job) return old;
        
        return {
          ...old,
          job: {
            ...old.job,
            hasApplied: true,
            applicationStatus: 'pending'
          }
        };
      });
      
      // Return a context object with the snapshotted value
      return { previousJob };
    },
    onSuccess: (data, { jobId }) => {
      // Invalidate job lists to refresh them
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      queryClient.invalidateQueries({ queryKey: jobKeys.myJobs() });
      
      toast.success('Application submitted successfully!');
    },
    onError: (error, { jobId }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(jobId), context.previousJob);
      }
      
      const message = error?.message || 'Failed to submit application';
      toast.error(message);
    },
    onSettled: (data, error, { jobId }) => {
      // Always refetch after error or success to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    },
  });
};

// Save/unsave job mutation
export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, action }) => jobAPI.saveJob(jobId, action),
    onMutate: async ({ jobId, action }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(jobId) });
      await queryClient.cancelQueries({ queryKey: jobKeys.savedJobs() });
      
      // Snapshot the previous values
      const previousJob = queryClient.getQueryData(jobKeys.detail(jobId));
      const previousSavedJobs = queryClient.getQueryData(jobKeys.savedJobs());
      
      // Optimistically update the job to show as saved/unsaved
      queryClient.setQueryData(jobKeys.detail(jobId), (old) => {
        if (!old?.job) return old;
        
        return {
          ...old,
          job: {
            ...old.job,
            isSaved: action === 'save'
          }
        };
      });
      
      // Optimistically update saved jobs list
      if (action === 'save') {
        queryClient.setQueryData(jobKeys.savedJobs(), (old) => {
          if (!old) return old;
          return [...old, previousJob?.job];
        });
      } else {
        queryClient.setQueryData(jobKeys.savedJobs(), (old) => {
          if (!old) return old;
          return old.filter(job => job._id !== jobId);
        });
      }
      
      // Return a context object with the snapshotted values
      return { previousJob, previousSavedJobs };
    },
    onSuccess: (data, { jobId, action }) => {
      toast.success(action === 'save' ? 'Job saved successfully!' : 'Job removed from saved jobs!');
    },
    onError: (error, { jobId, action }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(jobId), context.previousJob);
      }
      if (context?.previousSavedJobs) {
        queryClient.setQueryData(jobKeys.savedJobs(), context.previousSavedJobs);
      }
      
      const message = error?.message || `Failed to ${action} job`;
      toast.error(message);
    },
    onSettled: (data, error, { jobId }) => {
      // Always refetch after error or success to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
      queryClient.invalidateQueries({ queryKey: jobKeys.savedJobs() });
    },
  });
};