import type { IDmc1Slot } from '~/interfaces/dmc1';

export const DMC1_SLOT_SIZE = 2416;
export const DMC1_SLOT_COUNT = 10;
export const DMC1_MAGIC = [0x01, 0x00, 0x00] as const;

export function parseDmc1Slots(buffer: ArrayBuffer): IDmc1Slot[] {
	const view = new DataView(buffer);

	return Array.from({ length: DMC1_SLOT_COUNT }, (_, index) => {
		const base = index * DMC1_SLOT_SIZE;

		const isEmpty = !DMC1_MAGIC.every(
			(byte, i) => view.getUint8(base + i) === byte,
		);

		if (isEmpty) {
			return {
				index,
				isEmpty: true,
				saveCount: 0,
				timesBeaten: 0,
				currentMission: 0,
				difficulty: 1,
				playtime: 0,
				yellowOrbs: 0,
				vitality: 0,
				devilTrigger: 0,
				redOrbs: 0,
				blueOrbs: 0,
			} satisfies IDmc1Slot;
		}

		return {
			index,
			isEmpty: false,
			saveCount: view.getInt16(base + 32, true),
			timesBeaten: view.getInt16(base + 34, true),
			currentMission: view.getUint8(base + 36),
			difficulty: view.getUint8(base + 38),
			playtime: view.getInt32(base + 44, true),
			yellowOrbs: view.getInt16(base + 1568, true),
			vitality: view.getUint8(base + 1572),
			devilTrigger: view.getUint8(base + 1573),
			redOrbs: view.getInt32(base + 1588, true),
			blueOrbs: view.getUint8(base + 1592),
		} satisfies IDmc1Slot;
	});
}
