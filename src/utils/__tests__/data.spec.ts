import { describe, expect, it } from 'vitest';
import { formatBytes, formatMilliseconds } from '~/utils/data';

describe('formatBytes', () => {
	it('should format bytes to the correct unit', () => {
		expect(formatBytes(0)).toBe('0 Bytes');
		expect(formatBytes(1024)).toBe('1.00 KB');
		expect(formatBytes(1048576)).toBe('1.00 MB');
		expect(formatBytes(1073741824)).toBe('1.00 GB');
		expect(formatBytes(1099511627776)).toBe('1.00 TB');
	});

	it('should format bytes with the specified number of decimals', () => {
		expect(formatBytes(1024, 0)).toBe('1 KB');
		expect(formatBytes(1024, 3)).toBe('1.000 KB');
		expect(formatBytes(1048576, 1)).toBe('1.0 MB');
	});

	it('should handle negative decimals by setting them to 0', () => {
		expect(formatBytes(1024, -1)).toBe('1 KB');
	});
});

describe('formatMilliseconds', () => {
	it('should format milliseconds to the correct unit', () => {
		expect(formatMilliseconds(0)).toBe('0ms');
		expect(formatMilliseconds(999)).toBe('999ms');
		expect(formatMilliseconds(1000)).toBe('1.00s');
		expect(formatMilliseconds(60000)).toBe('1.00m');
	});

	it('should format milliseconds with the correct precision', () => {
		expect(formatMilliseconds(1500)).toBe('1.50s');
		expect(formatMilliseconds(65000)).toBe('1.08m');
	});

	it('should handle edge cases', () => {
		expect(formatMilliseconds(1)).toBe('1ms');
		expect(formatMilliseconds(1001)).toBe('1.00s');
	});
});
