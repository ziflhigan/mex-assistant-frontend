import React, { useState } from 'react';
import { useChatContext } from '../../contexts/ChatContext';
import useChatApi from '../../hooks/useChatApi';
import { useTranslation } from 'react-i18next';
// Input box and send button for user to type new messages
export default function ChatInput() {
    const { language } = useChatContext();
    const { sendMessage } = useChatApi();
    const { t } = useTranslation();
    const [message, setMessage] = useState('');

    // Placeholder text adjusts based on current language selection
    const placeholders = {
        en: 'Type a message...',
        es: 'Escribe un mensaje...',
        fr: 'Tapez un message...'
    };
    const placeholderText = placeholders[language] || 'Type a message...';

    // Handle send on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            sendMessage(message);
            setMessage('');  // clear input after sending
        }
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input
                type="text"
                className="chat-input-field"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('placeholder')}
                aria-label="Type a message"
            />
            <button 
                type="submit" 
                className="chat-send-btn" 
                aria-label="Send message"
            >
                {t('send')} 
            </button>
        </form>
    );
}   
