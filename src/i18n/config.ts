import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptBR from './languages/pt-BR.json';

i18n.use(initReactI18next).init({
	resources: {
		'pt-BR': ptBR,
	},
	fallbackLng: 'pt-BR',
	lng: 'pt-BR',
	interpolation: {
		escapeValue: false,
	},
});

export const t = i18n.t.bind(i18n);
