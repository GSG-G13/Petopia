import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import '../index.css';
import Stats from '../components/dashboard/Stats';
import DashBoard from '../components/dashboard/DashBoard';
import Users from '../components/dashboard/Users';
import Posts from '../components/dashboard/Posts';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PostContainer from '../components/PostContainer';
import Categories from '../components/dashboard/Categories';
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
  {
    path: '/dashboard',
    element: <DashBoard />,
    children: [
      {
        path: '/dashboard',
        element: <Stats />,
      },
      {
        path: '/dashboard/users',
        element: <Users />,
      },
      {
        path: '/dashboard/categories',
        element: <Categories />,
      },
      {
        path: '/dashboard/posts',
        element: <Posts />,
      },
    ],
  },
]);
export default router;
