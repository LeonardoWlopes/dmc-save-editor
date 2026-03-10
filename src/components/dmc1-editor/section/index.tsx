import { cn } from '~/lib/utils';
import type { ISectionProps } from './types';

export function Section({ title, children, cols = 2 }: ISectionProps) {
	return (
		<div className="border border-border rounded-sm p-4 flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-primary">
					{title}
				</span>

				<div className="flex-1 h-px bg-border" />
			</div>

			<div
				className={cn(
					'grid gap-x-4 gap-y-4',
					cols === 3 ? 'grid-cols-3' : 'grid-cols-2',
				)}
			>
				{children}
			</div>
		</div>
	);
}
