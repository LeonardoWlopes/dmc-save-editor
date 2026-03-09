import { twMerge } from 'tailwind-merge';
import LoadingIcon from '~/assets/icons/loading.svg';
import type { ILoadingProps } from './types';

export function Loading({ className }: ILoadingProps) {
	return (
		<div
			className={twMerge(
				'flex aspect-square h-8 w-8 items-center justify-center text-white',
				className,
			)}
		>
			<LoadingIcon className="h-full w-full animate-spin" />
		</div>
	);
}
