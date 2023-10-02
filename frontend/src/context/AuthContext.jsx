import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (storedUser) {
			setUser(storedUser)
		}
	}, []);

	const login = async (username, password) => {
		try {
			const response = await axios.post('http://localhost:5000/api/login', {
				username,
				password
			});

			if (response.status === 200) {
				const userData = response.data;
				setUser(userData);
				// Store user data in local storage upon successful login
				localStorage.setItem('user', JSON.stringify(userData));
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Login error', error);
			return false
		}
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)


}

AuthProvider.propTypes = {
	children: PropTypes.node
}