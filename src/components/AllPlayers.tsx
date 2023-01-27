
import { useEffect, useState } from "react";
import { getAllPlayers } from "../services/playerService";

import { Player } from "../types";
import PlayerCard from "./PlayerCard";

interface Props {
  token: string;
}

const AllPlayers = ({ token }: Props) => {
  const [players, setPlayers] = useState<Player[] | null>(null);

  useEffect(()=>{
    const getPlayers = async () => {
      const data = await getAllPlayers(token)
      console.log(data)
      setPlayers(data)
    }
    getPlayers()
  }, [])


  if (!players)
    return (
      <div className="player-list">
        <h1>Loading player list..</h1>
        <div className="loading-animation"></div>
      </div>
    );

  const playerList = players.map((player) => {
    return (
      <PlayerCard player={player}/>
    );
  })

  return (
    <div className="player-list">
      <h1>All Players</h1>
      {playerList}
    </div>
  );
};
export default AllPlayers;
