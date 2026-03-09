import logo from '~/assets/images/logo.png';

export function LoadingScreen() {
	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<img
				src={logo}
				alt="Carregando..."
				className="w-16 h-16 object-contain animate-bounce"
				style={{ animationDuration: '3s' }}
			/>
		</div>
	);
}
