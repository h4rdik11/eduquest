import { createBrowserRouter } from "react-router-dom";
import Quiz from "./pages/Quiz";
import DashboardLayout from "./components/DashboardLayout";
import Config from "./pages/Config";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardLayout>
        <Quiz />
      </DashboardLayout>
    ),
  },
  {
    path: "/quiz",
    element: (
      <DashboardLayout>
        <Quiz />
      </DashboardLayout>
    ),
  },
  {
    path: "/config",
    element: (
      <DashboardLayout>
        <Config />
      </DashboardLayout>
    ),
  },
]);
