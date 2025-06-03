import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { isAuthenticated, role, checkAuth, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // if (allowedRoles && !allowedRoles.includes(role)) {
  //   return <Navigate to="/403" />;
  // }

  return Component;
};

export default ProtectedRoute;
