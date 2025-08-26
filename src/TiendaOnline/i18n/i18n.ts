import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa recursos estáticos (simple y sin backend):
import esCommon from '../locales/es/common.json';
import esHome from '../locales/es/home.json';
import enCommon from '../locales/en/common.json';
import enHome from '../locales/en/home.json';

void i18n.use(initReactI18next).init({
  resources: {
    es: { common: esCommon, home: esHome },
    en: { common: enCommon, home: enHome },
  },
  lng: 'es', // idioma inicial
  fallbackLng: 'en',
  ns: ['common', 'home'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  // Opcional: detección simple por localStorage
  // initImmediate: false
});

export default i18n;
