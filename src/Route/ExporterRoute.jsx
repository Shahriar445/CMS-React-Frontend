import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExporterLayout from "../Layout/ExporterLayout";
import ExporterDeclaration from "../assets/pages/Exporter/ExporterDeclarations";
import ExporterDashboard from "../assets/pages/Exporter/ExporterDashboard";
import ExporterPayment from "../assets/pages/Exporter/ExporterPayment.s";
import ExporterMonitoring from "../assets/pages/Exporter/ExporterMonitoring";
const router = createBrowserRouter([
  {
    path: "/exporter",
    element: (
      <ExporterLayout>
        <ExporterDashboard />
      </ExporterLayout>
    ),
  },
  {
    path: "/exporter/declaration",
    element: (
      <ExporterLayout>
        <ExporterDeclaration />
      </ExporterLayout>
    ),
  },
  {
    path: "/exporter/payment",
    element: (
      <ExporterLayout>
        <ExporterPayment />
      </ExporterLayout>
    ),
  },
  {
    path: "/exporter/monitoring",
    element: (
      <ExporterLayout>
        <ExporterMonitoring />
      </ExporterLayout>
    ),
  },
]);

const ExporterRouter = () => {
  return <RouterProvider router={router} />;
};
export default ExporterRouter;
