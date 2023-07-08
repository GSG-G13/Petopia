import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes/router';
import { AuthContextProvider } from './components/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
);
