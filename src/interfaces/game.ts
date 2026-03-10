import type { EGameVersion } from '~/enums/version';

export interface IGameFile {
	file: File;
	buffer: ArrayBuffer;
	game: EGameVersion;
}
