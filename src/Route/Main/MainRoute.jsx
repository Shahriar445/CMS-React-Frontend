import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomeLayout>
      </HomeLayout>
    ),
  }


]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};
export default MainRouter;
