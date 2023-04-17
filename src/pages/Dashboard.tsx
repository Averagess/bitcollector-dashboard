import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GenericButton, MainContent, PageContainer } from "../components";

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
    <PageContainer>
      <MainContent classes="items-center w-1/2 my-auto">
        <h1 className="font-arial text-xl mb-3 underline">
          What would you like to do?
        </h1>
        <div>
          <GenericButton name="/dashboard/all-players" onClick={handleClick}>
            show all players
          </GenericButton>
          <GenericButton name="/dashboard/player-editor" onClick={handleClick}>
            edit player
          </GenericButton>
          <GenericButton name="/dashboard/analytics" onClick={handleClick}>
            show analytics
          </GenericButton>
        </div>
      </MainContent>
    </PageContainer>
  );
};

export default Dashboard;
