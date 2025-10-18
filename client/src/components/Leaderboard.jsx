export default function Leaderboard({ data }) {
  return (
    <div>
      <h3>Top Savers (Lowest CO₂ Impact)</h3>
      <ul>
        {data?.leaderboard?.map((user, i) => (
          <li key={i}>
            <strong>{i + 1}. {user.user_id}</strong> — {user.total} kg CO₂
          </li>
        ))}
      </ul>
    </div>
  );
}
