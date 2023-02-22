import readableNumber from "../helpers/readableNumber";
import { Player } from "../types";

interface Props {
  player: Player;
}

const StatsContainer = ({ player }: Props) => {

  const readableBalance = readableNumber(player.balance)
  const readableCps = readableNumber(player.cps.toString())

  const lastDaily = player.lastDaily
    ? new Date(player.lastDaily).toLocaleString()
    : "Never";

  const blacklistedString = player.blacklisted
    ? "yes"
    : "Not blacklisted";

  const createdAt = new Date(player.createdAt).toLocaleString();
  const updatedAt = new Date(player.updatedAt).toLocaleString();

  return (
    <table className="table-auto border-collapse">
      <tbody>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Balance</td>
          <td>{readableBalance}</td>
        </tr>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>CPS</td>
          <td>{readableCps}</td>
        </tr>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Last daily</td>
          <td>{lastDaily}</td>
        </tr>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Daily count</td>
          <td>{player.dailyCount}</td>
        </tr>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Opened crates</td>
          <td>{player.openedCrates}</td>
        </tr>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Unopened crates</td>
          <td>{player.unopenedCrates}</td>
        </tr>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Blacklisted</td>
          <td>{blacklistedString}</td>
        </tr>
        { player.blacklisted &&
        <>
          <tr className="border-1 border border-sky-500 bg-slate-900">
            <td>Blacklisted reason</td>
            <td>{player.blacklisted.reason}</td>
          </tr>
          <tr className="border-1 border border-sky-500 bg-slate-900">
            <td>Blacklisted date</td>
            <td>{new Date(player.blacklisted.started).toLocaleString()}</td>
          </tr>
        </>
        }
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Created</td>
          <td>{createdAt}</td>
        </tr>
        <tr className="border-1 border border-sky-500 bg-slate-900">
          <td>Last update</td>
          <td>{updatedAt}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatsContainer;
