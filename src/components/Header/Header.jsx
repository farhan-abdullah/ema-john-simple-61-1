import React, { useContext } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {
	const navigate = useNavigate();

	//4th step, to use context api import AuthContext from AuthProvider
	const { user, logOut } = useContext(AuthContext);
	const handleLogOut = () => {
		logOut()
			.then((result) => {
				navigate('login');
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	return (
		<nav className='header'>
			<img src={logo} alt='' />
			<div>
				<Link to='/'>Shop</Link>
				<Link to='/orders'>Orders</Link>
				<Link to='/inventory'>Inventory</Link>
				<Link to='/login'>Login</Link>
				<Link to='/signup'>Sign up</Link>
				{user && (
					<span style={{ color: 'white', padding: '5px' }}>
						Welcome {user.email} <button onClick={handleLogOut}>Sign out</button>
					</span>
				)}
			</div>
		</nav>
	);
};

export default Header;
