import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const Navigate = useNavigate();

  useEffect(() => {
    if (token.length === 0) Navigate("/");
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Navigate(e.currentTarget.name);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>What do you want to do?</h1>
        <div>
          <button
            name="/dashboard/all-players"
            onClick={handleClick}
            className="login-button"
          >
            show all players
          </button>
          <button
            name="/dashboard/player-editor"
            onClick={handleClick}
            className="login-button"
          >
            edit player
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
