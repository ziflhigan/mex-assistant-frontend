import React, { createContext, useContext, useReducer, useEffect } from 'react';
import i18n from '../i18n/i18n'; // adjust path to your i18n config if needed

// Define initial state for chat context
const initialState = {
    messages: [{
        sender: 'assistant',
        type: 'text',
        content: "Hi there! I'm your MEX Assistant. How can I help you today?"
      }],
      loading: false,
      language: 'en'
};

// Define action types
const SEND_MESSAGE    = 'SEND_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const ADD_MESSAGE     = 'ADD_MESSAGE';
const CLEAR_MESSAGES  = 'CLEAR_MESSAGES';
const SET_LANGUAGE    = 'SET_LANGUAGE';

// Reducer function to handle state changes based on dispatched action
function chatReducer(state, action) {
    switch(action.type) {
        case SEND_MESSAGE: {
            const userContent = action.payload;
            const userMessage = {
                sender: 'user',
                type: 'text',
                content: userContent
            };
            return {
                ...state,
                messages: [...state.messages, userMessage],
                loading: true  // show typing indicator until assistant response arrives
            };
        }
        case ADD_MESSAGE: {
            // 这里确保 payload 为字符串或对象 { content: question }
            const content = typeof action.payload === 'string'
              ? action.payload
              : action.payload.content;
            const userMessage = {
                sender: 'user',
                type: 'text',
                content: content
            };
            return {
                ...state,
                messages: [...state.messages, userMessage],
                loading: true
            };
        }
        
        case RECEIVE_MESSAGE: {
            const assistantMessage = action.payload;
            return {
                ...state,
                messages: [...state.messages, assistantMessage],
                loading: false  // hide typing indicator when response is received
            };
        }
        case CLEAR_MESSAGES: {
            return {
                ...state,
                messages: [
                    {
                        sender: 'assistant',
                        type: 'text',
                        content: "I still there! I'm your MEX Assistant. What others can I help you?"
                      }
                ],
                // retain current language, reset loading implicitly to false
            };
        }
        case SET_LANGUAGE: {
            return {
                ...state,
                language: action.payload
            };
        }
        default:
            return state;
    }
}

// Create the context
const ChatContext = createContext(null);

// Provider component to wrap around the chat UI (makes chat state available to children)
export function ChatProvider({ children }) {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    // Whenever the selected language changes, update the i18n configuration (if i18n is set up)
    useEffect(() => {
        if(i18n && state.language) {
            i18n.changeLanguage(state.language);
        }
    }, [state.language]);

    // Helper action dispatchers for convenience
    const clearChat   = () => dispatch({ type: CLEAR_MESSAGES });
    const setLanguage = (lang) => dispatch({ type: SET_LANGUAGE, payload: lang });

    // Context value provides state and actions to consumers
    const value = {
        messages: state.messages,
        loading: state.loading,
        language: state.language,
        dispatch,
        clearChat,
        setLanguage
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

// Custom hook to use the ChatContext (for accessing chat state in components)
export function useChatContext() {
    const context = useContext(ChatContext);
    if (context === null) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}
