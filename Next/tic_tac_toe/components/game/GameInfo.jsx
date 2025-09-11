"use strict";

import { Profile } from "../profile/Profile";
import { GameSymbol } from "./GameSymbol";
import { GAME_SYMBOLS } from "../../constants/symbols";
import { useState, useEffect } from "react";

import avatarSrc1 from "../../app/assets/images/avatar.png";
import avatarSrc2 from "../../app/assets/images/avatar2.png";
import avatarSrc3 from "../../app/assets/images/avatar3.png";
import avatarSrc4 from "../../app/assets/images/avatar4.png";
import clsx from "clsx";

const players = [
  {
    id: 1,
    name: "Paromovevg",
    rating: "1230",
    avatar: avatarSrc1,
    symbol: GAME_SYMBOLS.CROSS,
  },
  {
    id: 2,
    name: "Lera",
    rating: "100",
    avatar: avatarSrc2,
    symbol: GAME_SYMBOLS.ZERO,
  },
  {
    id: 3,
    name: "Petya",
    rating: "850",
    avatar: avatarSrc3,
    symbol: GAME_SYMBOLS.TRIANGLE,
  },
  {
    id: 4,
    name: "Ararat",
    rating: "1400",
    avatar: avatarSrc4,
    symbol: GAME_SYMBOLS.BOX,
  },
];

export function GameInfo({ playerCount, currentMove, isWinner, onTimeOver }) {
  return (
    <div className="bg-white rounded-2xl shadow-md py-4 px-8 grid grid-cols-2 gap-3 justify-between mb-6">
      {players.slice(0, playerCount).map((player, index) => (
        <PlayerInfo
          key={player.id}
          playerInfo={player}
          isRight={index % 2 === 1}
          isRunningTimer={currentMove === player.symbol && !isWinner}
          onTimeOver={() => onTimeOver(player.symbol)}
        />
      ))}
    </div>
  );
}

function PlayerInfo({ playerInfo, isRight, isRunningTimer, onTimeOver }) {
  const [seconds, setSeconds] = useState(6);

  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const isDanger = seconds < 10;

  useEffect(() => {
    if (isRunningTimer) {
      const interval = setInterval(() => {
        setSeconds((s) => Math.max(s - 1, 0));
      }, 1000);

      return () => {
        clearInterval(interval);
        setSeconds(6);
      };
    }
  }, [isRunningTimer]);

  useEffect(() => {
    if (seconds === 0) {
      onTimeOver();
    }
  }, [seconds]);

  const getTimerActive = () => {
    if (isRunningTimer) {
      return isDanger ? "text-orange-600" : "text-slate-900";
    }

    return "text-slate-400";
  };

  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative w-44", isRight && "order-3")}>
        <Profile
          name={playerInfo.name}
          rating={playerInfo.rating}
          avatar={playerInfo.avatar}
        />
        <span className="flex absolute -left-1 -top-1 items-center justify-center w-5 h-5 shadow rounded-full p-1 bg-white text-red-500">
          <GameSymbol symbol={playerInfo.symbol} />
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
}
