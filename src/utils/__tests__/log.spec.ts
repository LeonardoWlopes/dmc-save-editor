import { format } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { devError, devLog, devWarn } from '../log';

vi.mock('../env', () => ({
	env: { DEV: true, NEXT_PUBLIC_DEV: true },
}));

describe('log', () => {
	const originalConsoleLog = console.log;
	const originalConsoleError = console.error;
	const originalConsoleWarn = console.warn;

	beforeEach(() => {
		console.log = vi.fn();
		console.error = vi.fn();
		console.warn = vi.fn();
	});

	afterEach(() => {
		console.log = originalConsoleLog;
		console.error = originalConsoleError;
		console.warn = originalConsoleWarn;
	});

	it('should log messages with devLog when env.DEV is true', () => {
		const message = 'test log';
		devLog(message);
		expect(console.log).toHaveBeenCalledWith(
			format(new Date(), 'HH:mm:ss'),
			message,
		);
	});

	it('should log errors with devError when env.DEV is true', () => {
		const error = 'test error';
		devError(error);
		expect(console.error).toHaveBeenCalledWith(
			format(new Date(), 'HH:mm:ss'),
			error,
		);
	});

	it('should log warnings with devWarn when env.DEV is true', () => {
		const warning = 'test warning';
		devWarn(warning);
		expect(console.warn).toHaveBeenCalledWith(
			format(new Date(), 'HH:mm:ss'),
			warning,
		);
	});
});
