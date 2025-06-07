import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { DepartmentsPage } from "./pages/DepartmentsPage";
import { NavigationBar } from "./components/NavigationBar";
import { DepartmentPage } from "./pages/DepartmentPage";

const router = createBrowserRouter([
  {
    element: <NavigationBar />,
    children: [
      {
        index: true,
        loader: () => redirect("/departments"),
      },
      { path: "departments", element: <DepartmentsPage /> },
      { path: "add-department", element: <DepartmentPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
