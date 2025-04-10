import React, { createContext, useState, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Example theme state
  const [selectedMerchantId, setSelectedMerchantId] = useState('5c1f8'); // Default merchant
  const { i18n } = useTranslation();

  // Example: List of available merchants (could come from API/mock)
  const availableMerchants = [
     { id: '5c1f8', name: 'Burger Factory' },
     { id: '2e8a5', name: 'Burger Barn' },
     { id: '0e1b3', name: 'Chicken Shack'},
     { id: '1d4f2', name: 'Asian Wok' },
     { id: 'b9e5f', name: 'Seafood Express' },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    setTheme,
    selectedMerchantId,
    setSelectedMerchantId,
    availableMerchants,
    currentLanguage: i18n.language,
    changeLanguage,
  }), [theme, selectedMerchantId, i18n.language]);

  // TODO: Wrap with DashboardProvider and ChatProvider if they depend on AppContext
  // Or combine simple states here if preferred for prototype

  return (
    <AppContext.Provider value={value}>
      {children}
      {/* Consider nesting other providers here: */}
      {/* <DashboardProvider> */}
      {/* <ChatProvider> */}
      {/* {children} */}
      {/* </ChatProvider> */}
      {/* </DashboardProvider> */}
    </AppContext.Provider>
  );
};

// Custom hook to use the App context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};