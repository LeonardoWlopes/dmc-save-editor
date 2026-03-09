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
import { useSoundEffects } from '~/hooks/use-sound-effects';
import { detectGame } from '~/utils/detect-game';

export function useHomeContainer() {
	const [isDragging, setIsDragging] = useState(false);

	const { t } = useTranslation('home');

	const { game, setGameFile } = useAppContext();

	const { playAlert, playSelection, playCursor } = useSoundEffects();

	const navigate = useNavigate();

	const inputRef = useRef<HTMLInputElement>(null);

	async function handleLoadFile(file: File) {
		if (!file.name.endsWith('.sav')) {
			toast.error(t('errors.invalid_file'));
			playAlert();
			return;
		}

		const buffer = await file.arrayBuffer();
		const detectedGame = detectGame(buffer);

		if (!detectedGame) {
			toast.error(t('errors.unknown_game'));
			return;
		}

		setGameFile({
			buffer,
			file,
			game: detectedGame,
		});
		playAlert();
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

	function handleOpenEditor(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		if (game?.game) {
			playSelection();
			navigate(`/${game.game}`);
		}
	}

	const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleCursorSound = useCallback(() => {
		if (!game?.file) playCursor();
	}, [!game?.file]);

	return {
		isDragging,
		loadedFile: game?.file ?? null,
		game: game?.game ?? null,
		inputRef,
		handleDropFile,
		handleDragOver,
		handleDragLeave,
		handleCursorSound,
		handleInputChange,
		handleDropFileZoneKeyDown,
		handleOpenEditor,
	};
}
