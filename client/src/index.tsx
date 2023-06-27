import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
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
    path: 'login',
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
