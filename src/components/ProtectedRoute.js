import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Loading authentication...</h3>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
