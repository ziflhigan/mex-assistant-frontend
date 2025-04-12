import React, { useState, useRef, useEffect } from 'react';
import { useChatContext } from '../../contexts/ChatContext';
import { useTranslation } from 'react-i18next';

// Enhanced chat input component with voice recording and dynamic suggestions
const ChatInput = () => {
    const { sendMessage, loading, isThinking } = useChatContext();
    const { t } = useTranslation();

    const [message, setMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const inputRef = useRef(null);
    const recordingTimer = useRef(null);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Rotating placeholder texts for input field
    const placeholders = [
        t('input.placeholder.default'),
        t('input.placeholder.salesTrend'),
        t('input.placeholder.topProducts'),
        t('input.placeholder.busyHours'),
        t('input.placeholder.recommendations')
    ];

    // Rotate placeholders every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [placeholders]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (message.trim() !== '') {
            sendMessage(message);
            setMessage('');
        }
    };

    // Simulate voice recording functionality
    const toggleRecording = () => {
        if (isRecording) {
            // Stop recording
            clearInterval(recordingTimer.current);

            // Simulate successful voice recognition
            setMessage(prev => {
                const recognizedText = getRandomQuestion();
                return prev + (prev ? ' ' : '') + recognizedText;
            });

            setIsRecording(false);
            setRecordingDuration(0);
        } else {
            // Start recording
            setIsRecording(true);

            // Start timer to track recording duration
            recordingTimer.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

            // Auto-stop recording after 10 seconds
            setTimeout(() => {
                if (isRecording) {
                    toggleRecording();
                }
            }, 10000);
        }
    };

    // Get a random question for voice simulation
    const getRandomQuestion = () => {
        const questions = [
            "What were my sales like this week?",
            "Show me my top selling products",
            "When are my busiest hours?",
            "How can I improve my business efficiency?",
            "What insights do you have for me today?"
        ];
        return questions[Math.floor(Math.random() * questions.length)];
    };

    // Format recording duration
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            {/* Voice Recording Indicator */}
            {isRecording && (
                <div className="recording-indicator">
                    <div className="recording-pulse"></div>
                    <span>{formatDuration(recordingDuration)}</span>
                </div>
            )}

            {/* Text Input */}
            <input
                ref={inputRef}
                type="text"
                className="chat-input-field"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                disabled={loading || isThinking}
            />

            {/* Voice Input Button */}
            <button
                type="button"
                className={`voice-input-btn ${isRecording ? 'recording' : ''}`}
                onClick={toggleRecording}
                disabled={loading || isThinking}
                aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
            >
                <i className={`fas fa-${isRecording ? 'stop' : 'microphone'}`}></i>
            </button>

            {/* Send Button */}
            <button
                type="submit"
                className="chat-send-btn"
                disabled={!message.trim() || loading || isThinking}
                aria-label="Send message"
            >
                <i className="fas fa-paper-plane"></i>
            </button>
        </form>
    );
};

export default ChatInput;