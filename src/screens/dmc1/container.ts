import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppContext } from '~/contexts/app-context';
import { EGameVersion } from '~/enums/version';
import { useSoundEffects } from '~/hooks/use-sound-effects';
import type { IDmc1Slot } from '~/interfaces/dmc1';
import { parseDmc1Slots } from '~/utils/parsers';
import { dmc1ScreenSchema } from './schema';
import type { TDmc1ScreenForm } from './types';

export function useDmc1ScreenContainer() {
	const [slots, setSlots] = useState<IDmc1Slot[]>([]);
	const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);

	const { game } = useAppContext();

	const { playSelection } = useSoundEffects();

	const { control, reset, watch } = useForm<TDmc1ScreenForm>({
		resolver: zodResolver(dmc1ScreenSchema),
		mode: 'onChange',
	});

	const isValid =
		Boolean(game?.file && game?.buffer) && game?.game === EGameVersion.DMC1;

	const selectedSlot = slots[selectedSlotIndex] ?? null;

	const blueOrbCount = watch('blueOrbs') ?? 0;

	function handleSelectSlot(index: number) {
		if (selectedSlotIndex === index) return;

		playSelection();
		setSelectedSlotIndex(index);

		const slot = slots[index];

		if (slot && !slot.isEmpty) reset(slot);
	}

	function parseSlotsFromBuffer() {
		if (!game?.buffer || !isValid) return;

		const parsed = parseDmc1Slots(game.buffer);
		setSlots(parsed);

		const firstOccupied = parsed.findIndex((s) => !s.isEmpty);
		const initialIndex = firstOccupied !== -1 ? firstOccupied : 0;
		setSelectedSlotIndex(initialIndex);

		const initialSlot = parsed[initialIndex];

		if (initialSlot && !initialSlot.isEmpty) reset(initialSlot);
	}
	useEffect(parseSlotsFromBuffer, [game?.buffer, isValid]);

	return {
		isValid,
		file: game?.file ?? null,
		slots,
		selectedSlotIndex,
		handleSelectSlot,
		selectedSlot,
		control,
		reset,
		blueOrbCount,
	};
}
