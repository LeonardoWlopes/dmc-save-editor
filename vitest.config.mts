import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: 'jsdom',
		passWithNoTests: true,
		globals: true,
		include: ['src/**/*.spec.ts'],
		coverage: {
			include: ['src/**/*.ts', 'src/**/container.*'],
			exclude: [
				'**/__tests__/**',
				'**/*.spec.*',
				'**/*.d.ts',
				'**/node_modules/**',
				'**/enums/**',
				'**/interfaces/**',
				'**/types.ts/**',
				'**/styles.ts/**',
				'**/i18n/**',
				'**/services/**',
			],
			reporter: ['html', 'json-summary', 'clover', 'json'],
			all: true,
			enabled: true,
		},
	},
});
