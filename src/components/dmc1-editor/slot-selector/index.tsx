import { useTranslation } from 'react-i18next';
import { useSoundEffects } from '~/hooks/use-sound-effects';
import { cn } from '~/lib/utils';
import type { ISlotSelectorProps } from './types';

export function SlotSelector({
	slots,
	selectedIndex,
	onSelect,
}: ISlotSelectorProps) {
	const { t } = useTranslation('dmc1_slot_selector');

	const { playCursor } = useSoundEffects();

	return (
		<div className="flex gap-2 flex-wrap select-none">
			{slots.map(({ index, isEmpty, currentMission }) => (
				<button
					key={index}
					type="button"
					disabled={isEmpty}
					onClick={() => onSelect(index)}
					onMouseEnter={isEmpty ? undefined : playCursor}
					className={cn(
						'flex flex-col items-center justify-center w-14 h-14 rounded-sm border text-xs font-mono transition-all duration-200 cursor-pointer',
						isEmpty
							? 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
							: 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground',
						!isEmpty &&
							selectedIndex === index &&
							'border-primary text-primary dmc-glow bg-primary/5',
					)}
				>
					<span className="text-[10px] uppercase tracking-wider">
						{t('slot_label')}
					</span>

					<span className="text-sm font-bold">{index + 1}</span>

					{isEmpty && (
						<span className="text-[9px] uppercase tracking-wide mt-0.5 opacity-40">
							{t('empty')}
						</span>
					)}

					{!isEmpty && selectedIndex !== index && (
						<span className="text-[9px] uppercase tracking-wide mt-0.5 text-muted-foreground/50">
							{t('mission_short', { mission: currentMission })}
						</span>
					)}
				</button>
			))}
		</div>
	);
}
