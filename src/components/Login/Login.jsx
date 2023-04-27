import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const Login = () => {
	const navigate = useNavigate();

	const { logIn } = useContext(AuthContext);

	//3rd step firebase for login

	const handleLogIn = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		logIn(email, password)
			.then((res) => {
				const loggedUser = res.user;
				//redirects to root
				form.reset()
				navigate('/');
			})
			.catch((e) => {
				console.log(e.message);
			});
	};
	return (
		<div className='form-container'>
			<h2 className='form-title'>Login</h2>
			<form onSubmit={handleLogIn}>
				<div className='form-control'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' required />
				</div>
				<div className='form-control'>
					<label htmlFor='password'>Password</label>
					<input type='password' name='password' required />
				</div>

				<div>
					<input className='btn-submit' type='submit' value='Submit' />
				</div>
			</form>
			<p>
				<small>
					New to Ema-john? <Link to='/signup'>Create New Account</Link>
				</small>
			</p>
		</div>
	);
};

export default Login;
