import { Player } from "../types";
import EditField from "./EditField";
import GenericButton from "./GenericButton";

interface Props {
  player: Player;
  setPlayer: (player: any) => void;
  savePlayer: () => void;
  cancel: () => void;
}

const PlayerProfileEditor = ({ player, setPlayer, savePlayer, cancel }: Props) => {
  const handleChange = (e: any) => {
    console.log("change");
    console.log(e);
    if (e.target.name === "blacklist") {
      if (e.target.checked) {
        setPlayer((old: any) => ({
          ...old,
          blacklisted: { reason: "No reason given", started: new Date() },
        }));
      } else {
        setPlayer((old: any) => ({ ...old, blacklisted: null }));
      }
      return;
    } else if(e.target.name === "blacklisted.reason") {
      return setPlayer((old: any) => ({ ...old, blacklisted: { ...old.blacklisted, reason: e.target.value } }));
    }
    setPlayer((old: any) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    savePlayer();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-arial text-2xl font-bold">{player.discordDisplayName}</h1>
      <h1 className="font-arial text-2xl font-bold">{player.discordId}</h1>
      <EditField
        value={player.balance}
        onChange={handleChange}
        title="balance"
        placeholder="name"
      />
      <EditField
        value={player.cps}
        onChange={handleChange}
        title="cps"
        placeholder="cps"
      />
      <EditField
        value={player.openedCrates}
        onChange={handleChange}
        title="openedCrates"
        placeholder="openedCrates"
      />
      <EditField
        value={player.unopenedCrates}
        onChange={handleChange}
        title="unopenedCrates"
        placeholder="unopenedCrates"
      />
      <p>blacklist</p>
      <input
        type="checkbox"
        name="blacklist"
        checked={player.blacklisted !== null}
        onChange={handleChange}
      />
      {player.blacklisted !== null && (
        <EditField
          value={player.blacklisted.reason}
          onChange={handleChange}
          title="blacklisted.reason"
          placeholder=" blacklist reason"
        />
      )}
      <div>
        <p>last updated {new Date(player.updatedAt).toLocaleString()} </p>
        <p>created {new Date(player.createdAt).toLocaleString()}</p>
      </div>
      <GenericButton>save</GenericButton>
      <GenericButton type="button" onClick={cancel}>
        cancel
      </GenericButton>
    </form>
  );
};

export default PlayerProfileEditor;
