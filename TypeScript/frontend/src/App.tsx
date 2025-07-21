import { QueryClientProvider } from "@tanstack/react-query";
import "./styles/styles.scss";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ScaleLoader } from "react-spinners";
import { queryClient } from "./api/queryClient";

const LazyCustomLayout = lazy(() => import("./components/Layout/Layout"));
const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyLogin = lazy(() => import("./pages/Login/Login"));
const LazyRegistration = lazy(
  () => import("./pages/Registration/Registration")
);
const LazyProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <ScaleLoader
              cssOverride={{
                position: "fixed",
                top: "50%",
                left: "50%",
              }}
              color="#FC6D3E"
            />
          }
        >
          <Routes>
            <Route path="/" element={<LazyCustomLayout />}>
              <Route index element={<LazyMainPage />} />
              <Route path="/profile" element={<LazyProfilePage />} />
            </Route>
            <Route path="/login" element={<LazyLogin />} />
            <Route path="/registration" element={<LazyRegistration />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
