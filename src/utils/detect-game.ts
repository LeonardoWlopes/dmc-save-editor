import { EGameVersion } from '~/enums/version';
import { DMC1_MAGIC, DMC1_SLOT_SIZE } from '~/utils/parsers';

export function detectGame(buffer: ArrayBuffer): EGameVersion | null {
	if (buffer.byteLength < DMC1_SLOT_SIZE) return null;

	const view = new DataView(buffer);
	const isDmc1 = DMC1_MAGIC.every((byte, i) => view.getUint8(i) === byte);

	if (isDmc1) return EGameVersion.DMC1;

	return null;
}
