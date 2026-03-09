import { EGameVersion } from '~/enums/game';
import { isDmc1Buffer } from './game-signatures';

export function detectGame(buffer: ArrayBuffer): EGameVersion | null {
	if (isDmc1Buffer(buffer)) return EGameVersion.DMC1;

	return null;
}
