import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ theme, language, selectedMerchant, setTheme, setLanguage, setSelectedMerchant, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};