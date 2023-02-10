import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const NotFoundPage = () => {
  const Navigate = useNavigate();
  const { token } = useContext(AuthContext);

  return (
    <div
      className="dashboard-page"
      style={{ color: "white", fontFamily: "Arial" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          border: "5px solid red",
          backgroundColor: "rgba(155,155,155, .2)",
          padding: 25,
          borderRadius: 30,
        }}
      >
        <h1 style={{ fontSize: 68, textDecoration: "underline", margin: 0, }}>404?!!</h1>
        <h1>This page doesnt exist!</h1>
        {token ? (
          <button onClick={() => Navigate("/dashboard")}>
            back to dashboard
          </button>
        ) : (
          <button onClick={() => Navigate("/")} className="login-button">back to login</button>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
