import { Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import logo from '~/assets/images/logo.png';
import { env } from '~/utils/env';

export function Layout() {
	const { t } = useTranslation('layout');

	return (
		<div className="min-h-screen flex flex-col">
			<header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border">
				<div className="flex items-center gap-3">
					<img
						src={logo}
						alt=""
						aria-hidden="true"
						className="h-8 w-8 object-contain"
					/>

					<div>
						<h1 className="font-display text-base font-bold tracking-[0.2em] uppercase text-primary">
							{t('header.title')}
						</h1>

						<p className="text-[10px] tracking-widest uppercase text-muted-foreground">
							{t('header.subtitle')}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<span className="text-xs text-muted-foreground font-mono opacity-40">
						v{__APP_VERSION__}
					</span>

					<a
						href={env.GITHUB_REPO_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t('header.github_label')}
						className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 border border-border hover:border-primary/40 rounded-sm px-2.5 py-1.5"
					>
						<Github size={13} />

						<span className="font-mono tracking-wide hidden sm:inline">
							GitHub
						</span>
					</a>
				</div>
			</header>

			<Outlet />

			<footer className="relative z-10 py-4 px-6 border-t border-border flex items-center justify-center">
				<p className="text-muted-foreground/40 text-xs tracking-wider font-mono">
					{t('footer.disclaimer')}
				</p>
			</footer>
		</div>
	);
}
