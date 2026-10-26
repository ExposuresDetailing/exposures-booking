
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY
);
export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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

 const submit = async (event) => {
  event.preventDefault();
  if (submitting) return;
  setSubmitting(true);
  setSubmitError("");

  try {
  const { error } = await supabase
    .from("booking_inquiries")
    .insert({
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: form.service,
      vehicle_type: "Other",
      vehicle_info: form.vehicle,
      preferred_date: form.date,
      message: form.notes
    });

  setSubmitting(false);
  if (error) {
    console.error("Booking error:", error);
    setSubmitError("We couldn’t submit your request. Please try again.");
    return;
  }

  setSubmitted(true);
  } catch (error) {
    console.error("Booking error:", error);
    setSubmitError("We couldn’t submit your request. Please try again.");
    setSubmitting(false);
  }
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
           <h3>Booking Request Submitted!</h3>
<p>
  Thank you! We received your appointment request.
  Our team will contact you to confirm availability.
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

            {submitError && <p role="alert">{submitError}</p>}
            <button type="submit" disabled={submitting} style={{
              ...inputStyle,
              marginTop: 24,
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}>
              {submitting ? "Submitting…" : "Submit Booking Request"}
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
