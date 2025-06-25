import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { FadeLoader } from "react-spinners";
import "/src/styles/style.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";

const LazyCustomLayout = lazy(() => import("./components/Layout/Layout"));
const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyUserPage = lazy(() => import("./pages/UserPage/UserPage"));

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <FadeLoader
              cssOverride={{
                position: "fixed",
                top: "50%",
                left: "50%",
              }}
              color="#ffa902"
            />
          }
        >
          <Routes>
            <Route path="/" element={<LazyCustomLayout />}>
              <Route index element={<LazyMainPage />}></Route>
              <Route path="/api/user" element={<LazyUserPage />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
