import readableNumber from "../helpers/readableNumber";
import { Player } from "../types";

interface Props {
  player: Player;
}

const StatsContainer = ({ player }: Props) => {
  const readableBalance = readableNumber(player.balance);
  const readableCps = readableNumber(player.cps.toString());

  const lastDaily = player.lastDaily
    ? new Date(player.lastDaily).toLocaleString()
    : "Never";

  const blacklistedString = player.blacklisted ? "yes" : "Not blacklisted";

  const createdAt = new Date(player.createdAt).toLocaleString();
  const updatedAt = new Date(player.updatedAt).toLocaleString();

  return (
    <table className="generic-table table-auto border-collapse">
      <tbody>
        <tr>
          <td>Balance</td>
          <td>{readableBalance}</td>
        </tr>
        <tr>
          <td>CPS</td>
          <td>{readableCps}</td>
        </tr>
        <tr>
          <td>Last daily</td>
          <td>{lastDaily}</td>
        </tr>
        <tr>
          <td>Daily count</td>
          <td>{player.dailyCount}</td>
        </tr>
        <tr>
          <td>Opened crates</td>
          <td>{player.openedCrates}</td>
        </tr>
        <tr>
          <td>Unopened crates</td>
          <td>{player.unopenedCrates}</td>
        </tr>
        <tr>
          <td>Blacklisted</td>
          <td>{blacklistedString}</td>
        </tr>
        {player.blacklisted && (
          <>
            <tr>
              <td>Blacklisted reason</td>
              <td>{player.blacklisted.reason}</td>
            </tr>
            <tr>
              <td>Blacklisted date</td>
              <td>{new Date(player.blacklisted.started).toLocaleString()}</td>
            </tr>
          </>
        )}
        <tr>
          <td>Created</td>
          <td>{createdAt}</td>
        </tr>
        <tr>
          <td>Last update</td>
          <td>{updatedAt}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatsContainer;
