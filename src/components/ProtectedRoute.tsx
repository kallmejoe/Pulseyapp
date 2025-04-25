import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
    requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAdmin = false
}) => {
    const { isAuthenticated, user } = useAuth();

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If admin access is required, check if user is admin
    if (requireAdmin) {
        const isAdmin = user?.isAdmin === true;
        if (!isAdmin) {
            return <Navigate to="/" replace />;
        }
    }

    // User is authenticated (and is admin if required)
    return children;
};
