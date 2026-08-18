import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { InteractionProvider } from "./context/InteractionContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <InteractionProvider><App /></InteractionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
