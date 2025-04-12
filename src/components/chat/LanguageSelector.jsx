// import React from 'react';
// import { useChatContext } from '../../contexts/ChatContext';

// // Dropdown to select the UI/response language (integrated with i18n via context)
// export default function LanguageSelector() {
//     const { language, setLanguage } = useChatContext();

//     const handleChange = (e) => {
//         const newLang = e.target.value;
//         setLanguage(newLang);
//         // i18n.changeLanguage is called in ChatContext effect when language state updates
//     };

//     return (
//         <select 
//             className="language-selector" 
//             value={language} 
//             onChange={handleChange}
//             aria-label="Select language"
//         >
//             <option value="en">English</option>
//             <option value="zh">中文</option>
//             <option value="ms">Melayu</option>
//         </select>
//     );
// }
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'th', label: 'ไทย' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'Español' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      className="language-selector"
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
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
