import type { Control, FieldValues, Path } from 'react-hook-form';

export interface IDifficultyFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	onFocus?: () => void;
}
