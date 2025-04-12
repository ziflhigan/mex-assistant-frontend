import React from 'react';

// Animated component that shows the assistant's "thinking" process
// Simulates LLM calling tools and processing data
const ThinkingIndicator = ({ thinkingState }) => {
    if (!thinkingState) return null;

    const { stage, message, tool } = thinkingState;

    // Get status indicator based on current stage
    const getStageStatus = (stageKey, currentStage) => {
        if (stageKey === currentStage) return 'active';

        const stages = ['starting', 'analyzing', 'tool_calling', 'processing_data', 'generating_response'];
        const currentIndex = stages.indexOf(currentStage);
        const stageIndex = stages.indexOf(stageKey);

        if (stageIndex < currentIndex) return 'completed';
        return 'pending';
    };

    // Get icon for each stage
    const getStageIcon = (stage, status) => {
        if (status === 'completed') return 'check-circle';

        const icons = {
            starting: 'brain',
            analyzing: 'search',
            tool_calling: 'database',
            processing_data: 'cogs',
            generating_response: 'magic'
        };

        return icons[stage] || 'circle';
    };

    return (
        <div className="thinking-indicator">
            <div className="thinking-header">
                <div className="thinking-icon">
                    <i className="fas fa-robot"></i>
                </div>
                <div className="thinking-title">Processing your request...</div>
            </div>

            <div className="thinking-stages">
                {['starting', 'analyzing', 'tool_calling', 'processing_data', 'generating_response'].map((stageKey) => {
                    const status = getStageStatus(stageKey, stage);
                    const icon = getStageIcon(stageKey, status);

                    return (
                        <div key={stageKey} className={`thinking-stage ${status}`}>
                            <div className="stage-icon">
                                <i className={`fas fa-${icon}`}></i>
                            </div>
                            <div className="stage-label">
                                {stageKey === 'starting' && 'Starting analysis'}
                                {stageKey === 'analyzing' && 'Analyzing request'}
                                {stageKey === 'tool_calling' && 'Fetching data'}
                                {stageKey === 'processing_data' && 'Processing information'}
                                {stageKey === 'generating_response' && 'Preparing response'}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="thinking-message">
                {/* Animate the message with typing effect */}
                <div className="message-text typing-animation">
                    {message}

                    {/* Show tool information if available */}
                    {tool && (
                        <div className="tool-info">
                            <i className="fas fa-wrench tool-icon"></i>
                            <code>Using {tool}</code>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThinkingIndicator;