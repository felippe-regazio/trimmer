import i18n from 'i18next'
import resources from './locales'
import { initReactI18next } from 'react-i18next'
import { getDefaultLocale } from '../resources/script/utils.tsx'

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: getDefaultLocale(),
    interpolation: { escapeValue: false },
  });

export default i18n;