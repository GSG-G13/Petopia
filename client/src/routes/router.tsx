import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import PostCard from '../components/post/PostCard';
import fakeData from '../helpers/fakeData.json';
import '../index.css';
import SideBar from '../components/dashboard/Menu';

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
    element: <SideBar />,
  },
]);
export default router;
