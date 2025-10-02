import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { PrivateRouter } from "@router/PrivateRouter";

const Login = lazy(() => import("@pages/Login"));
const Registration = lazy(() => import("@pages/Registration"));
const Dashboard = lazy(() => import("@pages/Dashboard"));
const Settings = lazy(() => import("@pages/Settings"));
const Stats = lazy(() => import("@/pages/Stats"));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route index element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/statistics" element={<Stats />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
