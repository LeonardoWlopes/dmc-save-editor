import { useGetOrganization } from '~/services/organization';

export function useHomeContainer() {
	const { data: organization, isLoading: isLoadingOrganization } =
		useGetOrganization();

	return {
		organization,
		isLoadingOrganization,
	};
}
