import axios from "axios";

import { Analytic } from "../types";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "http://3.73.209.127:8080";

const getAnalytics = async (token: string, amount?: number) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const { data } =
    amount && amount > 0
      ? await axios.get<Analytic[]>(
          `${API_URL}/api/analytics?amount=${amount}`, { headers }
        )
      : await axios.get<Analytic[]>(`${API_URL}/api/analytics`, { headers });

  return { data };
};

export { getAnalytics };
