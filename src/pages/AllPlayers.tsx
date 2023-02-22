import { AxiosError } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { Player } from "../types";
import { getAllPlayers } from "../services/playerService";

import { GenericLoadingPage, PlayerCard, PageContainer, NavBar } from "../components";

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
    const targetID = e.currentTarget.id;
    Navigate(`/dashboard/all-players/${targetID}`);
  };

  const CardList = players.map((player, index) => {
    return <PlayerCard key={index} player={player} onClick={handleClick} />;
  });

  return (
    <PageContainer>
      <NavBar />
      <div className="font-arial overflow-none grid p-12 text-white bg-zinc-900 rounded-xl m-auto border-2 border-red-500 min-w-fit min-h-fit grid-cols-1 overflow-y-scroll overflow-x-hidden gap-2 md:grid-cols-2 xl:grid-cols-3">
        {CardList}
      </div>
    </PageContainer>
  );
};

export default AllPlayers;
