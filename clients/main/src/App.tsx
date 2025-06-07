import { AuthProvider, type RequestUserType } from "@hilma/auth-client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { TokenResponse } from "@internal/types";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { NavigationBar } from "./components/NavigationBar";

const router = createBrowserRouter([
  { index: true, element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    element: <NavigationBar />,
    children: [{ path: "home", element: <HomePage /> }],
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
      redirectOnPublic={() => "/home"}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
