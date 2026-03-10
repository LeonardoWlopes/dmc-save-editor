import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '~/components/ui/sonner';
import { AppContextProvider } from '~/contexts/app-context';
import { Router } from './router';
import '~/i18n/config';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<AppContextProvider>
			<Router />

			<Toaster theme="dark" position="bottom-right" richColors />
		</AppContextProvider>
	</StrictMode>,
);
