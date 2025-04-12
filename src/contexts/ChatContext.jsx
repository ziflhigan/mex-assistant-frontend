import React, { createContext, useContext, useReducer, useEffect } from 'react';
import i18n from '../i18n/i18n';
import { formatCurrency } from '../utils/numberFormatter';
import { getDashboardData } from '../services/mockService';

// Create context
const ChatContext = createContext(null);

// Define initial state
const initialState = {
    messages: [{
        sender: 'assistant',
        type: 'text',
        content: "Hi there! I'm your MEX Assistant. How can I help with your business insights today?",
        timestamp: new Date().toISOString()
    }],
    loading: false,
    language: 'en',
    merchant: {
        id: '5c1f8',
        name: 'Burger Factory'
    },
    timeFilter: 'Week',
    merchantData: null,
    typingIndicator: false,
    isThinking: false, // For when the agent is "thinking" (tool execution)
    thinkingState: null, // For tracking agent thinking process
};

// Define action types
const SEND_MESSAGE = 'SEND_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const START_THINKING = 'START_THINKING';
const UPDATE_THINKING = 'UPDATE_THINKING';
const END_THINKING = 'END_THINKING';
const SET_LOADING = 'SET_LOADING';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_MERCHANT = 'SET_MERCHANT';
const SET_TIME_FILTER = 'SET_TIME_FILTER';
const SET_MERCHANT_DATA = 'SET_MERCHANT_DATA';

// Reducer
function chatReducer(state, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const userContent = action.payload;
            const userMessage = {
                sender: 'user',
                type: 'text',
                content: userContent,
                timestamp: new Date().toISOString()
            };
            return {
                ...state,
                messages: [...state.messages, userMessage],
                typingIndicator: true
            };
        }
        case RECEIVE_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {
                    ...action.payload,
                    timestamp: new Date().toISOString()
                }],
                typingIndicator: false,
                isThinking: false,
                thinkingState: null
            };
        }
        case START_THINKING: {
            return {
                ...state,
                isThinking: true,
                thinkingState: {
                    stage: 'starting',
                    message: 'Analyzing your request...'
                }
            };
        }
        case UPDATE_THINKING: {
            return {
                ...state,
                thinkingState: {
                    ...state.thinkingState,
                    ...action.payload
                }
            };
        }
        case END_THINKING: {
            return {
                ...state,
                isThinking: false
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        case CLEAR_MESSAGES: {
            return {
                ...state,
                messages: [
                    {
                        sender: 'assistant',
                        type: 'text',
                        content: "I'm still here! What else can I help you with?",
                        timestamp: new Date().toISOString()
                    }
                ],
                isThinking: false,
                thinkingState: null,
                typingIndicator: false
            };
        }
        case SET_LANGUAGE: {
            return {
                ...state,
                language: action.payload
            };
        }
        case SET_MERCHANT: {
            return {
                ...state,
                merchant: action.payload
            };
        }
        case SET_TIME_FILTER: {
            return {
                ...state,
                timeFilter: action.payload
            };
        }
        case SET_MERCHANT_DATA: {
            return {
                ...state,
                merchantData: action.payload
            };
        }
        default:
            return state;
    }
}

// Tool definitions for the agent
const tools = {
    // Get top items data
    getTopItems: async (merchantId, period, limit = 5) => {
        const data = await getDashboardData({ merchantId, timeFilter: period });
        return (data?.topItems || []).slice(0, limit);
    },

    // Get sales trend data
    getSalesTrend: async (merchantId, period) => {
        const data = await getDashboardData({ merchantId, timeFilter: period });
        return data?.salesTrend || [];
    },

    // Get hourly sales data
    getHourlySales: async (merchantId, period) => {
        const data = await getDashboardData({ merchantId, timeFilter: period });
        return data?.hourlySales || [];
    },

    // Get daily sales data
    getDailySales: async (merchantId, period) => {
        const data = await getDashboardData({ merchantId, timeFilter: period });
        return data?.dailySales || [];
    },

    // Get general stats
    getStats: async (merchantId, period) => {
        const data = await getDashboardData({ merchantId, timeFilter: period });
        const { totalSales, totalOrders, averageOrderValue, prepTime } = data || {};
        return { totalSales, totalOrders, averageOrderValue, prepTime };
    },

    // Get AI insights
    getInsights: async (merchantId, period) => {
        const data = await getDashboardData({ merchantId, timeFilter: period });
        return data?.aiInsights || [];
    },

    // Calculate percentage growth
    calculateGrowth: (current, previous) => {
        if (!previous || previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    }
};

// Agent that simulates LLM with tools using pattern matching
// Agent that simulates LLM with tools using pattern matching
const agentHandler = async (message, state, dispatch) => {
    const question = message.toLowerCase();
    const { merchant, timeFilter } = state;

    // Start the "thinking" process
    dispatch({ type: START_THINKING });

    // Delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Update thinking state - analyzing intent
    dispatch({
        type: UPDATE_THINKING,
        payload: {
            stage: 'analyzing',
            message: 'Determining information needed...'
        }
    });

    await new Promise(resolve => setTimeout(resolve, 700));

    // Simulate intent classification to determine which tools to use
    let intent = null;
    let toolName = null;

    // --- Intent matching logic remains the same ---
    if (question.includes('top') && (question.includes('item') || question.includes('product') || question.includes('sell'))) {
        intent = 'getTopItems';
        toolName = 'top_items_tool';
    } else if (question.includes('sales') && question.includes('trend')) {
        intent = 'getSalesTrend';
        toolName = 'sales_trend_tool';
    } else if (question.includes('hour') || (question.includes('busiest') && question.includes('time'))) {
        intent = 'getHourlySales';
        toolName = 'hourly_sales_tool';
    } else if (question.includes('day') || question.includes('daily')) {
        intent = 'getDailySales';
        toolName = 'daily_sales_tool';
    } else if (question.includes('stat') || question.includes('overview') ||
        question.includes('performance') || question.includes('average') ||
        question.includes('total') || question.includes('order value')) {
        // --- Enhanced Logic for Average Order Value Comparison ---
        if (question.includes('average order value') && question.includes('compared to last')) {
            intent = 'getAovComparison'; // Specific intent for this
            toolName = 'stats_comparison_tool';
        } else {
            intent = 'getStats';
            toolName = 'stats_tool';
        }
    } else if (question.includes('insight') || question.includes('recommend') ||
        question.includes('suggest') || question.includes('improve')) {
        intent = 'getInsights';
        toolName = 'insights_tool';
    }
    // --- End of Intent Matching ---


    if (intent) {
        // Update thinking state - calling tool
        dispatch({
            type: UPDATE_THINKING,
            payload: {
                stage: 'tool_calling',
                message: `Calling ${toolName} to retrieve your information...`,
                tool: toolName
            }
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // --- Variable to hold the final message ---
            let responseMessage;

            switch (intent) {
                case 'getTopItems': { // Use block scope for clarity
                    dispatch({ type: UPDATE_THINKING, payload: { stage: 'processing_data', message: 'Analyzing your top selling items...' } });
                    const topItems = await tools.getTopItems(merchant.id, timeFilter);

                    // --- ENHANCED CONTENT ---
                    let enhancedContent = `Looking at your top sellers for this ${timeFilter.toLowerCase()}:\n`;
                    if (topItems && topItems.length > 0) {
                        enhancedContent += `*   **${topItems[0].name}** leads the pack with ${topItems[0].quantity} orders, bringing in ${formatCurrency(topItems[0].revenue)}.`;
                        if (topItems.length > 1) {
                            enhancedContent += `\n*   You also saw strong performance from ${topItems[1].name}.`;
                        }
                        enhancedContent += "\n\nHere's the detailed breakdown of your top items:";
                    } else {
                        enhancedContent = `It seems there's no top item data available for this ${timeFilter.toLowerCase()}.`;
                    }
                    // --- END ENHANCED CONTENT ---

                    responseMessage = {
                        sender: 'assistant',
                        type: 'rich',
                        // --- Use enhanced content ---
                        content: enhancedContent,
                        visualization: {
                            type: 'table',
                            data: {
                                title: `Top Selling Items - ${timeFilter}`,
                                columns: ['Item Name', 'Category', 'Orders', 'Revenue'],
                                rows: topItems.map(item => [
                                    item.name,
                                    item.category || 'Uncategorized',
                                    item.quantity,
                                    formatCurrency(item.revenue)
                                ])
                            }
                        }
                    };
                    break;
                } // end case getTopItems

                case 'getSalesTrend': {
                    dispatch({ type: UPDATE_THINKING, payload: { stage: 'processing_data', message: 'Analyzing your sales trends...' } });
                    const salesTrend = await tools.getSalesTrend(merchant.id, timeFilter);

                    // --- ENHANCED CONTENT ---
                    let enhancedContent = `Let's look at your sales trend for this ${timeFilter.toLowerCase()}.\n`;
                    if (salesTrend && salesTrend.length > 0) {
                        // Find peak sales day (simple approach: find max sales value)
                        const peak = salesTrend.reduce((max, item) => item.sales > max.sales ? item : max, salesTrend[0]);
                        const peakDate = new Date(peak.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const totalSales = salesTrend.reduce((sum, item) => sum + item.sales, 0);

                        enhancedContent += `*   Overall, you generated ${formatCurrency(totalSales)} in sales during this period.`;
                        enhancedContent += `\n*   Your peak sales day was **${peakDate}** with ${formatCurrency(peak.sales)}.`;
                        // Add a simple trend observation (compare start vs end)
                        if (salesTrend.length > 1) {
                            const trendDirection = salesTrend[salesTrend.length - 1].sales > salesTrend[0].sales ? "an upward" : "a downward";
                            enhancedContent += `\n*   The period showed ${trendDirection} trend overall.`;
                        }
                        enhancedContent += "\n\nHere's the visual trend for sales and orders:";
                    } else {
                        enhancedContent = `I couldn't retrieve the sales trend data for this ${timeFilter.toLowerCase()}.`;
                    }
                    // --- END ENHANCED CONTENT ---

                    responseMessage = {
                        sender: 'assistant',
                        type: 'rich',
                        content: enhancedContent, // Use enhanced content
                        visualization: {
                            type: 'chart',
                            chartType: 'line',
                            data: {
                                title: `Sales Trend - ${timeFilter}`,
                                labels: salesTrend.map(item => {
                                    const date = new Date(item.date);
                                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                }),
                                series: [
                                    { name: 'Sales', values: salesTrend.map(item => item.sales), color: '#00b14f' },
                                    { name: 'Orders', values: salesTrend.map(item => item.orders), color: '#3498db' }
                                ]
                            }
                        }
                    };
                    break;
                } // end case getSalesTrend

                case 'getHourlySales': {
                    dispatch({ type: UPDATE_THINKING, payload: { stage: 'processing_data', message: 'Analyzing sales by hour of day...' } });
                    const hourlySales = await tools.getHourlySales(merchant.id, timeFilter);

                    // --- ENHANCED CONTENT ---
                    let enhancedContent = `Analyzing your sales by hour for this ${timeFilter.toLowerCase()}:\n`;
                    let topHoursFormatted = 'N/A';
                    if (hourlySales && hourlySales.length > 0) {
                        const sortedHours = [...hourlySales].sort((a, b) => b.sales - a.sales);
                        const topHours = sortedHours.slice(0, 3);
                        topHoursFormatted = topHours.map(h =>
                            typeof h.hour === 'number'
                                ? `${h.hour === 0 ? '12 AM' : h.hour < 12 ? `${h.hour} AM` : h.hour === 12 ? '12 PM' : `${h.hour - 12} PM`}`
                                : h.hour
                        ).join(', ');
                        const lowestHour = sortedHours[sortedHours.length-1];
                        const lowestHourFormatted = typeof lowestHour.hour === 'number'
                            ? `${lowestHour.hour === 0 ? '12 AM' : lowestHour.hour < 12 ? `${lowestHour.hour} AM` : lowestHour.hour === 12 ? '12 PM' : `${lowestHour.hour - 12} PM`}`
                            : lowestHour.hour;

                        enhancedContent += `*   Your peak activity times are generally around **${topHoursFormatted}**.`;
                        enhancedContent += `\n*   Conversely, things tend to be quietest around **${lowestHourFormatted}**.`;
                        enhancedContent += `\n*   Understanding these patterns can be key for staffing and promotions.`;
                        enhancedContent += `\n\nHere's the hourly breakdown chart:`;

                    } else {
                        enhancedContent = `Hourly sales data isn't available for this period.`;
                    }
                    // --- END ENHANCED CONTENT ---


                    responseMessage = {
                        sender: 'assistant',
                        type: 'rich',
                        content: enhancedContent, // Use enhanced content
                        visualization: {
                            type: 'chart',
                            chartType: 'bar',
                            data: {
                                title: 'Sales by Hour of Day',
                                labels: hourlySales.map(h => {
                                    const hour = h.hour;
                                    return typeof hour === 'number'
                                        ? `${hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}`
                                        : hour;
                                }),
                                series: [{ name: 'Sales', values: hourlySales.map(h => h.sales), color: '#3498db' }]
                            }
                        },
                        // Keep existing tips, but ensure topHoursFormatted is available
                        tips: hourlySales && hourlySales.length > 0 ? [
                            { icon: 'lightbulb', text: `Consider adding extra staff or running quick promotions during peak hours (${topHoursFormatted}) to maximize opportunity and manage wait times.` }
                        ] : []
                    };
                    break;
                }

                case 'getDailySales': {
                    dispatch({ type: UPDATE_THINKING, payload: { stage: 'processing_data', message: 'Analyzing sales by day of week...' } });
                    const dailySales = await tools.getDailySales(merchant.id, timeFilter);

                    let enhancedContent = `Here's how your sales break down by day of the week for this ${timeFilter.toLowerCase()}:\n`;
                    let bestDay = null;
                    if (dailySales && dailySales.length > 0) {
                        bestDay = [...dailySales].sort((a, b) => b.sales - a.sales)[0];
                        const worstDay = [...dailySales].sort((a, b) => a.sales - b.sales)[0];

                        enhancedContent += `*   **${bestDay.day}** stands out as your strongest day, bringing in **${formatCurrency(bestDay.sales)}**.`;
                        if (bestDay.day !== worstDay.day) {
                            enhancedContent += `\n*   On the other end, ${worstDay.day} saw the lowest sales at ${formatCurrency(worstDay.sales)}.`;
                        }
                        enhancedContent += `\n*   Knowing your weekly rhythm helps optimize inventory and marketing efforts.`;
                        enhancedContent += `\n\nSee the performance for each day below:`;
                    } else {
                        enhancedContent = `Daily sales data isn't available for this period.`;
                    }

                    responseMessage = {
                        sender: 'assistant',
                        type: 'rich',
                        content: enhancedContent, // Use enhanced content
                        visualization: {
                            type: 'chart',
                            chartType: 'bar',
                            data: {
                                title: 'Sales by Day of Week',
                                labels: dailySales.map(d => d.day),
                                series: [{ name: 'Sales', values: dailySales.map(d => d.sales), color: '#9b59b6' }]
                            }
                        },
                        // Keep existing tips, ensure bestDay is available
                        tips: bestDay ? [
                            { icon: 'crown', text: `Leverage your peak performance on ${bestDay.day}! Consider special offers or ensuring full staffing.` }
                        ] : []
                    };
                    break;
                }

                case 'getStats': {
                    dispatch({ type: UPDATE_THINKING, payload: { stage: 'processing_data', message: 'Gathering business statistics...' } });
                    const stats = await tools.getStats(merchant.id, timeFilter);

                    // **Note:** Comparing to previous period requires fetching more data.
                    // For this example, we'll just present the current stats clearly.
                    // A real implementation might fetch previous period data here.
                    let enhancedContent = `Okay, here's a snapshot of your key performance metrics for this ${timeFilter.toLowerCase()}:\n`;
                    if (stats && stats.totalSales !== undefined) {
                        enhancedContent += `*   **Total Sales:** ${formatCurrency(stats.totalSales)}\n`;
                        enhancedContent += `*   **Total Orders:** ${stats.totalOrders}\n`;
                        enhancedContent += `*   **Average Order Value (AOV):** ${formatCurrency(stats.averageOrderValue)}\n`;
                        enhancedContent += `*   **Average Preparation Time:** ${stats.prepTime} minutes\n\n`;
                        enhancedContent += `These numbers give a quick overview of your ${timeFilter.toLowerCase()}'s activity.`;
                    } else {
                        enhancedContent = `Sorry, I couldn't retrieve the performance overview for this ${timeFilter.toLowerCase()}.`;
                    }
                    // --- END ENHANCED CONTENT ---

                    responseMessage = {
                        sender: 'assistant',
                        type: 'rich',
                        content: enhancedContent, // Use enhanced content
                        // Metrics display remains the same structure
                        metrics: stats && stats.totalSales !== undefined ? [
                            { label: 'Total Sales', value: formatCurrency(stats.totalSales), icon: 'dollar-sign', color: '#00b14f' },
                            { label: 'Total Orders', value: stats.totalOrders, icon: 'shopping-bag', color: '#3498db' },
                            { label: 'Average Order Value', value: formatCurrency(stats.averageOrderValue), icon: 'receipt', color: '#9b59b6' },
                            { label: 'Avg Preparation Time', value: `${stats.prepTime} min`, icon: 'clock', color: '#e67e22' }
                        ] : []
                    };
                    break;
                } // end case getStats

                // --- NEW CASE FOR AOV COMPARISON ---
                case 'getAovComparison': {
                    dispatch({ type: UPDATE_THINKING, payload: { stage: 'processing_data', message: 'Comparing Average Order Value...' } });

                    // **SIMULATION:** Fetch current and pretend to fetch previous stats
                    // In a real scenario, you'd determine the 'previous' timeFilter accurately
                    const currentStats = await tools.getStats(merchant.id, timeFilter);
                    // Simulate fetching previous - replace with actual logic if possible
                    // For demo, let's hardcode a plausible previous value
                    const previousTimeFilter = `Previous ${timeFilter}`; // Placeholder
                    const previousAov = currentStats.averageOrderValue * (Math.random() * 0.2 + 0.9); // Simulate +/- 10% change

                    let comparisonText = "Comparing Average Order Value (AOV):\n";
                    let changeText = "unavailable";
                    let changeDirection = "";
                    let changeColor = "#555"; // Default gray

                    if (currentStats && currentStats.averageOrderValue !== undefined) {
                        const currentAov = currentStats.averageOrderValue;
                        const growth = tools.calculateGrowth(currentAov, previousAov);
                        const absChange = Math.abs(currentAov - previousAov);

                        comparisonText += `*   This ${timeFilter.toLowerCase()}'s AOV: **${formatCurrency(currentAov)}**\n`;
                        comparisonText += `*   ${previousTimeFilter}'s AOV (Simulated): ${formatCurrency(previousAov)}\n\n`;

                        if (growth > 0) {
                            changeDirection = "increase";
                            changeText = `an increase of ${formatCurrency(absChange)} (+${growth.toFixed(1)}%)`;
                            changeColor = 'var(--grab-green)';
                        } else if (growth < 0) {
                            changeDirection = "decrease";
                            changeText = `a decrease of ${formatCurrency(absChange)} (${growth.toFixed(1)}%)`;
                            changeColor = 'var(--accent-red)';
                        } else {
                            changeDirection = "change";
                            changeText = "no significant change";
                        }
                        comparisonText += `That's ${changeText} compared to the previous period.`;
                    } else {
                        comparisonText = "Sorry, I couldn't get the AOV data to make the comparison.";
                    }


                    responseMessage = {
                        sender: 'assistant',
                        type: 'rich', // Changed to rich to potentially add metric card
                        content: comparisonText,
                        // Optionally add a metric card for emphasis
                        metrics: currentStats && currentStats.averageOrderValue !== undefined ? [
                            {
                                label: `AOV vs Last ${timeFilter}`,
                                value: formatCurrency(currentStats.averageOrderValue),
                                icon: 'receipt',
                                color: changeColor, // Color based on change
                                change: changeText !== "unavailable" && changeDirection !== "change" ? { value: `${changeDirection === 'increase' ? '+' : ''}${tools.calculateGrowth(currentStats.averageOrderValue, previousAov).toFixed(1)}%`, direction: changeDirection === 'increase' ? 'positive' : 'negative' } : null // Add change data if ChatMetrics supports it
                            }
                        ] : [],
                    };
                    break;
                } // end case getAovComparison

                case 'getInsights': {
                    dispatch({ type: UPDATE_THINKING, payload: { stage: 'processing_data', message: 'Generating personalized insights...' } });
                    const insights = await tools.getInsights(merchant.id, timeFilter);

                    // --- ENHANCED CONTENT ---
                    let enhancedContent = `Okay, I've looked into your data for this ${timeFilter.toLowerCase()} and found these potential opportunities and observations:`;
                    if (!insights || insights.length === 0) {
                        enhancedContent = `I didn't find any specific insights or recommendations based on the data for this ${timeFilter.toLowerCase()}. Overall performance seems stable.`;
                    }
                    // --- END ENHANCED CONTENT ---

                    responseMessage = {
                        sender: 'assistant',
                        type: 'rich',
                        content: enhancedContent, // Use enhanced content
                        // Insights structure remains the same
                        insights: insights.map(insight => ({
                            title: insight.title,
                            description: insight.description,
                            type: insight.type || 'business',
                            severity: insight.severity || 'medium'
                        }))
                    };
                    break;
                } // end case getInsights

                default:
                    // Should not happen if intent is set, but good practice
                    throw new Error(`Unknown intent: ${intent}`);

            } // end switch(intent)


            // --- Final thinking stage ---
            dispatch({ type: UPDATE_THINKING, payload: { stage: 'generating_response', message: 'Preparing your answer...' } });
            await new Promise(resolve => setTimeout(resolve, 800));

            // --- Send the constructed response ---
            dispatch({ type: RECEIVE_MESSAGE, payload: responseMessage });

        } catch (error) {
            // --- Error handling ---
            console.error('Error in agent handler:', error);
            dispatch({
                type: RECEIVE_MESSAGE,
                payload: { sender: 'assistant', type: 'text', content: "I'm sorry, I encountered an error retrieving that information. Please try again later." }
            });
        } // end try-catch

    } else {
        // --- Generic response for unrecognized queries ---
        dispatch({ type: UPDATE_THINKING, payload: { stage: 'generating_response', message: 'Preparing your answer...' } });
        await new Promise(resolve => setTimeout(resolve, 800));
        dispatch({
            type: RECEIVE_MESSAGE,
            payload: {
                sender: 'assistant',
                type: 'text',
                content: "I can help you analyze your business performance. Try asking about sales trends, top selling items, peak hours, operational efficiency, or comparing stats like 'Average Order Value compared to last week'." // Updated generic response
            }
        });
    }
};

// Provider component
export function ChatProvider({ children }) {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    // Handle language changes
    useEffect(() => {
        if (i18n && state.language) {
            i18n.changeLanguage(state.language);
        }
    }, [state.language]);

    // Fetch merchant data when merchant or time filter changes
    useEffect(() => {
        const fetchMerchantData = async () => {
            try {
                const data = await getDashboardData({
                    merchantId: state.merchant.id,
                    timeFilter: state.timeFilter
                });
                dispatch({ type: SET_MERCHANT_DATA, payload: data });
            } catch (error) {
                console.error('Error fetching merchant data:', error);
            }
        };

        fetchMerchantData();
    }, [state.merchant.id, state.timeFilter]);

    // Message sending function with agent handling
    const sendMessage = async (message) => {
        if (!message.trim()) return;

        // Add user message to chat
        dispatch({ type: SEND_MESSAGE, payload: message });

        // Process with agent
        await agentHandler(message, state, dispatch);
    };

    // Actions for UI
    const clearChat = () => dispatch({ type: CLEAR_MESSAGES });
    const setLanguage = (lang) => dispatch({ type: SET_LANGUAGE, payload: lang });
    const setMerchant = (merchant) => dispatch({ type: SET_MERCHANT, payload: merchant });
    const setTimeFilter = (filter) => dispatch({ type: SET_TIME_FILTER, payload: filter });

    // Context value
    const value = {
        ...state,
        dispatch,
        sendMessage,
        clearChat,
        setLanguage,
        setMerchant,
        setTimeFilter
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

// Custom hook
export function useChatContext() {
    const context = useContext(ChatContext);
    if (context === null) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}

export default ChatContext;