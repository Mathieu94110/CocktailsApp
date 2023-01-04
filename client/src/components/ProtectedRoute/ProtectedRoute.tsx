import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context';

function ProtectedRoute({ children }: { children: any }) {
  const { user } = useContext<any>(AuthContext);
  return user ? children : <Navigate to="/signin" />;
}
export default ProtectedRoute;
