import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";
import AnimatedCursor from "react-animated-cursor";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster />
    <AnimatedCursor
      innerSize={4}
      outerSize={20}
      innerScale={1}
      outerScale={1.5}
      outerAlpha={0}
      hasBlendMode={false}
      innerStyle={{
        backgroundColor: "var(--cursor-color)",
      }}
      outerStyle={{
        border: "3px solid #595959",
      }}
    />
    <Analytics />
  </React.StrictMode>
);
