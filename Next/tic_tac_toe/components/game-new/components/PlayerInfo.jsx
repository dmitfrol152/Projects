import { GameSymbol } from "./GameSymbol";
import Image from "next/image";
import avatarSrc from "../../../app/assets/images/avatar.png";
import { clsx } from "clsx";
import { useNow } from "../../../hooks/timers";
import { memo } from "react";

export const PlayerInfo = memo(function PlayerInfo({
  isRight,
  name,
  rating,
  avatar = avatarSrc,
  symbol,
  timer,
  timerStartAt,
}) {
  const now = useNow(1000, timerStartAt);
  const mils = Math.max(now ? timer - (now - timerStartAt) : timer, 0);

  const seconds = Math.ceil(mils / 1000);
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const isDanger = seconds < 10;

  const getTimerActive = () => {
    if (timerStartAt) {
      return isDanger ? "text-orange-600" : "text-slate-900";
    }

    return "text-slate-400";
  };

  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative w-44", isRight && "order-3")}>
        <div className="flex items-center gap-2 text-start text-teal-600">
          <Image src={avatar} alt="Avatar" width={48} height={48} unoptimized />
          <div className="overflow-hidden">
            <span className="block text-lg leading-[1.2] truncate">{name}</span>
            <span className="text-slate-400 block text-xs leading-[1.2]">
              Рейтинг: {rating}
            </span>
          </div>
        </div>
        <span className="flex absolute -left-1 -top-1 items-center justify-center w-5 h-5 shadow rounded-full p-1 bg-white text-red-500">
          <GameSymbol symbol={symbol} />
        </span>
      </div>
      <div className={clsx("h-6 w-px bg-slate-200", isRight && "order-2")} />
      <span
        className={clsx(
          "text-lg font-semibold w-[60px]",
          isRight && "order-1",
          getTimerActive(),
        )}
      >
        {minutesString}:{secondsString}
      </span>
    </div>
  );
});
