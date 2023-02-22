import readableNumber from "../helpers/readableNumber";
import { Player } from "../types";

interface Props {
  player: Player;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const PlayerCard = ({ player, onClick }: Props) => {
  const createdAt = new Date(player.createdAt).toLocaleString();
  const updatedAt = new Date(player.updatedAt).toLocaleString();
  const readableBalance = readableNumber(player.balance);
  const readableCPS = readableNumber(player.cps.toString());

  const playerName =
    player.discordDisplayName.length > 14
      ? player.discordDisplayName.slice(0, 14) + "..."
      : player.discordDisplayName;

  return (
    <div
      className="flex min-h-fit cursor-pointer flex-col items-center rounded-2xl bg-white bg-gradient-to-br from-white to-gray-300 p-3 font-arial text-black"
      id={player.discordId}
      onClick={(e) => onClick(e)}
    >
      <h1 className="text-xl font-bold">{playerName}</h1>
      <div className="text-m flex font-light">
        <div className="m-1 h-16 min-w-[4rem] max-w-fit rounded-2xl border-2 border-black p-1">
          <h2 className="font-semibold underline">Balance</h2>
          <b className="text-sm">{readableBalance}</b>
        </div>
        <div className="m-1 h-16 min-w-[4rem] max-w-fit rounded-2xl border-2 border-black p-1">
          <h2 className="font-semibold underline">CPS</h2>
          <b className="text-sm">{readableCPS}</b>
        </div>
      </div>

      <p className="text-gray-500">
        Created <b>{createdAt}</b>
      </p>
      <p className="text-gray-500">
        Updated <b>{updatedAt}</b>
      </p>
    </div>
  );
};

export default PlayerCard;
