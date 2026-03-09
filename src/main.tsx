import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '~/components/ui/sonner';
import { QueryProvider } from './providers/query-provider';
import { Router } from './router';
import '~/i18n/config';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryProvider>
			<Router />
			<Toaster theme="dark" position="bottom-right" richColors />
		</QueryProvider>
	</StrictMode>,
);
