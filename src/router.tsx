import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Layout } from './components/layout';
import { LoadingScreen } from './screens/loading';

const HomeScreen = lazy(() => import('./screens/home'));

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomeScreen />,
			},
			{
				path: '*',
				element: <Navigate to="/" />,
			},
		],
	},
]);

export function Router() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}
