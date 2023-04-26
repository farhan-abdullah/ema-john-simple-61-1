import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import AuthProvider, { AuthContext } from '../Provider/AuthProvider';
const SignUp = () => {
	const [error, setError] = useState('');
	//3rd step firebase for sign up
	const { createUser } = useContext(AuthContext);
	const handleSignUp = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		const confirm = form.confirm.value;
		//reset error
		setError('')
		if (password !== confirm) {
			setError('Your password did not match');
			return;
		} else if (password.length < 6) {
			setError('Password must be 6 charecter longer');
			return;
		}
		//4th step firebase
		createUser(email, password)
			.then((res) => {
				const loggedUser = res.user;
				console.log(loggedUser);
			})
			.catch((e) => {
				setError(e.message);
			});
	};
	return (
		<div className='form-container'>
			<h2 className='form-title'>Sign Up</h2>
			<form onSubmit={handleSignUp}>
				<div className='form-control'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' required />
				</div>
				<div className='form-control'>
					<label htmlFor='password'>Password</label>
					<input type='password' name='password' required />
				</div>
				<div className='form-control'>
					<label htmlFor='confirm'>Confirm Password</label>
					<input type='password' name='confirm' required />
				</div>

				<div>
					<input className='btn-submit' type='submit' value='Sign Up' />
				</div>
			</form>
			<p>
				<small>
					Already have an account? <Link to='/login'>Login</Link>
				</small>
			</p>
			<p className='text-error'>{error}</p>
		</div>
	);
};

export default SignUp;
