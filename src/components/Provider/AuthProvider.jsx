import React, { createContext, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import app from '../../firebase/firebase.config';
//1st step for firebase
const auth = getAuth(app);
//1st step with initail value(context api)
export const AuthContext = createContext(null);
// second step(context api)
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	//2nd step firebase for sign up
	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};
	//2nd step firebase for login
	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	//firebase for logged out
	const logOut = () => {
		return signOut(auth);
	};
	const authInfo = { user, createUser, logIn, logOut };
	return (
		<div>
			<AuthContext.Provider value={authInfo}>
				{children}
				{/* children is over all application and recieve values */}
			</AuthContext.Provider>
		</div>
	);
};

export default AuthProvider;
