import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

interface Props {
  children: ReactNode
}
const AdminProtectedRoute = ({ children }: Props) => {
  const { userData } = useContext(AuthContext);

  if (userData.userId === 0 || userData.userType === 'regular') {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      { children }
    </div>
  );
};

export default AdminProtectedRoute;
