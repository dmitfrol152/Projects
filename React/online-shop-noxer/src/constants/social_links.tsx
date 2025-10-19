import IconHome from "@assets/images/svg/icon-home.svg?react";
import IconCatalog from "@assets/images/svg/icon-catalog.svg?react";
import IconFavorite from "@assets/images/svg/icon-favorite.svg?react";
import IconBasket from "@assets/images/svg/icon-cart.svg?react";
import IconProfile from "@assets/images/svg/icon-account.svg?react";

export const SOCIAL_LINKS = [
  {
    to: "/",
    icon: <IconHome />,
  },
  {
    to: "/categories",
    icon: <IconCatalog />,
  },
  {
    to: "/favorites",
    icon: <IconFavorite />,
  },
  {
    to: "/basket",
    icon: <IconBasket />,
  },
  {
    to: "/profile",
    icon: <IconProfile />,
  },
];
