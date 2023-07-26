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
import NotProtectedRoute from '../components/NotProtectedRoute';
import AdminProtectedRoute from '../components/AdminProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [{
      path: 'explore',
      element:
  <PostContainer path="explore" />,
    }, {
      index: true,
      element:
  <PostContainer path="feed" />,
    }, {
      path: 'feed',
      element:
  <PostContainer path="feed" />,
    },
    {
      path: 'profile/:id',
      element:
  <PostContainer path="profile" />,
    },
    {
      path: 'post/:postId',
      element:
  <PostContainer path="post" />,
    },
    ],
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
    path: '/dashboard',
    element:
  <AdminProtectedRoute>
    <DashBoard />
  </AdminProtectedRoute>,
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
    ],
  },
]);
export default router;
