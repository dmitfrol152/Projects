import { LogoIcon } from "../../app/assets/icons/LogoIcon";
import { Profile } from "../profile/Profile";
import { ArrowIconDown } from "../../app/assets/icons/ArrowIconDown";
import { UiButton } from "../../ui/UiButton";

export function Header() {
  return (
    <header className="flex h-24 items-center bg-white shadow-lg px-8">
      <LogoIcon />
      <div className="w-px h-8 bg-slate-200 mx-6" />
      <UiButton className="w-44" size="lg" variant="primary">
        Играть
      </UiButton>
      <button className="ml-auto flex items-center gap-2 text-teal-600 hover:text-teal-500 transition">
        <Profile name="Paromovevg" rating="1230" />
        <ArrowIconDown />
      </button>
    </header>
  );
}
