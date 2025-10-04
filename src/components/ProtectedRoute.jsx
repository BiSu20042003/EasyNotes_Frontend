import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { currUser } = useAuth(); 
  if (!currUser) {
    toast.error("You must be logged In");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;