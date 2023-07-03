import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import PostCard from '../components/post/PostCard';
import fakeData from '../helpers/fakeData.json';
import '../index.css';
import ExplorePosts from '../components/explore';
import { AuthContextProvider } from '../components/context/AuthContext';

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
    path: '/explore',
    element:
  <AuthContextProvider>
    <ExplorePosts />
  </AuthContextProvider>,
  },
]);
export default router;
