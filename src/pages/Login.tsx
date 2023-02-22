import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { login } from "../services/loginService";

import {
  GenericButton,
  GenericInput,
  MainContent,
  PageContainer,
} from "../components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const { setAuthenticated, token } = useContext(AuthContext);

  useEffect(() => {
    if (token.length > 0) Navigate("/dashboard");
  });

  let timeoutID: number;
  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (timeoutID) {
      clearTimeout(timeoutID);
      setError(null);
    }
    if (username.length < 5 || password.length < 8) {
      timeoutID = setTimeout(() => setError(null), 3000);
      return setError(
        "username must be at least 5 characters and password must be at least 8 characters"
      );
    }
    setLoading(true);

    try {
      const { data } = await login(username, password);
      console.log(data);
      setLoading(false);
      setAuthenticated(data.token);
      Navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (!error.response) {
          setError("no response from server :(");
        } else if (error.response.status === 401) {
          setError("wrong username or password :(");
        } else setError(error.response.data.error);
      } else setError("something went wrong :(");
      setLoading(false);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <PageContainer>
      <MainContent classes="my-auto">
        {loading ? (
          <h1 className="text-sky-400 self-center text-xl animate-pulse">
            Loading....
          </h1>
        ) : error ? (
          <h1 className="text-red-500 self-center animate-pulse text-xl text-center">
            {error}
          </h1>
        ) : (
          <h1 className="self-center text-xl">Welcome back</h1>
        )}
        <form
          className="flex flex-col p-12 w-full items-center self-center"
          onSubmit={handleLogin}
        >
          <GenericInput
            disabled={loading}
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <GenericInput
            disabled={loading}
            placeholder="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <GenericButton disabled={loading} onClick={(e) => handleLogin(e)}>
            login
          </GenericButton>
        </form>
      </MainContent>
    </PageContainer>
  );
};

export default Login;
