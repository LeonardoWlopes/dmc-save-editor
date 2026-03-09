import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useHomeContainer } from './container';

describe('useHomeContainer', () => {
	it('should initialize with no file loaded and not dragging', () => {
		const { result } = renderHook(() => useHomeContainer());

		expect(result.current.loadedFile).toBeNull();
		expect(result.current.isDragging).toBe(false);
	});

	it('should accept a valid .sav file', () => {
		const { result } = renderHook(() => useHomeContainer());

		const file = new File([''], 'dmc1.sav', {
			type: 'application/octet-stream',
		});

		act(() => {
			result.current.handleInputChange({
				target: { files: [file] },
			} as unknown as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.loadedFile).toEqual(file);
	});

	it('should not accept a file without .sav extension', () => {
		const { result } = renderHook(() => useHomeContainer());

		const file = new File([''], 'save.txt', { type: 'text/plain' });

		act(() => {
			result.current.handleInputChange({
				target: { files: [file] },
			} as unknown as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.loadedFile).toBeNull();
	});
});
