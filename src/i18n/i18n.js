// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../public/locales/en/translation.json';
import id from '../../public/locales/id/translation.json';
import ms from '../../public/locales/ms/translation.json';
import th from '../../public/locales/th/translation.json';
import vi from '../../public/locales/vi/translation.json';
import zh from '../../public/locales/zh/translation.json';

const resources = {
  en: { translation: en },
  id: { translation: id },
  ms: { translation: ms },
  th: { translation: th },
  vi: { translation: vi },
  zh: { translation: zh },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;