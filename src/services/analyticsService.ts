import axios from "axios";

import { Analytic } from "../types";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "http://3.73.209.127:8080";

interface Query {
  amount?: number;
  after?: string;
  before?: string;
}

const getAnalytics = async (token: string, query: Query) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let url = `${API_URL}/api/analytics`;

  if (query && Object.keys(query).length > 0) {
    url += "?";
    let i = 0;
    for (const [key, value] of Object.entries(query)) {
      if(i > 0 && value !== undefined) url += "&";
      if(value !== undefined) url += `${key}=${value}`;
      i++;
    }
  }

  const { data } = await axios.get<Analytic[]>(url, { headers });

  return { data };
};

export { getAnalytics };
