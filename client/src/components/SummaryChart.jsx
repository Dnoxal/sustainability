import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function SummaryChart({ data }) {
  if (!data || !data.by_category) {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <p>No activity data yet. Add some logs to see your impact chart 🌍</p>
      </div>
    );
  }

  const chartData = Object.entries(data.by_category).map(([key, value]) => ({
    name: key,
    value,
  }));

  const COLORS = ["#16a34a", "#4ade80", "#22c55e", "#86efac"];

  return (
    <section style={{ textAlign: "center", marginTop: 30 }}>
      <h3>Your Impact Summary</h3>
      <h4 style={{ color: "#166534", marginBottom: 10 }}>
        Total Impact: {data.total_impact} kg CO₂
      </h4>

      <PieChart width={350} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </section>
  );
}
