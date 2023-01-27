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

  return(
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <h1>What do you want to do?</h1>
        <div>
          <button onClick={() => Navigate("/player-editor")} className="login-button">edit player</button>
          <button className="login-button">show all players</button>
        </div>
      </div>
      <h1>{token}</h1>
    </div>
  )
}

export default Dashboard