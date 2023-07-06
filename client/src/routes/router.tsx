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
import { AuthContextProvider } from '../components/context/AuthContext';
import Categories from '../components/dashboard/Categories';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
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
  }, {
    path: '/profile/:id',
    element:
  <AuthContextProvider>
    <PostContainer path="profile" />
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
