import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostCard from './components/PostCard.tsx';

const router = createBrowserRouter([
    {
        path: '/post',
        element: <PostCard />
    }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <RouterProvider router={router} />
)
