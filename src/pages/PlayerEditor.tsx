import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { getPlayerById, updatePlayer } from "../services/playerService";

import {
  GenericButton,
  MainContent,
  NavBar,
  PageContainer,
  PlayerProfileEditor,
} from "../components";

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
    <PageContainer>
      <NavBar />
      <MainContent classes="items-center my-auto">
        <h1 className="font-arial text-4xl font-extrabold mb-5">
          Player Editor
        </h1>
        {notification && <p style={{ color: "green" }}>{notification}</p>}
        <p style={{ color: "red" }}>{error}</p>

        {!player && (
          <form onSubmit={handleSubmit}>
            <input
              className="p-3 rounded-l-xl border-2 border-gray-900 bg-neutral-800"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="player id"
            />
            <button className="p-3 rounded-r-xl border-y-2 border-r-2 border-gray-900 bg-neutral-800 hover:bg-neutral-700 active:shadow-button">
              search
            </button>
          </form>
        )}
        {player ? (
          <PlayerProfileEditor
            cancel={cancel}
            savePlayer={savePlayer}
            setPlayer={setPlayer}
            player={player}
          />
        ) : (
          <GenericButton onClick={() => Navigate("/dashboard")}>
            back to dashboard
          </GenericButton>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default PlayerEditor;
