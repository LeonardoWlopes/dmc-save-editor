import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppContext } from '~/contexts/app-context';
import { EGameVersion } from '~/enums/version';
import { useSoundEffects } from '~/hooks/use-sound-effects';
import type { IDmc1Slot } from '~/interfaces/dmc1';
import { downloadBuffer } from '~/utils/data';
import { parseDmc1Slots, serializeDmc1Slot } from '~/utils/parsers';
import { dmc1ScreenSchema } from './schema';
import type { TDmc1ScreenForm } from './types';

const DEFAULT_FORM_VALUES: TDmc1ScreenForm = {
	currentMission: 0,
	difficulty: 1,
	timesBeaten: 0,
	saveCount: 0,
	redOrbs: 0,
	yellowOrbs: 0,
	blueOrbs: 0,
	vitality: 0,
	devilTrigger: 0,
};

export function useDmc1ScreenContainer() {
	const [slots, setSlots] = useState<IDmc1Slot[]>([]);
	const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
	const [slotFormState, setSlotFormState] = useState<
		Map<number, TDmc1ScreenForm>
	>(new Map());

	const { game } = useAppContext();

	const { playSelection, playAlert } = useSoundEffects();

	const { control, reset, watch, handleSubmit, getValues } =
		useForm<TDmc1ScreenForm>({
			resolver: zodResolver(dmc1ScreenSchema),
			mode: 'onChange',
			defaultValues: DEFAULT_FORM_VALUES,
		});

	const isValid =
		Boolean(game?.file && game?.buffer) && game?.game === EGameVersion.DMC1;

	const selectedSlot = slots[selectedSlotIndex] ?? null;

	const blueOrbCount = watch('blueOrbs') ?? 0;

	const onSubmit = handleSubmit((data: TDmc1ScreenForm) => {
		if (!game?.buffer || !game?.file) return;

		const modified = serializeDmc1Slot(game.buffer, selectedSlotIndex, data);
		downloadBuffer(modified, game.file.name);
		playAlert();
	});

	function handleSelectSlot(index: number) {
		if (selectedSlotIndex === index) return;

		const currentValues = getValues();
		setSlotFormState((prev) =>
			new Map(prev).set(selectedSlotIndex, currentValues),
		);

		playSelection();
		setSelectedSlotIndex(index);

		const slot = slots[index];
		const saved = slotFormState.get(index);

		if (saved != null) {
			reset(saved);
		} else if (slot && !slot.isEmpty) {
			reset(slot);
		} else {
			reset(DEFAULT_FORM_VALUES);
		}
	}

	function parseSlotsFromBuffer() {
		if (!game?.buffer || !isValid) return;

		const parsed = parseDmc1Slots(game.buffer);
		setSlots(parsed);
		setSlotFormState(new Map());

		const firstOccupied = parsed.findIndex((s) => !s.isEmpty);
		const initialIndex = firstOccupied !== -1 ? firstOccupied : 0;
		setSelectedSlotIndex(initialIndex);

		const initialSlot = parsed[initialIndex];

		if (initialSlot && !initialSlot.isEmpty) {
			reset(initialSlot);
		} else {
			reset(DEFAULT_FORM_VALUES);
		}
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
		onSubmit,
	};
}
