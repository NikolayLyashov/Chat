import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales/index.js';

i18n
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: 'ru',
  });

export default i18n;
