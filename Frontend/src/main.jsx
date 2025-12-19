import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App.jsx";

// 1. Import BrowserRouter
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // 2. Wrap App with BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
