import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./app.css";
import {
  MainPage,
  UserInfoPage,
  UsersPage,
  PlaylistInfoPage,
  PlaylistsPage,
} from "./pages";
import { Layout } from "./components";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:userId" element={<UserInfoPage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="playlists/:playlistsId" element={<PlaylistInfoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
