import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import PostCard from './components/post/PostCard';
import fakeData from './helpers/fakeData.json';
import './index.css';
import ExplorePosts from './components/explore';

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
    path: '/explore',
    element: <ExplorePosts />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
