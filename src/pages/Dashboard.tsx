import { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import AuthContext from "../contexts/AuthContext"

const Dashboard = () => {
  const { token } = useContext(AuthContext)
  const Navigate = useNavigate()
  
  useEffect(() => {
    if(token.length === 0) Navigate("/")
  },[])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Navigate(e.currentTarget.name)
  }

  return(
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <h1>What do you want to do?</h1>
        <div>
          <button name="/dashboard/all-players" onClick={handleClick}className="login-button">show all players</button>
          <button name="/dashboard/player-editor"onClick={handleClick} className="login-button">edit player</button>
        </div>
      </div>
      <h1>{token}</h1>
    </div>
  )
}

export default Dashboard