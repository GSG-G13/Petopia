import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './pages/SignUp'

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Petopia</h1>
  },
  {
    path: "signup",
    element: <SignUp />
  },
  {
    path: "login",
    element: <h1>Login</h1>
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<RouterProvider router={router} />
)
