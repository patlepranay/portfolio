import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <Toaster />
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
