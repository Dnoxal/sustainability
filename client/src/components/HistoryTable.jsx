export default function HistoryTable({ data }) {
  return (
    <div>
      <h3>Activity History</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Action</th>
            <th>Quantity</th>
            <th>Impact (kg CO₂)</th>
          </tr>
        </thead>
        <tbody>
          {data?.activities?.map((a, i) => (
            <tr key={i}>
              <td>{new Date(a.timestamp).toLocaleString()}</td>
              <td>{a.category}</td>
              <td>{a.action}</td>
              <td>{a.quantity}</td>
              <td>{a.impact_kg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
