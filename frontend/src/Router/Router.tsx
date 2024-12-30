import { createBrowserRouter } from "react-router-dom";
import App from "@/pages/Create";




import Secret from "@/pages/Secret";
import Create from "@/pages/Create"

const router = createBrowserRouter([
  {
    path: "/",
    element:<Create/>
  },
  { path: "/secret/:id", element: <Secret /> },
  { path: "/create", element: <App /> },
]);
export default router;
