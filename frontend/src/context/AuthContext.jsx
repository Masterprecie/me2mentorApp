import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (storedUser) {
			setUser(storedUser);
		}
	}, []);

	const loginMentee = async (username, password) => {
		try {
			const response = await axios.post('http://localhost:5000/api/mentees/login', {
				username,
				password,
			});

			if (response.status === 200) {
				const userData = response.data;
				setUser({ ...userData, role: 'mentee' });
				// Store user data in local storage upon successful login
				localStorage.setItem('user', JSON.stringify(userData));
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Mentee Login error', error);
			return false;
		}
	};

	const loginMentor = async (username, password) => {
		try {
			const response = await axios.post('http://localhost:5000/api/mentors/login', {
				username,
				password,
			});

			if (response.status === 200) {
				const userData = response.data;
				setUser({ ...userData, role: 'mentor' });
				// Store user data in local storage upon successful login
				localStorage.setItem('user', JSON.stringify(userData));
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Mentor Login error', error);
			return false;
		}
	};


	const logout = async () => {
		try {
			const response = await axios.post('http://localhost:5000/api/admins/logout');
			if (response.status === 200) {
				setUser(null);
				localStorage.removeItem('user');
			} else {
				// Handle logout failure
			}
		} catch (error) {
			// Handle network or other errors
		}
	};


	return (
		<AuthContext.Provider value={{ user, loginMentee, loginMentor, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};
