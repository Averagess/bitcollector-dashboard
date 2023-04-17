import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthContext from "./contexts/AuthContext";
import {
  AllPlayers,
  Dashboard,
  Login,
  NotFoundPage,
  PlayerEditor,
  PlayerProfile
} from "./pages";
import Analytics from "./pages/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/player-editor/",
    element: <PlayerEditor />,
  },
  {
    path: "/dashboard/all-players",
    element: <AllPlayers />,
  },
  {
    path: "/dashboard/all-players/:id",
    element: <PlayerProfile />,
  },
  {
    path: "/dashboard/analytics",
    element: <Analytics />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  const [auth, setAuth] = useState({
    authenticated: false,
    token: "",
  });

  const setAuthenticated = (token: string) => {
    setAuth({ authenticated: true, token });
  };

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        authenticated: auth.authenticated,
        setAuthenticated,
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
