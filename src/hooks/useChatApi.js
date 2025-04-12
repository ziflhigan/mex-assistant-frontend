import { useCallback } from 'react';
import { useChatContext } from '../contexts/ChatContext';
import { getMockChatResponse } from '../services/mockService';

/**
 * Custom hook for handling chat API interactions
 * Abstracts away the API details from the UI components
 */
const useChatApi = () => {
    const {
        dispatch,
        merchant,
        timeFilter,
        setLanguage,
        language
    } = useChatContext();

    /**
     * Send a message and handle the response
     * This simulates the LLM agent pattern described in the documentation
     */
    const sendMessage = useCallback(async (messageText) => {
        if (!messageText.trim()) return;

        // Add user message to chat
        dispatch({ type: 'SEND_MESSAGE', payload: messageText });

        try {
            // Check for language change commands
            if (messageText.toLowerCase().startsWith('/language') ||
                messageText.toLowerCase().startsWith('/lang')) {
                const langCode = messageText.split(' ')[1];
                if (langCode) {
                    setLanguage(langCode);

                    // Send confirmation message
                    dispatch({
                        type: 'RECEIVE_MESSAGE',
                        payload: {
                            sender: 'assistant',
                            type: 'text',
                            content: `Language changed to ${langCode}`
                        }
                    });
                    return;
                }
            }

            // Otherwise, process with the agent (either real or mock)
            // The actual agent handler implementation is in ChatContext.jsx

            // For a real implementation, we would fetch from an API
            // const response = await api.processMessage({
            //   message: messageText,
            //   merchantId: merchant.id,
            //   timeFilter,
            //   language
            // });

            // Mock API just simulates the calls that would be made to LangChain
            // and returns a response. This makes testing easier during development.
            const response = await getMockChatResponse(
                messageText,
                merchant.id,
                timeFilter
            );

            // The response is handled automatically by the ChatContext provider

        } catch (error) {
            console.error('Error sending message:', error);

            // Send error message
            dispatch({
                type: 'RECEIVE_MESSAGE',
                payload: {
                    sender: 'assistant',
                    type: 'text',
                    content: 'Sorry, I encountered an error. Please try again later.'
                }
            });
        }
    }, [dispatch, merchant.id, timeFilter, setLanguage, language]);

    return {
        sendMessage
    };
};

export default useChatApi;