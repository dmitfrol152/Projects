import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.layout__main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
