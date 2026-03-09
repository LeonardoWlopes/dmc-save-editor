import type { UseQueryResult } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { makeOrganizationSut } from '~/__tests__/factories/organization';
import type { IOrganization } from '~/interfaces/organization';
import { useGetOrganization } from '~/services/organization';
import { useHomeContainer } from './container';

vi.mock('~/services/organization', () => ({
	useGetOrganization: vi.fn(),
}));

describe('useHomeContainer', () => {
	it('should return organization data and loading state', () => {
		const mockOrganization = makeOrganizationSut();

		const mockUseGetOrganization = vi.mocked(useGetOrganization);

		mockUseGetOrganization.mockReturnValue({
			data: mockOrganization,
			isLoading: false,
		} as UseQueryResult<IOrganization>);

		const { result } = renderHook(() => useHomeContainer());

		expect(result.current.organization).toEqual(mockOrganization);
		expect(result.current.isLoadingOrganization).toBe(false);
	});

	it('should return loading state as true when isLoading is true', () => {
		const mockUseGetOrganization = vi.mocked(useGetOrganization);

		mockUseGetOrganization.mockReturnValue({
			data: undefined,
			isLoading: true,
		} as UseQueryResult<IOrganization>);

		const { result } = renderHook(() => useHomeContainer());

		expect(result.current.organization).toBeUndefined();
		expect(result.current.isLoadingOrganization).toBe(true);
	});
});
