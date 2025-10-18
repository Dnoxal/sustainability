import { useEffect, useState } from "react";
import {
  getUserSummary,
  getLeaderboard,
  getUserHistory,
} from "./api";
import ActivityForm from "./components/ActivityForm";
import SummaryChart from "./components/SummaryChart";
import Leaderboard from "./components/Leaderboard";
import HistoryTable from "./components/HistoryTable";
import "./App.css";

export default function App() {
  // ✅ All hooks go INSIDE the component
  const [summary, setSummary] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [history, setHistory] = useState(null);
  const [currentUser, setCurrentUser] = useState("neil001");

  // Load data for current user
  const loadData = async (user = currentUser) => {
    try {
      const [s, l, h] = await Promise.all([
        getUserSummary(user),
        getLeaderboard(),
        getUserHistory(user),
      ]);
      setSummary(s.data);
      setLeaderboard(l.data);
      setHistory(h.data);
      setCurrentUser(user);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>🌿 Sustainability Impact Tracker</h1>
      <ActivityForm onAdd={loadData} />
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <SummaryChart data={summary} />
        </div>
        <div style={{ flex: 1 }}>
          <Leaderboard data={leaderboard} />
        </div>
      </div>
      <section>
        <HistoryTable data={history} />
      </section>
    </div>
  );
}
