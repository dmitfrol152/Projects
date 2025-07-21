import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Layout.module.scss";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
