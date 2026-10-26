import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Scheduler from "./Scheduler.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {window.location.pathname.replace(/\/$/, "") === "/scheduler" ? <Scheduler /> : <App />}
  </React.StrictMode>
);
