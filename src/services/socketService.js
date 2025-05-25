import { io } from 'socket.io-client';
import { useEmployerStore } from '../store/employer.store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    this.socket = io(API_URL);
    
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      
      // Join with employer info when socket connects
      const employer = useEmployerStore.getState().employer;
      if (employer && employer._id) {
        this.joinUser(employer._id, 'Employer');
      }
    });
    
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
    
    this.initialized = true;
  }

  joinUser(userId, userType) {
    if (!this.socket) this.init();
    this.socket.emit('join', { userId, userType });
  }

  sendMessage(messageData) {
    if (!this.socket) this.init();
    this.socket.emit('sendMessage', messageData);
  }

  getConversation(userId1, userId2, jobId) {
    if (!this.socket) this.init();
    this.socket.emit('getConversation', { userId1, userId2, jobId });
  }

  getUserConversations(userId, userType) {
    if (!this.socket) this.init();
    this.socket.emit('getUserConversations', { userId, userType });
  }

  markAsRead(messageId) {
    if (!this.socket) this.init();
    this.socket.emit('markAsRead', { messageId });
  }

  onReceiveMessage(callback) {
    if (!this.socket) this.init();
    this.socket.on('receiveMessage', callback);
    return () => this.socket.off('receiveMessage', callback);
  }

  onMessageSent(callback) {
    if (!this.socket) this.init();
    this.socket.on('messageSent', callback);
    return () => this.socket.off('messageSent', callback);
  }

  onConversationHistory(callback) {
    if (!this.socket) this.init();
    this.socket.on('conversationHistory', callback);
    return () => this.socket.off('conversationHistory', callback);
  }

  onUserConversations(callback) {
    if (!this.socket) this.init();
    this.socket.on('userConversations', callback);
    return () => this.socket.off('userConversations', callback);
  }

  onUserStatus(callback) {
    if (!this.socket) this.init();
    this.socket.on('userStatus', callback);
    return () => this.socket.off('userStatus', callback);
  }

  onMessageError(callback) {
    if (!this.socket) this.init();
    this.socket.on('messageError', callback);
    return () => this.socket.off('messageError', callback);
  }

  onConversationError(callback) {
    if (!this.socket) this.init();
    this.socket.on('conversationError', callback);
    return () => this.socket.off('conversationError', callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.initialized = false;
    }
  }
}

// Export as singleton
export default new SocketService(); 