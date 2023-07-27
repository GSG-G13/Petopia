import { ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

interface Props {
  children: ReactNode
}
const ProtectedRoute = ({ children }: Props) => {
  const { userData } = useContext(AuthContext);
  const location = useLocation();

  if (userData.userId === 0) {
    return <Navigate to="/login" />;
  } if (userData.userType === 'admin' && (location.pathname === '/feed' || location.pathname === '/')) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div>
      { children }
    </div>
  );
};

export default ProtectedRoute;
