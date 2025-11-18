import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App
      future={{
        v7_startTransition: true, // ativa o comportamento novo
      }}
    />
  </React.StrictMode>
);
