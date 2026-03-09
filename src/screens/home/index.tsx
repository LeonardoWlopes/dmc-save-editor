import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { EGameVersion } from '~/enums/game';
import { cn } from '~/lib/utils';
import { formatBytes } from '~/utils/data';
import { useHomeContainer } from './container';

const GAME_VERSIONS = Array.from(Object.values(EGameVersion));

export default function HomeScreen() {
	const {
		isDragging,
		loadedFile,
		game,
		inputRef,
		handleDropFile,
		handleDragOver,
		handleDragLeave,
		handleCursorSound,
		handleInputChange,
		handleDropFileZoneKeyDown,
		handleOpenEditor,
	} = useHomeContainer();

	const { t } = useTranslation('home');

	const inputId = useId();

	return (
		<main className="flex-1 flex flex-col items-center justify-center px-4 py-16 gap-12">
			{/* Hero */}
			<div className="text-center flex flex-col items-center gap-4">
				<div className="flex items-center gap-3 mb-1">
					<div className="h-px w-12 bg-dmc-crimson/40" />
					<span className="text-xs font-mono tracking-[0.4em] uppercase text-dmc-gold opacity-70">
						{t('hero.tag')}
					</span>
					<div className="h-px w-12 bg-dmc-crimson/40" />
				</div>

				<h2 className="font-display text-5xl md:text-6xl font-black tracking-[0.12em] uppercase text-foreground leading-none">
					DMC <span className="text-primary dmc-text-glow">Save</span>
					<br />
					Editor
				</h2>

				<div className="dmc-divider w-64 mt-1" />

				<p className="text-muted-foreground text-sm max-w-sm text-center leading-relaxed mt-1 whitespace-pre-line">
					{t('hero.description')}
				</p>
			</div>

			{/* Drop zone */}
			<label
				htmlFor={inputId}
				aria-label={t('dropzone.label')}
				className={cn(
					'relative w-full max-w-lg aspect-video',
					'border border-border rounded-sm',
					'flex flex-col items-center justify-center gap-5',
					'cursor-pointer select-none transition-all duration-300',
					isDragging ? 'dmc-glow-active border-primary' : 'dmc-glow',
					loadedFile && 'border-dmc-gold',
				)}
				onDrop={handleDropFile}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onMouseEnter={handleCursorSound}
				onKeyDown={handleDropFileZoneKeyDown}
			>
				{/* Corner decorations */}
				<span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
				<span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
				<span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
				<span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

				<input
					id={inputId}
					ref={inputRef}
					type="file"
					accept=".sav"
					className="hidden"
					onChange={handleInputChange}
				/>

				{loadedFile ? (
					<>
						<div className="text-4xl">⚔️</div>

						<div className="text-center">
							<p className="font-display text-sm font-bold tracking-widest uppercase text-dmc-gold dmc-gold-glow">
								{game && t(`games.${game}`)}
							</p>

							<p className="text-foreground text-sm mt-1 font-mono">
								{loadedFile.name}
							</p>

							<p className="text-muted-foreground text-xs mt-0.5">
								{formatBytes(loadedFile.size)}
							</p>
						</div>

						<Button
							size="sm"
							className="font-display tracking-widest uppercase text-xs"
							onClick={handleOpenEditor}
							onMouseEnter={handleCursorSound}
						>
							{t('dropzone.open_editor')}
						</Button>
					</>
				) : (
					<>
						<div
							className={cn(
								'text-5xl transition-transform duration-300',
								isDragging && 'scale-110',
							)}
						>
							🗡️
						</div>

						<div className="text-center">
							<p className="font-display text-sm font-semibold tracking-[0.15em] uppercase text-foreground">
								{isDragging
									? t('dropzone.dragging_title')
									: t('dropzone.idle_title')}
							</p>

							<p className="text-muted-foreground text-xs mt-1">
								{t('dropzone.subtitle')}
							</p>
						</div>

						<span className="inline-flex items-center justify-center font-display tracking-widest uppercase text-xs border border-primary/40 text-primary hover:bg-primary/10 transition-colors rounded-sm px-3 py-1.5">
							{t('dropzone.browse_button')}
						</span>

						<p className="text-muted-foreground/50 text-xs font-mono absolute bottom-4">
							{t('dropzone.hint')}
						</p>
					</>
				)}
			</label>

			{/* Game support badges */}
			<div className="flex items-center gap-3">
				{GAME_VERSIONS.map((version) => (
					<Badge
						key={version}
						variant="outline"
						className={cn(
							'font-display tracking-wider uppercase text-[10px] py-1 px-3 transition-colors cursor-default select-none',
							game === version
								? 'border-primary/60 text-primary'
								: 'border-muted-foreground/20 text-muted-foreground/40',
						)}
					>
						{t(`games.${version}_badge`)}
					</Badge>
				))}
			</div>
		</main>
	);
}
