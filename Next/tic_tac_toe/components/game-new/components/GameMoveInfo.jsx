import { GameSymbol } from "./GameSymbol";

export function GameMoveInfo({ currentMove, nextMove }) {
  return (
    <>
      <span className="flex gap-1 items-center text-xl leading-[1.2] text-slate-900 font-semibold">
        <span>Ход: </span>
        <span className="text-teal-600">
          <GameSymbol symbol={currentMove} className="w-5 h-5" />
        </span>
      </span>
      <span className="flex gap-1 items-center text-xs leading-[1.2] text-slate-400">
        <span>Следующий: </span>
        <span className="text-red-500">
          <GameSymbol symbol={nextMove} className="w-3 h-3" />
        </span>
      </span>
    </>
  );
}
