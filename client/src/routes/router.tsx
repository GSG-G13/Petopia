import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import '../index.css';
import Stats from '../components/dashboard/Stats';
import DashBoard from '../components/dashboard/DashBoard';
import Users from '../components/dashboard/Users';
import Posts from '../components/dashboard/Posts';
import PostContainer from '../components/PostContainer';
import { AuthContextProvider } from '../components/context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/explore',
    element:
  <AuthContextProvider>
    <PostContainer path="explore" />
  </AuthContextProvider>,
  }, {
    path: '/feed',
    element:
  <AuthContextProvider>
    <PostContainer path="feed" />
  </AuthContextProvider>,
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
        path: '/dashboard/posts',
        element: <Posts />,
      },
    ],
  },
]);
export default router;
