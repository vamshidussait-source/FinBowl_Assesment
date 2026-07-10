import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/globals.css";
import { router } from "./routes";
import { LoanSelectionProvider } from "./context/LoanSelectionContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoanSelectionProvider>
      <RouterProvider router={router} />
    </LoanSelectionProvider>
  </React.StrictMode>,
);
