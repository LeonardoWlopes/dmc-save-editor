import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Layout } from './components/layout';
import { LoadingScreen } from './screens/loading';

const HomeScreen = lazy(() => import('./screens/home'));
const Dmc1Screen = lazy(() => import('./screens/dmc1'));

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: '/', element: <HomeScreen /> },
			{ path: '/dmc1', element: <Dmc1Screen /> },
			{ path: '*', element: <Navigate to="/" /> },
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
