import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import blueOrb14 from '~/assets/images/dmc1-blue-orb-1-4.png';
import blueOrb24 from '~/assets/images/dmc1-blue-orb-2-4.png';
import blueOrb34 from '~/assets/images/dmc1-blue-orb-3-4.png';
import blueOrb44 from '~/assets/images/dmc1-blue-orb-4-4.png';
import devilStar from '~/assets/images/dmc1-devil-star.png';
import redOrb from '~/assets/images/dmc1-red-orb.png';
import vitalStar from '~/assets/images/dmc1-vital-star.png';
import yellowOrb from '~/assets/images/dmc1-yellow-orb.png';
import { DifficultyField } from '~/components/dmc1-editor/difficulty-field';
import { NumberField } from '~/components/dmc1-editor/number-field';
import { Section } from '~/components/dmc1-editor/section';
import { SlotSelector } from '~/components/dmc1-editor/slot-selector';
import { StaticField } from '~/components/dmc1-editor/static-field';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { useBeforeUnload } from '~/hooks/use-before-unload';
import { useSoundEffects } from '~/hooks/use-sound-effects';
import { formatPlaytime } from '~/utils/data';
import { useDmc1ScreenContainer } from './container';

const BLUE_ORB_ICONS = [blueOrb14, blueOrb14, blueOrb24, blueOrb34, blueOrb44];

export default function Dmc1Screen() {
	const { t } = useTranslation('dmc1_screen');

	const {
		isValid,
		file,
		slots,
		selectedSlotIndex,
		selectedSlot,
		control,
		blueOrbCount,
		handleSelectSlot,
		onSubmit,
	} = useDmc1ScreenContainer();

	const { playCursor } = useSoundEffects();

	useBeforeUnload(isValid);

	if (!isValid) return <Navigate to="/" />;

	return (
		<main className="flex-1 flex flex-col px-4 py-8 gap-6 max-w-3xl mx-auto w-full">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="font-display text-2xl font-black tracking-widest uppercase text-foreground leading-none">
						{t('title')}
					</h2>

					<p className="text-muted-foreground text-xs font-mono mt-1 opacity-60">
						{file?.name}
					</p>
				</div>

				<Badge
					variant="outline"
					className="border-primary/60 text-primary font-display tracking-wider uppercase text-[10px] py-1 px-3 shrink-0"
				>
					{t('badge')}
				</Badge>
			</div>

			<div className="dmc-divider" />

			<SlotSelector
				slots={slots}
				selectedIndex={selectedSlotIndex}
				onSelect={handleSelectSlot}
			/>

			{selectedSlot && !selectedSlot.isEmpty && (
				<form className="flex flex-col gap-4" onSubmit={onSubmit}>
					<Section title={t('sections.progress')}>
						<NumberField
							control={control}
							name="currentMission"
							label={t('fields.current_mission')}
							min={0}
							max={23}
							onFocus={playCursor}
						/>

						<DifficultyField
							control={control}
							name="difficulty"
							onFocus={playCursor}
						/>

						<NumberField
							control={control}
							name="timesBeaten"
							label={t('fields.completions')}
							min={0}
							onFocus={playCursor}
						/>

						<NumberField
							control={control}
							name="saveCount"
							label={t('fields.total_saves')}
							min={0}
							onFocus={playCursor}
						/>

						<div className="col-span-2">
							<StaticField
								label={t('fields.playtime')}
								value={formatPlaytime(selectedSlot.playtime)}
							/>
						</div>
					</Section>

					<Section title={t('sections.orbs')} cols={3}>
						<NumberField
							control={control}
							name="redOrbs"
							label={t('fields.red_orbs')}
							icon={redOrb}
							min={0}
							max={9999999}
							onFocus={playCursor}
						/>

						<NumberField
							control={control}
							name="yellowOrbs"
							label={t('fields.yellow_orbs')}
							icon={yellowOrb}
							min={0}
							max={99}
							onFocus={playCursor}
						/>

						<NumberField
							control={control}
							name="blueOrbs"
							label={t('fields.blue_orbs')}
							icon={BLUE_ORB_ICONS[blueOrbCount]}
							min={0}
							max={4}
							onFocus={playCursor}
						/>
					</Section>

					<Section title={t('sections.character')}>
						<NumberField
							control={control}
							name="vitality"
							label={t('fields.vitality')}
							icon={vitalStar}
							min={0}
							max={30}
							onFocus={playCursor}
						/>

						<NumberField
							control={control}
							name="devilTrigger"
							label={t('fields.devil_trigger')}
							icon={devilStar}
							min={0}
							max={10}
							onFocus={playCursor}
						/>
					</Section>

					<div className="flex justify-end pt-2">
						<Button
							type="submit"
							className="gap-2 font-display tracking-widest uppercase text-xs px-6"
							onMouseEnter={playCursor}
						>
							<Download className="w-4 h-4" />
							{t('download_button')}
						</Button>
					</div>
				</form>
			)}

			{selectedSlot?.isEmpty && (
				<p className="text-muted-foreground/40 text-sm font-mono text-center py-8">
					{t('empty_slot_message')}
				</p>
			)}
		</main>
	);
}
