export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	const dm = decimals >= 0 ? decimals : 0;
	const value = bytes / k ** i;

	return `${value.toFixed(dm)} ${sizes[i]}`;
}

export function formatMilliseconds(milliseconds: number): string {
	const timeUnits = [
		{ unit: 'm', value: 60000 },
		{ unit: 's', value: 1000 },
		{ unit: 'ms', value: 1 },
	];

	for (const { unit, value } of timeUnits) {
		if (milliseconds >= value) {
			const timeValue = milliseconds / value;

			return `${timeValue.toFixed(unit === 'ms' ? 0 : 2)}${unit}`;
		}
	}

	return '0ms';
}
