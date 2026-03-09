import type { ChangeEvent } from 'react';
import { useId } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';
import { FieldWrapper } from '../field-wrapper';
import type { INumberFieldProps } from './types';

export function NumberField<T extends FieldValues>({
	control,
	name,
	label,
	min,
	max,
	icon,
	onFocus,
}: INumberFieldProps<T>) {
	const id = useId();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, formState: { errors } }) => {
				const error = errors[name]?.message?.toString() ?? undefined;

				return (
					<FieldWrapper label={label} error={error} id={id} icon={icon}>
						<Input
							className={cn(
								'bg-background border-border font-mono text-sm h-8',
								'focus-visible:ring-primary/40 focus-visible:border-primary/60',
								error && 'border-red-500/60 focus-visible:border-red-500/60',
							)}
							id={id}
							type="number"
							min={min}
							max={max}
							onFocus={onFocus}
							value={field.value ?? ''}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								const raw = e.target.valueAsNumber;
								field.onChange(Number.isNaN(raw) ? undefined : raw);
							}}
							onBlur={field.onBlur}
						/>
					</FieldWrapper>
				);
			}}
		/>
	);
}
