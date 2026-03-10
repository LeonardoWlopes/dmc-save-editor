/* v8 ignore start */

import { z } from 'zod';
import { t } from '~/i18n/config';

const envSchema = z.object({
	GITHUB_REPO_URL: z.string().url(),
	DEV: z.boolean().default(false),
});

const _env = envSchema.safeParse({
	GITHUB_REPO_URL: import.meta.env.VITE_GITHUB_REPO_URL,
	DEV: import.meta.env.DEV,
});

if (!_env.success) {
	const errorTable = Object.entries(_env.error.flatten().fieldErrors).reduce(
		(acc, [key, value]) => {
			acc[key] = value.join(', ');
			return acc;
		},
		{} as Record<string, string>,
	);

	throw new Error(
		`${t('errors.environment_variables')} \n${JSON.stringify(errorTable, null, 2)}`,
	);
}

export const env = _env.data;
/* v8 ignore end */
