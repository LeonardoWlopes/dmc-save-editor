import type { ReactNode } from 'react';

export interface IFieldWrapperProps {
	label: string;
	error?: string;
	id: string;
	icon?: string;
	children: ReactNode;
}
