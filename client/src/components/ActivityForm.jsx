import { useState } from "react";
import { logActivity } from "../api";

export default function ActivityForm({ onAdd }) {
  // --- initial state ---
  const [form, setForm] = useState({
    user_id: "",
    category: "transport",
    action: "",
    quantity: 1,
  });

  // --- available users (you can expand this list) ---
  const USERS = ["neil001", "daniel001", "sarah001", "alex001"];

  // --- actions per category ---
  const ACTIONS = {
    transport: ["bike", "bus", "car", "train", "walk"],
    food: ["vegan_meal", "vegetarian_meal", "chicken_meal", "beef_meal"],
    energy: ["solar_usage", "electricity", "gas", "renewable_energy"],
    waste: ["recycling", "composting", "plastic_use", "paper_use"],
  };

  // --- handle field changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      // reset action when category changes
      setForm({ ...form, category: value, action: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // --- submit form ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_id) {
      alert("Please select a User ID!");
      return;
    }
    if (!form.action) {
      alert("Please select an action for the chosen category!");
      return;
    }

    await logActivity(form);
    onAdd(form.user_id);
  };

  const actionsForCategory = ACTIONS[form.category] || [];

  // --- render form ---
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#f4fdf6",
        border: "1px solid #c5e8d2",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "30px",
      }}
    >
      <h3 style={{ color: "#166534", marginBottom: "10px" }}>Log Activity</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {/* --- User ID bar --- */}
        <div>
          <label style={{ display: "block", fontWeight: "600" }}>
            User ID:
          </label>
          <select
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            style={{ padding: "8px", borderRadius: "6px" }}
          >
            <option value="">-- select user --</option>
            {USERS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {/* --- Category dropdown --- */}
        <div>
          <label style={{ display: "block", fontWeight: "600" }}>
            Category:
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ padding: "8px", borderRadius: "6px" }}
          >
            <option value="transport">Transport</option>
            <option value="food">Food</option>
            <option value="energy">Energy</option>
            <option value="waste">Waste</option>
          </select>
        </div>

        {/* --- Action dropdown --- */}
        <div>
          <label style={{ display: "block", fontWeight: "600" }}>
            Action:
          </label>
          <select
            name="action"
            value={form.action}
            onChange={handleChange}
            style={{ padding: "8px", borderRadius: "6px" }}
          >
            <option value="">-- select action --</option>
            {actionsForCategory.map((a) => (
              <option key={a} value={a}>
                {a.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* --- Quantity --- */}
        <div>
          <label style={{ display: "block", fontWeight: "600" }}>
            Quantity:
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            style={{
              padding: "8px",
              borderRadius: "6px",
              width: "100px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* --- Submit button --- */}
        <div style={{ alignSelf: "flex-end" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#1a6c42",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
