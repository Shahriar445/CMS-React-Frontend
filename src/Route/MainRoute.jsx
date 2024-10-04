import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import ExporterDashboard from "../assets/pages/Exporter/ExporterDashboard";
import ExporterLayout from "../Layout/ExporterLayout";
import ExporterDeclaration from "../assets/pages/Exporter/ExporterDeclarations";
import ExporterPayment from "../assets/pages/Exporter/ExporterPayment";
import ExporterMonitoring from "../assets/pages/Exporter/ExporterMonitoring";
import ImporterPayment from "../assets/pages/Importer/ImporterPayment.s";
import ImporterDashboard from "../assets/pages/Importer/ImporterDashboard";
import ImporterDeclaration from "../assets/pages/Importer/ImporterDeclarations";
import ImporterLayout from "../Layout/ImporterLayout";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../assets/pages/Admin/AdminDashboard";
import AdminUserManage from "../assets/pages/Admin/AdminUserManage";
import AdminMonitor from "../assets/pages/Admin/AdminMonitor";
import CustomsOfficerDashboard from "../assets/pages/CustomsOfficer/CustomsOfficerDashboard";
import CustomsOfficerPayment from "../assets/pages/CustomsOfficer/CustomsOfficerPayment";
import CustomsOfficerShipmentPermission from "../assets/pages/CustomsOfficer/CustomsOfficerShipmentPermission";
import CustomsOfficerReport from "../assets/pages/CustomsOfficer/CustomsOfficerReport";
import CustomsOfficerLayout from "../Layout/CustomsOfficerLayout";
import ImporterCalender from "../assets/pages/Importer/ImporterCalender";
import Guard from "../assets/guard";
import ExporterList from "../assets/pages/Exporter/ExporterList";
import CustomsOfficerMonitor from "../assets/pages/CustomsOfficer/CustomsOfficerMonitor";
import ImporterMonitoring from "../assets/pages/Importer/ImporterMonitor";
import Importerlist from "../assets/pages/Importer/Importerlist";
import AdminAddProduct from "../assets/pages/Admin/AdminAddProduct";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Guard>
        {" "}
        <HomeLayout />{" "}
      </Guard>
    ),
  },
  // ------------------- exporter
  {
    path: "/exporter/dashboard",
    element: (
      <Guard>
        <ExporterLayout>
          <ExporterDashboard />
        </ExporterLayout>
      </Guard>
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
    path: "/exporter/list",
    element: (
      <ExporterLayout>
        <ExporterList/>
      </ExporterLayout>
    ),
  },
  // ------------------- Importer
  {
    path: "/importer/dashboard",
    element: (
      <Guard>
        <ImporterLayout>
          <ImporterDashboard />
        </ImporterLayout>
      </Guard>
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
    {
    path: "/importer/list",
    element: (
      <ImporterLayout>
        <Importerlist />
      </ImporterLayout>
    ),
  },
  {
    path: "/importer/calender",
    element: (
      <ImporterLayout>
        <ImporterCalender />
      </ImporterLayout>
    ),
  },
  // ------------------- Admin
  {
    path: "/admin/dashboard",
    element: (
      <Guard>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Guard>
    ),
  },
  {
    path: "/admin/monitor",
    element: (
      <AdminLayout>
        <AdminMonitor />
      </AdminLayout>
    ),
  },

  {
    path: "/admin/usermanage",
    element: (
      <AdminLayout>
        <AdminUserManage />
      </AdminLayout>
    ),
  },  {
    path: "/admin/product",
    element: (
      <AdminLayout>
        <AdminAddProduct />
      </AdminLayout>
    ),
  },
  //------------------ customs officer
  {
    path: "/officer/dashboard",
    element: (
      <CustomsOfficerLayout>
        <Guard>
          <CustomsOfficerDashboard />
        </Guard>
      </CustomsOfficerLayout>
    ),
  },
  {
    path: "/officer/payment",
    element: (
      <CustomsOfficerLayout>
        <CustomsOfficerPayment />
      </CustomsOfficerLayout>
    ),
  },
  {
    path: "/officer/monitor",
    element: (
      <CustomsOfficerLayout>
        <CustomsOfficerMonitor />
      </CustomsOfficerLayout>
    ),
  },
  {
    path: "/officer/report",
    element: (
      <CustomsOfficerLayout>
        <CustomsOfficerReport />
      </CustomsOfficerLayout>
    ),
  },
  {
    path: "/officer/permission",
    element: (
      <CustomsOfficerLayout>
        <CustomsOfficerShipmentPermission />
      </CustomsOfficerLayout>
    ),
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};
export default MainRouter;
