import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <App />
  </StrictMode>
);
