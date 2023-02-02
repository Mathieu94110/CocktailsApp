import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context';

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useContext<any>(AuthContext);
  return user ? children : <Navigate to="/signin" />;
};
