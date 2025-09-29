import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { PrivateRouter } from "./PrivateRouter";

const Login = lazy(() => import("@pages/Login"));
const Registration = lazy(() => import("@pages/Registration"));
const Dashboard = lazy(() => import("@pages/Dashboard"));
const Settings = lazy(() => import("@pages/Settings"));

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
