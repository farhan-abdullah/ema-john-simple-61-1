import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const Login = () => {
	// show and hide password
	const [show, setShow] = useState(false);
	//redirects
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || '/';
	// finish redirects
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
				form.reset();
				//redirects to root, and replace means  do not track record
				navigate(from, { replace: true });
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
					<input type={show ? 'text' : 'password'} name='password' required />
					<button onClick={() => setShow(!show)}>
						<small>
							{show ? <span>Show password</span> : <span>Hide Password</span>}
						</small>
					</button>
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
