import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  token: "",
  setAuthenticated: (token: string) => {},
});

export default authContext;
