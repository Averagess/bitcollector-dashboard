import { AxiosError } from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import PlayerProfile from "../components/PlayerProfile";
import AuthContext from "../contexts/AuthContext";
import { getPlayerById, updatePlayer } from "../services/playerService";

import { Player } from "../types";

const PlayerEditor = () => {
  const { token } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [player, setPlayer] = useState<null | Player>(null);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState(" ");
  const Navigate = useNavigate();

  useEffect(() => {
    if (token.length === 0) Navigate("/");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length === 0) return;

    try {
      const player = await getPlayerById(search, token);
      setPlayer(player);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) setError("No response from server");
        else {
          setError(error.response.data.error);
          setTimeout(() => setError(""), 3000);
        }
      } else console.log("error", error);
    }
  };

  const savePlayer = async () => {
    if (!player) return;

    try {
      await updatePlayer(token, player);
      setPlayer(null);
      setNotification("Player updated!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.log("error happened trying to save player", error);
    }
  };

  const cancel = () => {
    setPlayer(null);
  };

  return (
    <div className="dashboard-page">
      <NavBar />
      <div
        className="dashboard-container"
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <h1>Player Editor</h1>
        {notification && <p style={{ color: "green" }}>{notification}</p>}
        <p style={{ color: "red" }}>{error}</p>

        {!player && (
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="player id"
              className="login-input"
              style={{marginRight: 0, borderRadius: "5px 0 0 5px", borderColor: "#9ab2b7"}}
            />
            <button className="login-button" style={{marginLeft: 0, borderRadius: "0 5px 5px 0", borderColor: "#9ab2b7"}}>search</button>
          </form>
        )}
        {player && (
          <PlayerProfile
            cancel={cancel}
            savePlayer={savePlayer}
            setPlayer={setPlayer}
            player={player}
          />
        )}
        {!player && (
          <button
            onClick={() => Navigate("/dashboard")}
            className="login-button"
            style={{ position: "absolute", bottom: 0 }}
          >
            back to dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerEditor;
