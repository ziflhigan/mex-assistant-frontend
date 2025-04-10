// src/hooks/useChatApi.js
import { useState } from 'react';

const useChatApi = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // Here you would typically make an API call to your chat service
      // For this example, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call delay
      const response = { text: `You said: ${message}` }; // Replace with actual API response
      setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', content: response.text }]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error appropriately, e.g., display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
};

export default useChatApi;