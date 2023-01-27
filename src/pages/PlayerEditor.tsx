import { AxiosError } from 'axios'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PlayerProfile from '../components/PlayerProfile'
import AuthContext from '../contexts/AuthContext'
import { getPlayerById, updatePlayer } from '../services/playerService'

import { Player } from '../types'

const PlayerEditor = () => {
  const { token } = useContext(AuthContext)
  const [search, setSearch] = useState("")
  const [player, setPlayer] = useState<null | Player>(null)
  const [notification, setNotification] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const Navigate = useNavigate()

  useEffect(() => {
    if(token.length === 0) Navigate("/")
  },[])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(search.length === 0) return

    setLoading(true)
    try {
      const player = await getPlayerById(search, token)
      setPlayer(player)
      setLoading(false)
    } catch (error) {
      if(error instanceof AxiosError){
        if(!error.response) setError("No response from server")
        else setError(error.response.data.message)
      }
      else console.log("error", error)
    }
  }

  const savePlayer = async () => {
    if(!player) return

    try {
      const data = await updatePlayer(token, player)
      setPlayer(null)
      setNotification("Player updated!")
      setTimeout(() => setNotification(""), 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const cancel = () => {
    setPlayer(null)
  }


  return(
    <div className='dashboard-page'>
      <div className='dashboard-container' style={{position: "relative",display:"flex", alignItems: "center"}}>
        <h1>Player Editor</h1>
        {notification && <p style={{color: "green"}}>{notification}</p>}
        {!player && <form onSubmit={handleSubmit}>
          <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="player id" />
        </form>}
        {player && <PlayerProfile cancel={cancel} savePlayer={savePlayer} setPlayer={setPlayer} player={player} />}
        {!player && <button onClick={() => Navigate("/dashboard")} className="login-button" style={{position: "absolute", bottom: 0}}>back to dashboard</button>}
      </div>
    </div>
  )
}

export default PlayerEditor