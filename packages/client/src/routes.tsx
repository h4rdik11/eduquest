import { createBrowserRouter } from "react-router-dom";
import Quiz from "./pages/Quiz";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>YOLO</div>,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);
