import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/commons/PageNotFound';
import '../index.css';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PostContainer from '../components/PostContainer';
import { AuthContextProvider } from '../components/context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element:
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
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
]);
export default router;
