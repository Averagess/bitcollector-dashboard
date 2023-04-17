import { useNavigate } from "react-router-dom";

import GenericButton from "./GenericButton";

const NavBar = () => {
  const Navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Navigate(e.currentTarget.name);
  };

  return (
    <div className="font-arial h-fit w-full bg-zinc-900 flex content-center gap-6 mb-2">
      <GenericButton name="/dashboard" onClick={handleClick}>
        Main menu
      </GenericButton>
      <GenericButton name="/dashboard/all-players" onClick={handleClick}>
        All Players
      </GenericButton>
      <GenericButton name="/dashboard/player-editor" onClick={handleClick}>
        Player editor
      </GenericButton>
      <GenericButton name="/dashboard/analytics" onClick={handleClick}>
        Analytics
      </GenericButton>
    </div>
  );
};
export default NavBar;
