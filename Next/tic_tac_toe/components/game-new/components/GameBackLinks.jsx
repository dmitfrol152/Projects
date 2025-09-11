import Link from "next/link";
import { ArrowIconLeft } from "../../../app/assets/icons/ArrorIconLeft";

export function GameBackLinks() {
  return (
    <Link
      className="flex items-center gap-2 text-xs text-teal-600 leading-[1.2] -mb-0.5"
      href="#"
    >
      <ArrowIconLeft />
      На главную
    </Link>
  );
}
