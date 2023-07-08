import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

interface Props {
  children: ReactNode
}
const NotProtectedRoute = ({ children }: Props) => {
  const { userData } = useContext(AuthContext);

  if (userData.userId !== 0) {
    return <Navigate to="/feed" />;
  }
  return (
    <div>
      { children }
    </div>
  );
};

export default NotProtectedRoute;
