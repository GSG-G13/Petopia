import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import PostCard from '../components/post/PostCard';
import fakeData from '../helpers/fakeData.json';
import '../index.css';
import Stats from '../components/dashboard/Stats';
import DashBoard from '../components/dashboard/DashBoard';
import Users from '../components/dashboard/Users';
import Posts from '../components/dashboard/Posts';

const { post } = fakeData;
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/post',
    element: <PostCard post={post} />,
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
