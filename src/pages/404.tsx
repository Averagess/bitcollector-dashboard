import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MainContent, PageContainer } from "../components"
import AuthContext from "../contexts/AuthContext";

const NotFoundPage = () => {
  const Navigate = useNavigate();
  const { token } = useContext(AuthContext);

  return (
    <PageContainer>
      <MainContent>
        <h1 style={{ fontSize: 68, textDecoration: "underline", margin: 0 }}>
          404?!!
        </h1>
        <h1>This page doesnt exist!</h1>
        {token ? (
          <button onClick={() => Navigate("/dashboard")}>
            back to dashboard
          </button>
        ) : (
          <button onClick={() => Navigate("/")} className="login-button">
            back to login
          </button>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default NotFoundPage;
