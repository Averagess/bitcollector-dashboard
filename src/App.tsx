import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import { Login, Dashboard, PlayerEditor, AllPlayers, PlayerProfile, NotFoundPage } from './pages'
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
    path: "/dashboard/player-editor/",
    element: <PlayerEditor />
  },
  {
    path: "/dashboard/all-players",
    element: <AllPlayers />
  },
  {
    path: "/dashboard/all-players/:id",
    element: <PlayerProfile />
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