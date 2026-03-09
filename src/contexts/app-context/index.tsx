import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import type { IGameFile } from '~/interfaces/game';

interface AppContextValue {
	game: IGameFile | null;
	setGameFile: (game: IGameFile) => void;
	reset: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
	const [game, setGameFile] = useState<IGameFile | null>(null);

	const reset = useCallback(() => {
		setGameFile(null);
	}, []);

	return (
		<AppContext value={{ game, setGameFile, reset }}>{children}</AppContext>
	);
}

export function useAppContext(): AppContextValue {
	const ctx = useContext(AppContext);
	if (!ctx)
		throw new Error('useAppContext must be used within AppContextProvider');
	return ctx;
}
