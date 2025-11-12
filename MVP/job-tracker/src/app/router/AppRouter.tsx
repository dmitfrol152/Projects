import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { PrivateRouter } from "@app/router/PrivateRouter";

const Login = lazy(() => import("@pages/login"));
const Registration = lazy(() => import("@pages/registration"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const Settings = lazy(() => import("@pages/settings"));
const Stats = lazy(() => import("@/pages/stats"));
const Notification = lazy(() => import("@/pages/notification"));
const Vacancies = lazy(() => import("@/pages/vacancies"));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route index element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/statistics" element={<Stats />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/vacancies" element={<Vacancies />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
