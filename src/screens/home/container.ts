import {
	type ChangeEvent,
	type DragEvent,
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppContext } from '~/contexts/app-context';
import { detectGame } from '~/parsers/detect-game';

export function useHomeContainer() {
	const [isDragging, setIsDragging] = useState(false);

	const { t } = useTranslation('home');

	const { game, setGameFile } = useAppContext();

	const navigate = useNavigate();

	const inputRef = useRef<HTMLInputElement>(null);

	async function handleLoadFile(file: File) {
		if (!file.name.endsWith('.sav')) {
			toast.error(t('errors.invalid_file'));
			return;
		}

		const buffer = await file.arrayBuffer();
		const game = detectGame(buffer);

		if (!game) {
			toast.error(t('errors.unknown_game'));
			return;
		}

		setGameFile({
			buffer,
			file,
			game,
		});

		await new Promise((resolve) => setTimeout(resolve, 1000));

		navigate(`/${game}`);
	}

	function handleDropFile(e: DragEvent<HTMLLabelElement>) {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer?.files?.[0];
		if (file) handleLoadFile(file);
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) handleLoadFile(file);
	}

	function handleDropFileZoneKeyDown(e: KeyboardEvent<HTMLLabelElement>) {
		if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
	}

	const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback(() => {
		setIsDragging(false);
	}, []);

	function handleOpenEditor(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		if (game?.game) navigate(`/${game.game}`);
	}

	return {
		isDragging,
		loadedFile: game?.file ?? null,
		game: game?.game ?? null,
		inputRef,
		handleDropFile,
		handleDragOver,
		handleDragLeave,
		handleInputChange,
		handleDropFileZoneKeyDown,
		handleOpenEditor,
	};
}
