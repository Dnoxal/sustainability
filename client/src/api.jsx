import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: `${API_BASE}/activities`,
});

export const logActivity = (data) => API.post("/", data);
export const getUserSummary = (userId) => API.get(`/${userId}/summary`);
export const getLeaderboard = () => API.get("/leaderboard");
export const getUserHistory = (userId) => API.get(`/${userId}`);
