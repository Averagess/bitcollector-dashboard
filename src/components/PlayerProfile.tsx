import { Player } from "../types";
import EditField from "./EditField";

interface Props {
  player: Player;
  setPlayer: (player: any) => void;
  savePlayer: () => void;
  cancel: () => void;
}

const PlayerProfile = ({ player, setPlayer, savePlayer, cancel }: Props) => {

  const handleChange = (e: any) => {
    console.log("change")
    console.log(e)

    setPlayer((old:any) => ({...old, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    savePlayer()
  }


  return(
    <form onSubmit={handleSubmit}>
      <h1>{player.discordDisplayName}</h1>
      <h1>{player.discordId}</h1>
      <EditField value={player.balance} onChange={handleChange} title="balance" placeholder="name" />
      <EditField value={player.cps} onChange={handleChange} title="cps" placeholder="cps" />
      <EditField value={player.openedCrates} onChange={handleChange} title="openedCrates" placeholder="openedCrates" />
      <EditField value={player.unopenedCrates} onChange={handleChange} title="unopenedCrates" placeholder="unopenedCrates" />
      <div>
        <p>last updated {new Date(player.updatedAt).toLocaleString()} </p>
        <p>created {new Date(player.createdAt).toLocaleString()}</p>
      </div>
      <button>save</button>
      <button type="button" onClick={cancel}>cancel</button>
    </form>
  )
}

export default PlayerProfile;