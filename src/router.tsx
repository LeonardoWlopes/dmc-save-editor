import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Layout } from './components/layout';
import Dmc1Screen from './screens/dmc1';
import HomeScreen from './screens/home';

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
	return <RouterProvider router={router} />;
}
