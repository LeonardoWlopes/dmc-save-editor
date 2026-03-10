import type { IDmc1Slot } from '~/interfaces/dmc1';

export interface ISlotSelectorProps {
	slots: IDmc1Slot[];
	selectedIndex: number;
	onSelect: (index: number) => void;
}
