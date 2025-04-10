// src/hooks/useLocalization.js
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const useLocalization = () => {
  const { language } = useContext(AppContext);

  const translate = (key) => {
    // Replace this with actual translation logic using i18n library
    // Example: return i18n.t(key, { lng: language });
    return `[${key} - ${language}]`; // Placeholder
  };

  return { language, translate };
};

export default useLocalization;