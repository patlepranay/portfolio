import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeContext";

/* ------------------------------------------------------------------ */
/*  Google Analytics (GA4) — loaded at runtime from VITE_GA_ID.          */
/*  The ID lives in the git-ignored .env, not in source, and no tracking *
/*  script loads unless it is set (so local/SSR builds stay clean).      */
/* ------------------------------------------------------------------ */
const GA_ID = import.meta.env?.VITE_GA_ID;
if (GA_ID) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

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
