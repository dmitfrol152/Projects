import { RestaurantsList } from "../../pages/Restaurants/RestaurantsList";
import { Logo } from "../Logo/Logo";
import { Profile } from "../Profile/Profile";
import "./styles.css";

export const BaseLayout = () => {
  return (
    <>
      <header>
        <Logo />
        <Profile />
      </header>
      <main>
        <RestaurantsList />
      </main>
      <footer>
        <p>Privacy Policy</p>
        <p className="corporation">2022 Eats</p>
        <p>Terms Of Service</p>
      </footer>
    </>
  );
};
