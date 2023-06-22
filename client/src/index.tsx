import React from 'react';
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostCard from './components/PostCard.tsx';

const router = createBrowserRouter([
    {
        path: '/post',
        element: <PostCard />
    }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
