import React, { useState, useEffect } from 'react';
import { useChatContext } from '../../contexts/ChatContext';
import { useTranslation } from 'react-i18next';

// Enhanced component for suggested questions with animations and context-awareness
const SuggestedQuestions = () => {
  const { sendMessage, merchantData, timeFilter, merchant, messages } = useChatContext();
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState([]);

  // Generate suggestions based on current context
  useEffect(() => {
    // Base suggestions that are always relevant
    const baseSuggestions = [
      `Show me this ${timeFilter.toLowerCase()}'s sales trend`,
      'What are my top selling products?',
      `How is my average order value compared to last ${timeFilter.toLowerCase()}?`,
      'Any recommendations to improve efficiency?'
    ];

    // Dynamic suggestions based on merchant data
    let dynamicSuggestions = [];

    if (merchantData) {
      // Add hourly suggestion if we have hourly data
      if (merchantData.hourlySales && merchantData.hourlySales.length > 0) {
        dynamicSuggestions.push('What are the busiest hours today?');
      }

      // Add insights-related question if we have insights
      if (merchantData.aiInsights && merchantData.aiInsights.length > 0) {
        dynamicSuggestions.push('What insights do you have for my business?');
      }

      // Add product-specific question if we have top items
      if (merchantData.topItems && merchantData.topItems.length > 0) {
        const topItem = merchantData.topItems[0];
        dynamicSuggestions.push(`How is ${topItem.name} performing?`);
      }
    }

    // Combine and limit to 5 suggestions
    const allSuggestions = [...baseSuggestions, ...dynamicSuggestions];

    // Don't suggest questions that have already been asked
    const askedQuestions = messages
        .filter(msg => msg.sender === 'user')
        .map(msg => msg.content.toLowerCase());

    const filteredSuggestions = allSuggestions.filter(suggestion => {
      return !askedQuestions.some(asked =>
          suggestion.toLowerCase().includes(asked) ||
          asked.includes(suggestion.toLowerCase())
      );
    });

    // Limit to 4 suggestions
    setSuggestions(filteredSuggestions.slice(0, 4));
  }, [merchantData, timeFilter, merchant, messages]);

  // Stagger animation of suggestions
  const [visibleSuggestions, setVisibleSuggestions] = useState([]);

  useEffect(() => {
    setVisibleSuggestions([]);

    // Stagger the appearance of suggestions
    suggestions.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSuggestions(prev => [...prev, index]);
      }, index * 100);
    });
  }, [suggestions]);

  // Handle suggestion click
  const handleSuggestionClick = (question) => {
    sendMessage(question);
  };

  // Don't render if no suggestions
  if (suggestions.length === 0) return null;

  return (
      <div className="suggested-questions">
        <h4>{t('you may want to ask:')}</h4>
        <div className="suggestion-buttons">
          {suggestions.map((question, idx) => (
              <button
                  key={idx}
                  className={`suggestion-button ${visibleSuggestions.includes(idx) ? 'visible' : ''}`}
                  onClick={() => handleSuggestionClick(question)}
                  style={{
                    transitionDelay: `${idx * 0.1}s`,
                    opacity: visibleSuggestions.includes(idx) ? 1 : 0,
                    transform: visibleSuggestions.includes(idx)
                        ? 'translateY(0)'
                        : 'translateY(10px)'
                  }}
              >
            <span className="suggestion-icon">
              {idx === 0 && <i className="fas fa-chart-line"></i>}
              {idx === 1 && <i className="fas fa-trophy"></i>}
              {idx === 2 && <i className="fas fa-dollar-sign"></i>}
              {idx === 3 && <i className="fas fa-lightbulb"></i>}
            </span>
                <span className="suggestion-text">{question}</span>
              </button>
          ))}
        </div>
      </div>
  );
};

export default SuggestedQuestions;