import { useEffect } from 'react';

function handleBeforeUnload(e: BeforeUnloadEvent) {
	e.preventDefault();
}

export function useBeforeUnload(enabled: boolean = true): void {
	useEffect(() => {
		if (!enabled) return;

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [enabled]);
}
