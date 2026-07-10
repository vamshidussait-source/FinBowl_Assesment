import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard";
import Disbursement from "../pages/Disbursement";
import LoanDetails from "../pages/LoanDetails";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "disbursement",
        element: <Disbursement />,
      },
      {
        path: "loan/:id",
        element: <LoanDetails />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
