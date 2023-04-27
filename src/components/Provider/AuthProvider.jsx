import React, { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
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
	//loding jai ta true thakbe, kaj shesh hoe gale false pathay dibo ete
	const [loading, setLoading] = useState(true);

	const [user, setUser] = useState(null);
	//2nd step firebase for sign up
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	//2nd step firebase for login
	const logIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	//firebase for logged out
	const logOut = () => {
		return signOut(auth);
	};
	//observer user auth state, state change holai kisu korbo, get the current sign-in user
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		// stop observing by unmounting
		return () => {
			return unsubscribe();
		};
	}, []);

	const authInfo = { user, createUser, logIn, logOut, setLoading, loading };
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
