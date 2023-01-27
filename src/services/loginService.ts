import axios from 'axios';
const API_URL = 'http://localhost:3000'

export const login = async (username: string, password: string) => {
  const body = {
    username,
    password,
  };

  const { data } = await axios.post(`${API_URL}/login`, body);
  return {data};
};
