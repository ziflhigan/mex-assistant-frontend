// src/components/chat/SuggestedQuestions.jsx
import React from 'react';
import { useChatContext } from '../../contexts/ChatContext';
import useChatApi from '../../hooks/useChatApi';
import LanguageSelector from './LanguageSelector';
const suggestionResponses = {
  "Show me this week's sales trend": {
    sender: 'assistant',
    type: 'chart',
    chartType: 'line',
    content: "Here is the weekly sales trend for this week:",
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [100, 150, 200, 180, 170, 190, 210],
      seriesName: 'Weekly Sales'
    }
  },
  "What are my top selling products?": {
    sender: 'assistant',
    type: 'table',
    content: "These are your top selling products:",
    data: {
      columns: ['Product', 'Units Sold'],
      rows: [
        ['Burger', 120],
        ['Fries', 90],
        ['Soda', 50]
      ]
    }
  },
  "How is my average order value compared to last week?": {
    sender: 'assistant',
    type: 'text',
    content: "Your average order value is $25.93, which is 3.7% higher than last week."
  },
  "Any recommendations to improve efficiency?": {
    sender: 'assistant',
    type: 'text',
    content: "I recommend reviewing your kitchen workflow during peak hours to identify any bottlenecks and adjust staff scheduling accordingly."
  },
  "What are the busiest hours today?": {
    sender: 'assistant',
    type: 'chart',
    chartType: 'bar',
    content: "Today's busiest hours are between 12:00 PM and 2:00 PM.",
    data: {
      labels: ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM'],
      values: [20, 45, 70, 68, 50, 30],
      seriesName: "Orders"
    }
  }
};

const fakeSuggestions = Object.keys(suggestionResponses);

export default function SuggestedQuestions() {
  const { dispatch } = useChatContext();
  const { sendMessage } = useChatApi();

  const handleSuggestionClick = (question) => {
    // 调用 sendMessage 方法直接处理用户消息和回复逻辑
    // 在 sendMessage 内部会先 dispatch 用户消息，然后经过延时 dispatch 助手回复
    // 此处可加上 console.log 调试
    console.log("Suggestion clicked:", question);
    sendMessage(question);
  };

  return (
    <div
      className="suggested-questions"
      style={{ margin: '10px 0', padding: '10px 15px', borderTop: '1px solid #ddd' }}
    >
      <h4 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '500' }}>Maybe you want ask:</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {fakeSuggestions.map((question, idx) => (
          <li
            key={idx}
            style={{
              padding: '8px 12px',
              marginBottom: '8px',
              border: '1px solid #eee',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onClick={() => handleSuggestionClick(question)}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
}
