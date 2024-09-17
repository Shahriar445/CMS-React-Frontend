import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import ExporterDashboard from "../../assets/pages/Exporter/ExporterDashboard";
import ExporterLayout from "../../Layout/ExporterLayout";
import ExporterDeclaration from "../../assets/pages/Exporter/ExporterDeclarations";
import ExporterPayment from "../../assets/pages/Exporter/ExporterPayment.s";
import ExporterMonitoring from "../../assets/pages/Exporter/ExporterMonitoring";
import ImporterPayment from "../../assets/pages/Importer/ImporterPayment.s";
import ImporterDashboard from "../../assets/pages/Importer/ImporterDashboard";
import ImporterDeclaration from "../../assets/pages/Importer/ImporterDeclarations";
import ImporterLayout from "../../Layout/ImporterLayout";
import ImporterMonitoring from "../../assets/pages/Importer/ImporterMonitoring";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: "/exporter/dashboard",
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
  {
    path: "/importer/dashboard",
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

const MainRouter = () => {
  return <RouterProvider router={router} />;
};
export default MainRouter;
