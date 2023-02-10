import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const Navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Navigate(e.currentTarget.name)

  };

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 5,
        height: "fit-content",
        width: "99%",
        backgroundColor: "grey",
        display: "flex",
        alignContent: "center",
        gap: 25,
        marginBottom: 10
      }}
    >
      <button
        name="/dashboard"
        className="login-button"
        style={{ margin: 0 }}
        onClick={handleClick}
      >
        Main menu
      </button>
      <button
        name="/dashboard/all-players"
        className="login-button"
        style={{ margin: 0 }}
        onClick={handleClick}
      >
        All Players
      </button>
      <button
        name="/dashboard/player-editor"
        className="login-button"
        style={{ margin: 0 }}
        onClick={handleClick}
      >
        Player editor
      </button>
    </div>
  );
};
export default NavBar;
