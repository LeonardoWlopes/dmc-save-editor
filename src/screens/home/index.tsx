import { useTranslation } from 'react-i18next';
import background from '~/assets/images/background.webp';
import logo from '~/assets/images/logo.png';
import { Loading } from '~/components/loading';
import { useHomeContainer } from './container';

export default function HomeScreen() {
	const { t } = useTranslation('home');

	const { organization, isLoadingOrganization } = useHomeContainer();

	return (
		<main
			className="flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${background})`,
			}}
		>
			<div className="flex flex-col items-center">
				<img
					style={{
						animationDuration: '3s',
					}}
					className="mb-4 w-40 animate-bounce"
					src={logo}
					alt="logo"
				/>

				<h1 className="mb-8 text-center text-5xl font-bold text-white drop-shadow-lg">
					{t('title')}
				</h1>

				{isLoadingOrganization ? (
					<Loading />
				) : organization ? (
					<div className="rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm">
						<div className="flex items-center gap-4">
							<img
								src={organization.avatar_url}
								alt={organization.name}
								className="h-16 w-16 rounded-full"
							/>

							<div>
								<h2 className="text-2xl font-bold text-gray-800">
									{organization.name}
								</h2>

								<p className="text-gray-600">{organization.description}</p>
							</div>
						</div>

						<div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
							<div>
								<span className="font-semibold">
									{t('organization.location')}:
								</span>{' '}
								{organization.location || t('organization.not_informed')}
							</div>

							<div>
								<span className="font-semibold">
									{t('organization.repositories')}:
								</span>{' '}
								{organization.public_repos}
							</div>

							<div>
								<span className="font-semibold">{t('organization.blog')}:</span>{' '}
								<a
									href={organization.blog}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{organization.blog}
								</a>
							</div>

							<div>
								<span className="font-semibold">
									{t('organization.members')}:
								</span>{' '}
								<a
									href={organization.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{t('organization.view_on_github')}
								</a>
							</div>
						</div>
					</div>
				) : (
					<div className="text-white">{t('no_organization')}</div>
				)}
			</div>
		</main>
	);
}
