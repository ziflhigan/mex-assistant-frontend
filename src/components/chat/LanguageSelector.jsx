import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '../../contexts/ChatContext'; // Optional if using context

/**
 * LanguageSelector Component
 *
 * Dropdown to select the UI/response language.
 * - Uses i18n to handle actual language switching
 * - Optionally integrates with ChatContext for syncing state across app
 * - Designed to be used in settings or chat header
 */
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useChatContext(); // Optional context sync

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'th', label: 'ไทย' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'Español' },
  ];

  // Ensure i18n changes when ChatContext language changes
  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // Update both ChatContext and i18n on change
  const handleChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang); // updates context
    i18n.changeLanguage(newLang); // updates translation
  };

  return (
    <select
      className="language-selector"
      value={language || i18n.language}
      onChange={handleChange}
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
