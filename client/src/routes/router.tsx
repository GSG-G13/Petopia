import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PostContainer from '../components/PostContainer';
import NotProtectedRoute from '../components/NotProtectedRoute';

import '../index.css';

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
  // {
  //   path: '/profile/:id',
  //   element:
  // <PostContainer path="profile" />,
  // },
]);
export default router;
