import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImporterLayout from "../Layout/ImporterLayout";
import Dashboard from "../assets/pages/Importer/Dashboard";
import Declaration from "../assets/pages/Importer/Declarations";
import Payment from "../assets/pages/Importer/Payment.s";
import Monitoring from "../assets/pages/Importer/Monitoring";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ImporterLayout>
        <Dashboard />
      </ImporterLayout>
    ),
  },
  {
    path: "/importer/declaration",
    element: (
      <ImporterLayout>
        <Declaration />
      </ImporterLayout>
    ),
  },
  {
    path: "/importer/payment",
    element: (
      <ImporterLayout>
        <Payment />
      </ImporterLayout>
    ),
  },
  {
    path: "/importer/monitoring",
    element: (
      <ImporterLayout>
        <Monitoring />
      </ImporterLayout>
    ),
  },
]);

const ImporterRouter = () => {
  return <RouterProvider router={router} />;
};
export default ImporterRouter;
