import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const API = axios.create({
  baseURL: API_BASE,
});

export const logActivity = (data) => API.post("/activities/", data);
export const getUserSummary = (userId) => API.get(`/activities/${userId}/summary`);
export const getLeaderboard = () => API.get("/activities/leaderboard");
export const getUserHistory = (userId) => API.get(`/activities/${userId}`);
