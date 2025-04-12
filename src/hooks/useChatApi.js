import { useChatContext } from '../contexts/ChatContext';
import chatService from '../services/chatService';

// Custom hook to handle sending messages and receiving assistant replies
export default function useChatApi() {
    const { dispatch, language } = useChatContext();

    // Send a new user message and handle the assistant's response
    const sendMessage = async (userMessage) => {
        if (!userMessage || userMessage.trim() === '') {
            return; // ignore empty messages
        }
        const content = userMessage.trim();
        // Dispatch the user message to context (adds it to chat and shows typing indicator)
        dispatch({ type: 'SEND_MESSAGE', payload: content });
        try {
            // Call chat service to get the assistant's response (simulate API call)
            const assistantResponse = await chatService.sendMessage(content, language);
            // Dispatch the assistant's message to context (adds message and hides typing indicator)
            dispatch({ type: 'RECEIVE_MESSAGE', payload: assistantResponse });
        } catch (error) {
            console.error('Error sending message:', error);
            // On error, dispatch a fallback error message from assistant
            dispatch({
                type: 'RECEIVE_MESSAGE',
                payload: { sender: 'assistant', type: 'text', content: 'Oops, something went wrong.' }
            });
        }
    };

    return { sendMessage };
}
