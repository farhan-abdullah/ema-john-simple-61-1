import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './loaders/cartProductsLoader';
import Checkout from './components/Checkout/Checkout';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/Provider/AuthProvider';
import PrivateRoute from './route/PrivateRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home></Home>,
		children: [
			{
				path: '/',
				element: <Shop></Shop>,
			},
			{
				path: 'orders',
				element: (
					<PrivateRoute>
						<Orders></Orders>
					</PrivateRoute>
				),
				loader: cartProductsLoader,
			},
			{
				path: 'inventory',
				element: <Inventory></Inventory>,
			},
			{
				path: 'checkout',
				element: (
					<PrivateRoute>
						<Checkout></Checkout>
					</PrivateRoute>
				),
			},
			{
				path: '/login',
				element: <Login></Login>,
			},
			{
				path: '/signup',
				element: <SignUp></SignUp>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/*3d step to of context api*/}
		<AuthProvider>
			<RouterProvider router={router} />
			{/* i am am send over all application in AuthProvider function*/}
		</AuthProvider>
	</React.StrictMode>
);
