import { Navigate } from 'react-router';
import { useBeforeUnload } from '~/hooks/use-before-unload';
import { useDmc1ScreenContainer } from './container';

export default function Dmc1Screen() {
	const { isValid } = useDmc1ScreenContainer();

	useBeforeUnload(isValid);

	if (!isValid) {
		return <Navigate to="/" replace />;
	}

	return (
		<main className="flex-1 flex flex-col items-center justify-center px-4 py-16 gap-4">
			<h2 className="font-display text-4xl font-black tracking-widest uppercase text-foreground">
				Devil May Cry
			</h2>

			<p className="text-muted-foreground text-sm">Editor em construção</p>
		</main>
	);
}
