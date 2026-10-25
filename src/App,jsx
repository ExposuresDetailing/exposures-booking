
import React, { useState } from "react";

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    service: "",
    date: "",
    notes: ""
  });

  const update = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const submit = (event) => {
    event.preventDefault();
    // Database connection will be added next.
    console.log("Demo booking:", form);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b1120",
      color: "white",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <main style={{
        maxWidth: 520,
        margin: "auto"
      }}>
        <h1>EXPOSURES DETAILING</h1>
        <p style={{ color: "#94a3b8" }}>
          Premium Mobile Auto Detailing
        </p>

        <h2>Request an Appointment</h2>

        {submitted ? (
          <div role="status">
            <h3>Form demo completed!</h3>
            <p>
              Your information has not been sent yet.
              Online booking will be enabled soon.
            </p>
            <button onClick={() => setSubmitted(false)}>
              Start Again
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            {[
              ["name", "Full Name", "text"],
              ["phone", "Phone Number", "tel"],
              ["email", "Email Address", "email"],
              ["vehicle", "Vehicle Year, Make & Model", "text"]
            ].map(([name, label, type]) => (
              <label key={name} style={{ display: "block", marginBottom: 18 }}>
                {label}
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={update}
                  required
                  style={inputStyle}
                />
              </label>
            ))}

            <label>
              Select Service
              <select
                name="service"
                value={form.service}
                onChange={update}
                required
                style={inputStyle}
              >
                <option value="">Choose a service</option>
                <option>Interior Detailing</option>
                <option>Exterior Detailing</option>
                <option>Full Detailing</option>
              </select>
            </label>

            <label style={{ display: "block", marginTop: 18 }}>
              Preferred Appointment Date
              <input
                type="date"
                name="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={form.date}
                onChange={update}
                required
                style={inputStyle}
              />
            </label>

            <label style={{ display: "block", marginTop: 18 }}>
              Additional Details
              <textarea
                name="notes"
                value={form.notes}
                onChange={update}
                style={inputStyle}
                rows={4}
              />
            </label>

            <button type="submit" style={{
              ...inputStyle,
              marginTop: 24,
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}>
              Preview Booking Request
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

const inputStyle = {
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  padding: 13,
  marginTop: 8,
  borderRadius: 8,
  border: "1px solid #475569",
  background: "#1e293b",
  color: "white",
  fontSize: 16
};
