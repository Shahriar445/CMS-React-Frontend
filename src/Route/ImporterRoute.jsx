import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImporterLayout from "../Layout/ImporterLayout";
import ImporterDashboard from "../assets/pages/Importer/ImporterDashboard";
import ImporterDeclaration from "../assets/pages/Importer/ImporterDeclarations";
import ImporterPayment from "../assets/pages/Importer/ImporterPayment.s";
import ImporterMonitoring from "../assets/pages/Importer/ImporterMonitoring";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ImporterLayout>
        <ImporterDashboard />
      </ImporterLayout>
    ),
  },
  {
    path: "/importer/declaration",
    element: (
      <ImporterLayout>
        <ImporterDeclaration />
      </ImporterLayout>
    ),
  },
  {
    path: "/importer/payment",
    element: (
      <ImporterLayout>
        <ImporterPayment />
      </ImporterLayout>
    ),
  },
  {
    path: "/importer/monitoring",
    element: (
      <ImporterLayout>
        <ImporterMonitoring />
      </ImporterLayout>
    ),
  },
]);

const ImporterRouter = () => {
  return <RouterProvider router={router} />;
};
export default ImporterRouter;
