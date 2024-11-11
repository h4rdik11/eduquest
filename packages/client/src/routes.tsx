import { createBrowserRouter } from "react-router-dom";
import Quiz from "./pages/Quiz";
import DashboardLayout from "./components/DashboardLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>YOLO</div>,
  },
  {
    path: "/quiz",
    element: (
      <DashboardLayout>
        <Quiz />
      </DashboardLayout>
    ),
  },
]);
