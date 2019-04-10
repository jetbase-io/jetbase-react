import i18next from 'i18next';
import en from './translations/en';
import fr from './translations/fr';

i18next
  .init({
    lng: 'en',
    resources: {
      en,
      fr,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
