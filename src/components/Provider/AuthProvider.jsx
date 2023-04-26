import React, { createContext } from 'react';
//1st step with initail value
export const AuthContext = createContext(null);
// second step
const AuthProvider = ({ children }) => {
	const user = { displayName: 'Zayn Abdullah' };
	const authInfo = { user };
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
