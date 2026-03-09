import {
	type ChangeEvent,
	type DragEvent,
	type KeyboardEvent,
	useCallback,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export function useHomeContainer() {
	const [isDragging, setIsDragging] = useState(false);
	const [loadedFile, setLoadedFile] = useState<File | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);

	const { t } = useTranslation('home');

	function handleLoadFile(file: File) {
		if (!file.name.endsWith('.sav')) {
			toast.error(t('errors.invalid_file'));
			return;
		}

		setLoadedFile(file);
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

	return {
		isDragging,
		loadedFile,
		inputRef,
		handleDropFile,
		handleDragOver,
		handleDragLeave,
		handleInputChange,
		handleDropFileZoneKeyDown,
	};
}
