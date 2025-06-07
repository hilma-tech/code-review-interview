import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { NavigationBar } from "./components/NavigationBar";

const router = createBrowserRouter([
  {
    element: <NavigationBar />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
