import type { IFieldWrapperProps } from './types';

export function FieldWrapper({
	label,
	error,
	id,
	icon,
	children,
}: IFieldWrapperProps) {
	return (
		<div className="flex flex-col gap-1.5">
			<label
				htmlFor={id}
				className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-muted-foreground"
			>
				{icon && (
					<img
						src={icon}
						alt=""
						className="w-5 h-5 object-contain"
						aria-hidden="true"
					/>
				)}
				{label}
			</label>

			{children}

			{error && (
				<span className="text-[10px] text-red-400 font-mono">{error}</span>
			)}
		</div>
	);
}
