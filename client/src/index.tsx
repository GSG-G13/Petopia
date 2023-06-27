import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import App from './App';
import PostCard from './components/post/PostCard';
import fakeData from './helpers/fakeData.json';
import './index.css';

const { post } = fakeData;
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/post',
    element: <PostCard post={post} />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
