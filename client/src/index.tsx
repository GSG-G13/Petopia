import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Petopia</h1>,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
