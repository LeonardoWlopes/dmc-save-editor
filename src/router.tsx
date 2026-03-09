import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { useShallow } from 'zustand/shallow';
import { LoadingScreen } from './screens/loading';
import { useAuthStore } from './stores/auth';

const HomeScreen = lazy(() => import('./screens/home'));

export function Router() {
	const isLoggedIn = useAuthStore(useShallow((state) => !!state.accessToken));

	const authRoutes = createBrowserRouter([
		{
			path: '/',
			element: <HomeScreen />,
		},
		{
			path: '*',
			element: <Navigate to="/" />,
		},
	]);

	const appRoutes = createBrowserRouter([
		{
			path: '/',
			element: <HomeScreen />,
		},
		{
			path: '*',
			element: <Navigate to="/" />,
		},
	]);

	return (
		<Suspense fallback={<LoadingScreen />}>
			<RouterProvider router={isLoggedIn ? appRoutes : authRoutes} />
		</Suspense>
	);
}
