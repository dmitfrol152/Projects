import Link from "next/link";
import { ArrowIconLeft } from "../../app/assets/icons/ArrorIconLeft";
import { StarIcon } from "../../app/assets/icons/StarIcon";
import { ManIcon } from "../../app/assets/icons/ManIcon";
import { TimeIcon } from "../../app/assets/icons/TimeIcon";

export function GameTitle({ playerCount }) {
  return (
    <div className="pl-2 mb-4">
      <Link
        className="flex items-center gap-2 text-xs text-teal-600 leading-[1.2] -mb-0.5"
        href="#"
      >
        <ArrowIconLeft />
        На главную
      </Link>
      <h1 className="text-4xl leading-[1.2]">Крестики нолики</h1>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <StarIcon />
        <span className="flex items-center gap-1">
          <ManIcon />
          {playerCount}
        </span>
        <span className="flex items-center gap-1">
          <TimeIcon />1 мин на ход
        </span>
      </div>
    </div>
  );
}
