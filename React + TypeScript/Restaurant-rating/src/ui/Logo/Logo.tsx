import LogoIcon from "/src/assets/stair.svg?react";
import "./styles.css";

export const Logo = () => {
  return (
    <div className="logo">
      <LogoIcon width={16} height={16} className="logo__icon" />
      <span>Eats</span>
    </div>
  );
};
