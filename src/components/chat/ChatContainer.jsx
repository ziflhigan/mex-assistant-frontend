import React, { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Loader from '../common/Loader';

/**
 * Temporary ChatContainer placeholder component
 * Shows a basic chat interface with sample messages
 */
const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your MEX Assistant. How can I help you with your business today? You can ask about sales trends, inventory suggestions, or operational insights.", sender: 'assistant', time: '10:30 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sample responses based on keywords
  const getSampleResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sales') || lowerMessage.includes('revenue')) {
      return "Your total sales for this week are $8,245.50, which is 12.5% higher than last week. Friday was your highest-grossing day with $1,587.30 in sales.";
    } 
    else if (lowerMessage.includes('top') && (lowerMessage.includes('item') || lowerMessage.includes('selling'))) {
      return "Your top selling items this week are Double Patty Burger (87 orders), Crispy Chicken Sandwich (65 orders), and Regular Fries (59 orders). The Double Patty Burger has shown a 12.4% increase in sales compared to last week.";
    }
    else if (lowerMessage.includes('busy') || lowerMessage.includes('peak') || lowerMessage.includes('hour')) {
      return "Your busiest hours are from 12:00 PM to 2:00 PM, with peak orders around 12:30 PM. You also have a smaller evening peak from 6:00 PM to 8:00 PM. Consider scheduling additional staff during these hours to improve service efficiency.";
    }
    else {
      return "I can help you analyze your business performance. Try asking about sales trends, top selling items, peak hours, operational efficiency, or search trends in your area.";
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate assistant typing and response
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        text: getSampleResponse(inputValue),
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  // Handle pressing Enter in the input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Handle clearing chat
  const handleClearChat = () => {
    setMessages([{
      id: 1,
      text: "Hi there! I'm your MEX Assistant. How can I help you with your business today?",
      sender: 'assistant',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  return (
    <div className="chat-container" style={{ 
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      height: 'calc(100vh - var(--header-height, 60px) - 40px)',
      backgroundColor: 'white',
      borderRadius: 'var(--border-radius, 10px)',
      boxShadow: 'var(--card-shadow, 0 4px 6px rgba(0, 0, 0, 0.1))'
    }}>
      {/* Chat Header */}
      <div style={{ 
        padding: '20px', 
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '50px',
            height: '50px',
            backgroundColor: 'var(--grab-green, #00b14f)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '15px'
          }}>
            <i className="fas fa-robot" style={{ color: 'white', fontSize: '24px' }}></i>
          </div>
          <div>
            <h2 style={{ fontSize: '20px', margin: 0, marginBottom: '5px' }}>MEX Assistant</h2>
            <p style={{ fontSize: '14px', color: '#777', margin: 0 }}>AI-powered business insights for your restaurant</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div>
            <select 
              value={selectedLanguage}
              onChange={handleLanguageChange}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                backgroundColor: 'white',
                color: 'var(--grab-dark-gray, #4a4a4a)',
                fontSize: '14px'
              }}
            >
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="ms">Bahasa Melayu</option>
              <option value="th">Thai</option>
              <option value="vi">Vietnamese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          
          <button 
            onClick={handleClearChat}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div style={{
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map(message => (
          <div 
            key={message.id}
            style={{
              maxWidth: '70%',
              marginBottom: '15px',
              padding: '12px 15px',
              borderRadius: '10px',
              alignSelf: message.sender === 'assistant' ? 'flex-start' : 'flex-end',
              backgroundColor: message.sender === 'assistant' ? '#f0f0f0' : 'var(--grab-green, #00b14f)',
              color: message.sender === 'assistant' ? '#333' : 'white',
              borderTopLeftRadius: message.sender === 'assistant' ? 0 : '10px',
              borderTopRightRadius: message.sender === 'assistant' ? '10px' : 0
            }}
          >
            <p style={{ margin: 0, lineHeight: 1.5 }}>{message.text}</p>
            <div style={{ 
              fontSize: '11px', 
              color: message.sender === 'assistant' ? '#777' : 'rgba(255, 255, 255, 0.8)',
              marginTop: '5px',
              textAlign: 'right'
            }}>
              {message.time}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{
            maxWidth: '70%',
            marginBottom: '15px',
            padding: '12px 15px',
            borderRadius: '10px',
            alignSelf: 'flex-start',
            backgroundColor: '#f0f0f0',
            borderTopLeftRadius: 0
          }}>
            <Loader size="small" />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div style={{
        padding: '15px 20px',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center'
      }}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something about your business..."
          style={{
            flex: 1,
            padding: '12px 15px',
            borderRadius: '24px',
            border: '1px solid #e0e0e0',
            marginRight: '10px',
            fontSize: '14px'
          }}
        />
        <button 
          onClick={handleSendMessage}
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: 'var(--grab-green, #00b14f)',
            color: 'white',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;