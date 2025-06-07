import { AuthProvider, type RequestUserType } from "@hilma/auth-client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { TokenResponse } from "@internal/types";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DepartmentsPage } from "./pages/DepartmentsPage";
import { NavigationBar } from "./components/NavigationBar";
import { DepartmentPage } from "./pages/DepartmentPage";

const router = createBrowserRouter([
  { index: true, element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    element: <NavigationBar />,
    children: [
      { path: "departments", element: <DepartmentsPage /> },
      { path: "add-department", element: <DepartmentPage /> },
    ],
  },
]);

async function fetchToken() {
  const { data } = await axios.get<TokenResponse>("/api/auth/token");
  return data.token;
}

async function fetchAuthData() {
  const { data } = await axios.get<RequestUserType>("/api/auth/user");
  return data;
}

function App() {
  return (
    <AuthProvider
      fetchToken={fetchToken}
      fetchAuthData={fetchAuthData}
      redirectOnPrivate={() => "/"}
      redirectOnPublic={() => "/departments"}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
