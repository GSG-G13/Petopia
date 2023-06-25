import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import PostCard from './components/post/PostCard.tsx';
import fakeData from './helpers/fakeData.json';
import './index.css'
const post = fakeData.post;
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/post',
        element: <PostCard post={post} />
    }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)
