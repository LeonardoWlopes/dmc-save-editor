import { useId } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { EDmc1Difficulty } from '~/enums/dmc1';
import { cn } from '~/lib/utils';
import type { IDifficultyFieldProps } from './types';

const DIFFICULTY_VALUES = Object.values(EDmc1Difficulty).filter(
	(v): v is EDmc1Difficulty => typeof v === 'number',
);

export function DifficultyField<T extends FieldValues>({
	control,
	name,
	onFocus,
}: IDifficultyFieldProps<T>) {
	const { t } = useTranslation('dmc1_difficulty_field');

	const id = useId();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, formState: { errors } }) => {
				const error = errors.difficulty?.message?.toString() ?? undefined;
				const value = field.value as EDmc1Difficulty;

				return (
					<div className="flex flex-col gap-1.5">
						<span
							id={id}
							className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
						>
							{t('label')}
						</span>

						<Select
							value={String(value)}
							onValueChange={(v) => {
								field.onChange(Number(v));
								onFocus?.();
							}}
						>
							<SelectTrigger
								aria-labelledby={id}
								onFocus={onFocus}
								className={cn(
									'w-full min-w-0 bg-background border-border font-mono text-sm h-8 focus:ring-primary/40',
									error && 'border-red-500/60',
								)}
							>
								<SelectValue>
									{value != null ? t(String(value) as never) : null}
								</SelectValue>
							</SelectTrigger>

							<SelectContent className="bg-card border-border">
								{DIFFICULTY_VALUES.map((val) => (
									<SelectItem
										key={val}
										value={String(val)}
										className="font-mono text-sm"
									>
										{t(String(val) as never)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{error && (
							<span className="text-[10px] text-red-400 font-mono">
								{error}
							</span>
						)}
					</div>
				);
			}}
		/>
	);
}
