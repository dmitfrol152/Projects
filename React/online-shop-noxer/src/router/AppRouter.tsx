import { lazy } from "react";
import { Route, Routes } from "react-router";

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const CategoriesPage = lazy(() => import("@pages/CategoriesPage"));
const FavoritesPage = lazy(() => import("@pages/FavoritesPage"));
const BasketPage = lazy(() => import("@pages/BasketPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/basket" element={<BasketPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
