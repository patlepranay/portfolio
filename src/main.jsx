import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from '@vercel/analytics/react';

import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster />
    <Analytics/>
  </React.StrictMode>
);
