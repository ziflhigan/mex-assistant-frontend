import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AppContext = createContext(null);

// Sample merchants data
const defaultMerchants = [
  { id: '5c1f8', name: 'Burger Factory (5c1f8)' },
  { id: '2e8a5', name: 'Burger Barn (2e8a5)' },
  { id: '0e1b3', name: 'Chicken Shack (0e1b3)' },
  { id: '1d4f2', name: 'Asian Wok (1d4f2)' },
  { id: 'b9e5f', name: 'Seafood Express (b9e5f)' }
];

/**
 * AppProvider component to wrap the application
 * Provides global state and functions
 */
export const AppProvider = ({ children }) => {
  // Theme state - light/dark mode
  const [theme, setTheme] = useState('light');
  
  // Language state
  const [language, setLanguage] = useState('en');
  
  // Merchants and selected merchant
  const [merchants, setMerchants] = useState(defaultMerchants);
  const [selectedMerchantId, setSelectedMerchantId] = useState('5c1f8');
  
  // User information
  const [user, setUser] = useState({
    name: 'Merchant Admin',
    email: 'admin@example.com',
    avatar: '/api/placeholder/35/35'
  });
  
  // Mobile sidebar visibility
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Function to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  
  // Function to change selected merchant
  const selectMerchant = (merchantId) => {
    setSelectedMerchantId(merchantId);
  };
  
  // Function to toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(prevState => !prevState);
  };
  
  // Close sidebar (for use after navigation on mobile)
  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };
  
  // Get the currently selected merchant object
  const selectedMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];

  // Apply CSS variables for theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // You could add more theme-specific CSS variables here
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--grab-white', '#222222');
      document.documentElement.style.setProperty('--grab-black', '#ffffff');
      document.documentElement.style.setProperty('--grab-gray', '#333333');
      document.documentElement.style.setProperty('--grab-dark-gray', '#dddddd');
    } else {
      document.documentElement.style.setProperty('--grab-white', '#ffffff');
      document.documentElement.style.setProperty('--grab-black', '#222222');
      document.documentElement.style.setProperty('--grab-gray', '#f7f7f7');
      document.documentElement.style.setProperty('--grab-dark-gray', '#4a4a4a');
    }
  }, [theme]);

  // Context value
  const value = {
    // Theme
    theme,
    toggleTheme,
    
    // Language
    language,
    changeLanguage,
    
    // Merchants
    merchants,
    selectedMerchantId,
    selectedMerchant,
    selectMerchant,
    
    // User
    user,
    setUser,
    
    // Mobile
    isMobileSidebarOpen,
    toggleMobileSidebar,
    closeMobileSidebar
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook for easy context use in components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;