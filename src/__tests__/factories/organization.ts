import type { IOrganization } from '~/interfaces/organization';

export function makeOrganizationSut(
	overrides?: Partial<IOrganization>,
): IOrganization {
	return {
		login: 'Buildbox-IT-Solutions',
		id: 41802223,
		node_id: 'MDEyOk9yZ2FuaXphdGlvbjQxODAyMjIz',
		url: 'https://api.github.com/orgs/Buildbox-IT-Solutions',
		repos_url: 'https://api.github.com/orgs/Buildbox-IT-Solutions/repos',
		events_url: 'https://api.github.com/orgs/Buildbox-IT-Solutions/events',
		hooks_url: 'https://api.github.com/orgs/Buildbox-IT-Solutions/hooks',
		issues_url: 'https://api.github.com/orgs/Buildbox-IT-Solutions/issues',
		members_url:
			'https://api.github.com/orgs/Buildbox-IT-Solutions/members{/member}',
		public_members_url:
			'https://api.github.com/orgs/Buildbox-IT-Solutions/public_members{/member}',
		avatar_url: 'https://avatars.githubusercontent.com/u/41802223?v=4',
		description: 'Buildbox IT Solutions ',
		name: 'Buildbox IT Solutions',
		company: null,
		blog: 'https://buildbox.com.br',
		location: 'Brazil',
		email: 'tech@buildbox.com.br',
		twitter_username: null,
		is_verified: true,
		has_organization_projects: true,
		has_repository_projects: true,
		public_repos: 18,
		public_gists: 0,
		followers: 13,
		following: 0,
		html_url: 'https://github.com/Buildbox-IT-Solutions',
		created_at: '2018-07-27T17:39:29Z',
		updated_at: '2025-01-07T13:51:05Z',
		archived_at: null,
		type: 'Organization',
		...overrides,
	};
}
