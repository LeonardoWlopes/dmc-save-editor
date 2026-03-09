import type { InputHTMLAttributes } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { IDefaultComponentProps } from '~/interfaces/common';

export interface INumberFieldProps<T extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement>,
		IDefaultComponentProps {
	control: Control<T>;
	name: Path<T>;
	label: string;
	min?: number;
	max?: number;
	icon?: string;
}
