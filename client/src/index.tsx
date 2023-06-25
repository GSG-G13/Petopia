import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostCard from './components/PostCard.tsx';
import fakeData from './helpers/fakeData.json'
const post = fakeData.post;
const router = createBrowserRouter([
    {
        path: '/post',
        element: <PostCard post={post} />
    }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)
