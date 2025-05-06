import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header className="header">_</header>

      <main>
        <section className="section">
          <nav className="navMenu">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/users">Пользователи</NavLink>
            <NavLink to="/playlists">Плейлисты</NavLink>
          </nav>
          <div className="content">
            <Outlet />
          </div>
        </section>
      </main>

      <div className="footer">
        <a href="https://skillbox.ru/code/">https://skillbox.ru/</a>
      </div>
    </>
  );
};
