import { useId } from 'react';
import { FieldWrapper } from '../field-wrapper';
import type { IStaticFieldProps } from './types';

export function StaticField({ label, value, icon }: IStaticFieldProps) {
	const id = useId();

	return (
		<FieldWrapper label={label} id={id} icon={icon}>
			<span className="font-mono text-sm text-foreground/50 border border-border/50 rounded-md px-3 h-8 flex items-center w-full min-w-0">
				{value}
			</span>
		</FieldWrapper>
	);
}
