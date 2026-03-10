import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './languages/en.json';
import ptBR from './languages/pt-BR.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en,
			'pt-BR': ptBR,
		},
		fallbackLng: 'en',
		supportedLngs: ['en', 'pt-BR'],
		interpolation: {
			escapeValue: false,
		},
	});

export const t = i18n.t.bind(i18n);
