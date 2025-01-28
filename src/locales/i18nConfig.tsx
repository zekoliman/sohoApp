import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '@/locales/en/translation.json';
import tr from '@/locales/tr/translation.json';

// i18n yapılandırması
i18n

  .use(initReactI18next) // react-i18next'i i18n'e bağlar
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      tr: {translation: tr},
    },
    lng: 'tr', // Cihaz diline göre varsayılan dili ayarlar
    fallbackLng: 'en', // Belirtilen dil bulunmazsa yedek dil
  });

export default i18n;
