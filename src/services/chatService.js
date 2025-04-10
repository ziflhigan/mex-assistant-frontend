// src/services/chatService.js

import api from './apiConfig';

const chatService = {
  sendMessage: async (message) => {
    try {
      const response = await api.post('/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default chatService;