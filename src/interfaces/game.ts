import type { EGameVersion } from '~/enums/game';

export interface IGameFile {
	file: File;
	buffer: ArrayBuffer;
	game: EGameVersion;
}
