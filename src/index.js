import "./style.css";
import React from "react";
import { createRoot } from "react-dom/client";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <div>
    <h1 className="bg-red-200 text-white">Hello, world</h1>
    <h2>how are you</h2>
  </div>
);
