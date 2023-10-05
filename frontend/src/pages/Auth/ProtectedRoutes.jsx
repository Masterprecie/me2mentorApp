import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const ProtectedAdminRoute = ({ element }) => {
	const { user } = useContext(AuthContext);

	if (user && user.role === 'admin') {
		return element;
	} else {
		return <Navigate to="/login" />;
	}
};

ProtectedAdminRoute.propTypes = {
	element: PropTypes.node,
};


export default ProtectedAdminRoute;
