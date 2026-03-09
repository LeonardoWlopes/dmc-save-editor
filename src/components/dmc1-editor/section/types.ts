import type { ReactNode } from 'react';

export interface ISectionProps {
	title: string;
	children: ReactNode;
	cols?: 2 | 3;
}
