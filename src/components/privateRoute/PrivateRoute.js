import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Authentication function (replace with actual auth logic)
const getUserAuth = () => {
    const access_token = localStorage.getItem('access_token'); // Fetch token from storage
    const user_role = localStorage.getItem('user_role'); // Fetch user role

    return {
        isAuthenticated: !!access_token, // If token exists, user is authenticated
        user_role
    };
};

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user_role } = getUserAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user_role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />; // Render the nested routes
};

export default PrivateRoute;
