import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageAPI } from '../services/api';
import { toast } from 'react-toastify';

// Query keys for messages
export const messageKeys = {
  all: ['messages'],
  conversations: () => [...messageKeys.all, 'conversations'],
  conversation: (employerId, userId) => [...messageKeys.conversations(), { employerId, userId }],
};

// Get messages between users
export const useMessagesBetweenUsers = (employerId, userId) => {
  return useQuery({
    queryKey: messageKeys.conversation(employerId, userId),
    queryFn: () => messageAPI.getMessagesBetweenUsers(employerId, userId),
    select: (data) => data?.success ? data.messages : [],
    enabled: !!(employerId && userId),
    staleTime: 30 * 1000, // 30 seconds for real-time messaging
    refetchInterval: 5000, // Refetch every 5 seconds for live updates
  });
};

// Send message mutation
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageData) => messageAPI.sendMessage(messageData),
    onSuccess: (data, messageData) => {
      // Update the conversation cache optimistically
      const { from, to } = messageData;
      const conversationKey = messageKeys.conversation(from, to);
      
      queryClient.setQueryData(conversationKey, (old) => {
        if (!old) return [data];
        return [...old, data];
      });
      
      // Also update the reverse conversation key if it exists
      const reverseConversationKey = messageKeys.conversation(to, from);
      queryClient.setQueryData(reverseConversationKey, (old) => {
        if (!old) return [data];
        return [...old, data];
      });
    },
    onError: (error) => {
      const message = error?.message || 'Failed to send message';
      toast.error(message);
    },
  });
}; 