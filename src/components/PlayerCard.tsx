import { MouseEventHandler } from "react";
import readableNumber from "../helpers/readableNumber";
import { Player } from "../types";


interface Props {
  player: Player;
  onClick : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const PlayerCard = ({ player, onClick }: Props) => {

  const createdAt = new Date(player.createdAt).toLocaleString()
  const updatedAt = new Date(player.updatedAt).toLocaleString()
  const readableBalance = readableNumber(player.balance)
  const readableCPS = readableNumber(player.cps.toString())

  const playerName = player.discordDisplayName.length > 14 ? player.discordDisplayName.slice(0, 14) + "..." : player.discordDisplayName


  return (
    <div className="player-card" id={player.discordId} onClick={(e) => onClick(e)}>
      <h1>{playerName}</h1>
      <div className="economy-stats">
        <div className="stat-container">
          <h2>balance</h2>
          <b>{readableBalance}</b>
        </div>
        <div className="stat-container">
          <h2>CPS</h2>
          <b>{readableCPS}</b>
        </div>
      </div>
      <p style={{padding: 0, margin: 5, color: "gray"}}>Created <b>{createdAt}</b></p>
      <p style={{padding: 0, margin: 0, color: "gray"}}>Updated <b>{updatedAt}</b></p>
    </div>
  );
};

export default PlayerCard;