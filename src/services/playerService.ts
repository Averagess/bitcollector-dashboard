import axios from 'axios';
import { Player } from '../types';
const API_URL = 'http://localhost:3000/api'



export const getAllPlayers = async (token: string) => {
  const { data } = await axios.get(`${API_URL}/allPlayers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return data
}

export const getPlayerById = async (id: string, token: string) => {
  const body = { discordId: id }
  const headers = {
    Authorization: `Bearer ${token}`
  }


  const { data } = await axios.post<Player>(`${API_URL}/updatePlayer`, body, { headers })
  return data
}

export const updatePlayer = async (token: string, body: Player) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const { data } = await axios.put(`${API_URL}/updatePlayer`, body, { headers })
  return data
}