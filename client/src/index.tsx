import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import PageNotFound from './components/commons/PageNotFound';
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
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/post',
    element: <PostCard post={post} />,
  }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);

