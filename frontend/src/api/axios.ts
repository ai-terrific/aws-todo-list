import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://8liknrklsh.execute-api.us-east-1.amazonaws.com/dev";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
