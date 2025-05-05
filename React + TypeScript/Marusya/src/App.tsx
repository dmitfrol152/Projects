import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import "/src/styles/style.scss";
import { ClipLoader } from "react-spinners";
import styles from "./App.module.scss";

const LazyCustomLayout = lazy(() => import("./components/Layout/Layout"));
const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyGenresPage = lazy(() => import("./pages/GenresPage/GenresPage"));
const LazyMoviePage = lazy(() => import("./pages/MoviePage/MoviePage"));
const LazyProfile = lazy(() => import("./pages/Profile/Profile"));
const LazyMovieByGenrePage = lazy(
  () => import("./pages/MovieByGenrePage/MovieByGenrePage")
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <ClipLoader className={styles.app} color="#dc5dfc" size={100} />
          }
        >
          <Routes>
            <Route path="/" element={<LazyCustomLayout />}>
              <Route index path="" element={<LazyMainPage />} />
              <Route path="/movie/genres" element={<LazyGenresPage />} />
              <Route path="/movie/:movieId" element={<LazyMoviePage />} />
              <Route path="/profile" element={<LazyProfile />} />
              <Route path="/movie" element={<LazyMovieByGenrePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
