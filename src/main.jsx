import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>,
);
