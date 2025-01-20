import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
    let user;

    try {
        // Parse user information from localStorage
        const userData = localStorage.getItem('user');
        user = userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        user = null; // Ensure `user` is null in case of an error
    }

    // Check if user exists and is an admin
    return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
