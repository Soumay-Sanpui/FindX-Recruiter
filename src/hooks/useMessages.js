import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageAPI } from '../services/api';
import { toast } from 'react-toastify';

// Query keys for messages
export const messageKeys = {
  all: ['messages'],
  conversations: () => [...messageKeys.all, 'conversations'],
  conversation: (employerId, userId) => [...messageKeys.conversations(), { employerId, userId }],
};

// Get messages between users (no automatic polling)
export const useMessagesBetweenUsers = (employerId, userId) => {
  return useQuery({
    queryKey: messageKeys.conversation(employerId, userId),
    queryFn: () => messageAPI.getMessagesBetweenUsers(employerId, userId),
    select: (data) => data?.success ? data.messages : [],
    enabled: !!(employerId && userId),
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer since no auto-polling
    // refetchInterval removed - no automatic polling
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