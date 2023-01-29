import { AxiosError } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { Player } from "../types";

import { getAllPlayers } from "../services/playerService";
import PlayerCard from "../components/PlayerCard";
import GenericLoadingPage from "../components/GenericLoadingPage";

const AllPlayers = () => {
  const { token } = useContext(AuthContext);
  const [players, setPlayers] = useState<null | Player[]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | String>(null);
  const Navigate = useNavigate();

  if (token.length === 0) Navigate("/");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const players = await getAllPlayers(token);
        setPlayers(players);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (!error.response) setError("No response from server");
          else setError(error.response.data.message);
        } else console.log("error", error);
      }
    };
    fetchPlayers();
  }, []);

  if (loading || !players) return <GenericLoadingPage />;

  const handleClick = (e: React.MouseEvent) => {
    const targetID = e.currentTarget.id
    Navigate(`/dashboard/all-players/${targetID}`)
  }

  const Card = players.map((player, index) => {
    return <PlayerCard key={index} player={player} onClick={handleClick} />;
  });

  return (
    <div className="dashboard-page">
      <div
        style={{
          width: "75%",
          height: "75%",
          borderRadius: "5%",
          gridTemplateColumns: "repeat(3, 1fr)",
          display: "grid",
          overflow: "auto",
        }}
        className="dashboard-container"
      >
        {Card}
      </div>
    </div>
  );
};

export default AllPlayers;
