import axios from "axios";
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "http://3.73.209.127:8080";

export const login = async (username: string, password: string) => {
  const body = {
    username,
    password,
  };

  const { data } = await axios.post(`${API_URL}/login`, body);
  return { data };
};
