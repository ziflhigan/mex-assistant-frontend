/**
 * API Configuration for services
 */

const apiConfig = {
    // Base URL for API endpoints
    baseUrl: process.env.REACT_APP_API_URL || 'https://api.example.com/v1',

    // Default request timeout in milliseconds
    timeout: 30000,

    // Default headers for all requests
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    // Get authentication token from local storage or session
    getToken: () => {
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '';
    },

    // Set authentication token
    setToken: (token, remember = false) => {
        if (remember) {
            localStorage.setItem('authToken', token);
        } else {
            sessionStorage.setItem('authToken', token);
        }
    },

    // Clear authentication token
    clearToken: () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!apiConfig.getToken();
    },

    // Get user info from token or storage
    getUserInfo: () => {
        try {
            const userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
            return userInfoStr ? JSON.parse(userInfoStr) : null;
        } catch (error) {
            console.error('Error parsing user info:', error);
            return null;
        }
    }
};

export default apiConfig;