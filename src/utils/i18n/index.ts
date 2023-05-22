import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import en from './locales/en-US';
import ko from './locales/ko-KR';

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      // for all options read: https://www.i18next.com/overview/configuration-options
      resources: {
        ko: ko,
        en: en,
      },
      // lng: "ko", //Define options when using language detector X
      fallbackLng: 'en',
      detection: {
        // languagedetector option
        order: ['querystring', 'htmlTag', 'cookie'], // detect Priority
        lookupCookie: 'i18n_lang', // cookie name
      },
      debug: true,
      saveMissing: true, //Send the untranslated key to the endpoint.
      // keySeparator: false, //Do not use keys in message format.
      // ns:['pageKo','pageEn','pageCn'],    //ns is a namespace and is necessary when managing labels, buttons, menus, etc.
      interpolation: {
        escapeValue: false,
      },
    },
    function (err) {
      if (err) console.error(err);
    }
  );

export default i18n;
