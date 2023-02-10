import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PlayerEditor from './pages/PlayerEditor'
import { useState } from 'react'

import AuthContext from './contexts/AuthContext'
import AllPlayers from './pages/AllPlayers'
import PlayerProfilePage from './pages/PlayerProfile'
import NotFoundPage from './pages/404'

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
    path: "/dashboard/player-editor/",
    element: <PlayerEditor />
  },
  {
    path: "/dashboard/all-players",
    element: <AllPlayers />
  },
  {
    path: "/dashboard/all-players/:id",
    element: <PlayerProfilePage />
  },
  {
    path: "*",
    element: <NotFoundPage />
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