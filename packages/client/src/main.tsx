import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />
);
