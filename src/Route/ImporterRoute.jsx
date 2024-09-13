import { createBrowserRouter } from "react-router-dom";
import ImporterLayout from "../Layout/ImporterLayout";
import ImporterDashboard from "../assets/pages/Importer/ImporterDashboard";
import ImporterDeclaration from "../assets/pages/Importer/ImporterDeclarations";
import ImporterPayment from "../assets/pages/Importer/ImporterPayment.s";
import ImporterMonitoring from "../assets/pages/Importer/ImporterMonitoring";

const importerRouter = createBrowserRouter([
  {
    path: "/importer/dashboard",
    element: <ImporterLayout />, // This ensures ImporterLayout renders
    children: [
      {
        path: "dashboard",
        element: <ImporterDashboard />, // Render dashboard by default
      },
      {
        path: "declaration",
        element: <ImporterDeclaration />,
      },
      {
        path: "payment",
        element: <ImporterPayment />,
      },
      {
        path: "monitoring",
        element: <ImporterMonitoring />,
      },
    ],
  },
]);

export default importerRouter;
