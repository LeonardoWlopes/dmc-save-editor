const DMC1_SLOT_SIZE = 2416;
const DMC1_SLOT_COUNT = 10;
const DMC1_MAGIC: readonly number[] = [0x01, 0x00, 0x00];

export const DMC1_SLOT_OFFSETS: readonly number[] = Array.from(
	{ length: DMC1_SLOT_COUNT },
	(_, i) => i * DMC1_SLOT_SIZE,
);

export function isDmc1Buffer(buffer: ArrayBuffer): boolean {
	const view = new DataView(buffer);

	for (const offset of DMC1_SLOT_OFFSETS) {
		if (offset + DMC1_MAGIC.length > buffer.byteLength) break;

		const match = DMC1_MAGIC.every(
			(byte, i) => view.getUint8(offset + i) === byte,
		);

		if (match) return true;
	}

	return false;
}
