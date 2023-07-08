import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import '../index.css';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PostContainer from '../components/PostContainer';
import { AuthContextProvider } from '../components/context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import NotProtectedRoute from '../components/NotProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/login',
    element:
  <NotProtectedRoute>
    <Login />
  </NotProtectedRoute>,
  },
  {
    path: '/signup',
    element:
  <NotProtectedRoute>
    <SignUp />
  </NotProtectedRoute>,
  },
  {
    path: '/explore',
    element:
  <ProtectedRoute>
    <PostContainer path="explore" />
  </ProtectedRoute>,
  }, {
    path: '/feed',
    element:
  <ProtectedRoute>
    <PostContainer path="feed" />
  </ProtectedRoute>,
  }, {
    path: '/profile/:id',
    element:
  <PostContainer path="profile" />,
  },
]);
export default router;
