import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider";
import Router from "./router/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
