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
    <div className="flex flex-col bg-white rounded-2xl p-3 text-black font-arial items-center cursor-pointer min-h-fit" id={player.discordId} onClick={(e) => onClick(e)}>
      <h1 className="font-bold text-xl">{playerName}</h1>
      <div className="flex text-m font-light">
        <div className="border-2 border-black m-1 p-1 rounded-2xl min-w-[4rem] h-16 max-w-fit">
          <h2 className="underline font-semibold">Balance</h2>
          <b className="text-sm">{readableBalance}</b>
        </div>
        <div className="border-2 border-black m-1 p-1 rounded-2xl min-w-[4rem] h-16 max-w-fit">
          <h2 className="underline font-semibold">CPS</h2>
          <b className="text-sm">{readableCPS}</b>
        </div>
      </div>
      
      <p className="text-gray-500">Created <b>{createdAt}</b></p>
      <p className="text-gray-500">Updated <b>{updatedAt}</b></p>
    </div>
  );
};

export default PlayerCard;