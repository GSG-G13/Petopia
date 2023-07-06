import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import '../index.css';
import SignUp from '../pages/SignUp';
import PostContainer from '../components/PostContainer';
import { AuthContextProvider } from '../components/context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
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
]);
export default router;
