import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/loginService";

import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const { setAuthenticated, token } = useContext(AuthContext);

  useEffect(() => {
    if (token.length > 0) Navigate("/dashboard");
  })

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="loading-animation"></div>
        </div>
      </div>
    );
  }


  const handleLogin = async (e: any) => {
    e.preventDefault();
    if(username.length < 5 || password.length < 8) return
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
        if (!error.response) setError("no response from server :(");
        else if( error.response.status === 401) setError("wrong username or password :(")
        else setError(error.response.data.error);
      } else setError("something went wrong :(");
      setLoading(false);
    }
  };

  const scalingFontSize = (text: string) => {
    return Math.floor((400 / text.length) * 1.5) + "px";
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{token}</h1>
        {error ? (
          <h1
            style={{
              fontSize: scalingFontSize(error),
              alignSelf: "center",
              color: "red",
            }}
          >
            {error}
          </h1>
        ) : (
          <h1 style={{ alignSelf: "center" }}>Welcome back</h1>
        )}
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleLogin}
        >
          <input
            className="login-input"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
