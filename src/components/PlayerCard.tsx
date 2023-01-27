import { Player } from "../types";


const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <div className="player-card">
      <h1>{player.discordDisplayName}</h1>
      <div className="economy-stats">
        <h2>balance: {player.balance}</h2>
        <h2>CPS: {player.cps}</h2>
      </div>
      <h2>Created: {player.createdAt}</h2>
    </div>
  );
};

export default PlayerCard;