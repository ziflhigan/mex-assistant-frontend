import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, loading, setLoading }}>
      {children}
    </ChatContext.Provider>
  );
};