import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className='layout'>
      <Outlet />
    </div>
  )
}

export default Layout