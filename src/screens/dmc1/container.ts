import { useAppContext } from '~/contexts/app-context';
import { EGameVersion } from '~/enums/game';

export function useDmc1ScreenContainer() {
	const { game } = useAppContext();

	const hasFile = Boolean(game?.file && game?.buffer);

	const isDmc1 = game?.game === EGameVersion.DMC1;

	const isValid = hasFile && isDmc1;

	return {
		isValid,
		file: game?.file ?? null,
	};
}
