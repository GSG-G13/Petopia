import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import '../index.css';
import HomePage from '../components/HomePage';

// const { post } = fakeData;
import PostContainer from '../components/PostContainer';
import { AuthContextProvider } from '../components/context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/home',
    element: <HomePage />,
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
]);
export default router;
