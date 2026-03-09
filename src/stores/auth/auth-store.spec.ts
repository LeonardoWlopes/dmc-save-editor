import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAuthStore } from '~/stores/auth';

describe('useAuthStore', () => {
	beforeEach(() => {
		const { result } = renderHook(() => useAuthStore());
		act(() => {
			result.current.reset();
		});
	});

	it('should initialize with default state', () => {
		const { result } = renderHook(() => useAuthStore());
		expect(result.current.accessToken).toBeNull();
	});

	it('should set user and accessToken', () => {
		const { result } = renderHook(() => useAuthStore());
		const accessToken = 'token123';

		act(() => {
			result.current.set({ accessToken });
		});

		expect(result.current.accessToken).toEqual(accessToken);
	});

	it('should reset to default state', () => {
		const { result } = renderHook(() => useAuthStore());
		const accessToken = 'token123';

		act(() => {
			result.current.set({ accessToken });
		});

		act(() => {
			result.current.reset();
		});

		expect(result.current.accessToken).toBeNull();
	});
});
