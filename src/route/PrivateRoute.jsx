import React, { useContext } from 'react';
import { AuthContext } from '../components/Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	//1st step bring the user from
	const { user, loading } = useContext(AuthContext);
	if (loading) {
		return <div>Loading....</div>;
	}
	if (user) {
		return children;
	}
	return <Navigate replace to='/login'></Navigate>;
};

export default PrivateRoute;
