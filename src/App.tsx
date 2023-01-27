import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PlayerEditor from './pages/PlayerEditor'
import { useEffect, useState } from 'react'

import AuthContext from './contexts/AuthContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/player-editor",
    element: <PlayerEditor />
  }
])




const App = () => {
  const [auth, setAuth] = useState({
    authenticated: false,
    token: ""
  })


  const setAuthenticated = (token: string) => {
    setAuth({authenticated: true, token})
  }

  return (
    <AuthContext.Provider value={{ token: auth.token, authenticated: auth.authenticated, setAuthenticated }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;