import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobAPI } from '../services/api';
import { toast } from 'react-toastify';

// Query keys for consistent cache management
export const jobKeys = {
  all: ['jobs'],
  lists: () => [...jobKeys.all, 'list'],
  list: (filters) => [...jobKeys.lists(), { filters }],
  details: () => [...jobKeys.all, 'detail'],
  detail: (id) => [...jobKeys.details(), id],
  myJobs: () => [...jobKeys.all, 'myJobs'],
};

// Get all jobs
export const useJobs = (filters = {}) => {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => jobAPI.getAllJobs(),
    select: (data) => data?.success ? data.jobs : [],
    staleTime: 2 * 60 * 1000, // 2 minutes for job listings
  });
};

// Get my posted jobs
export const useMyPostedJobs = () => {
  return useQuery({
    queryKey: jobKeys.myJobs(),
    queryFn: () => jobAPI.getMyPostedJobs(),
    select: (data) => data?.success ? data.jobs : [],
    staleTime: 1 * 60 * 1000, // 1 minute for my jobs
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
  });
};



// Create job mutation
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobData) => jobAPI.createJob(jobData),
    onSuccess: (data) => {
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
    onSuccess: (data, { jobId }) => {
      // Update the specific job in cache
      queryClient.setQueryData(jobKeys.detail(jobId), (old) => {
        if (!old) return old;
        return {
          ...old,
          job: { ...old.job, status }
        };
      });
      
      // Invalidate job lists to refresh them
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      queryClient.invalidateQueries({ queryKey: jobKeys.myJobs() });
      
      toast.success('Job status updated successfully!');
    },
    onError: (error) => {
      const message = error?.message || 'Failed to update job status';
      toast.error(message);
    },
  });
};

// Update application status mutation
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, applicationId, status, additionalData = {} }) => 
      jobAPI.updateApplicationStatus(jobId, applicationId, status, additionalData),
    onSuccess: (data, { jobId, applicationId, status }) => {
      // Update the job details cache with new application status
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
      
      // Invalidate my jobs to refresh applicant statuses
      queryClient.invalidateQueries({ queryKey: jobKeys.myJobs() });
      
      toast.success('Application status updated successfully!');
    },
    onError: (error) => {
      const message = error?.message || 'Failed to update application status';
      toast.error(message);
    },
  });
};

 