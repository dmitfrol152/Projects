"use client";

import clsx from "clsx";
import { UiButton } from "../../ui/UiButton";
import { GameSymbol } from "./GameSymbol";

export function GameField({
  cells,
  nextMove,
  currentMove,
  handleClickCell,
  winnerSiquence,
  winnerSymbol,
}) {
  const actions = (
    <>
      <UiButton size="md" variant="primary">
        Ничья
      </UiButton>
      <UiButton size="md" variant="secondary">
        Сдаться
      </UiButton>
    </>
  );

  return (
    <GameFieldLayout>
      <GameFieldInfo
        actions={actions}
        currentMove={currentMove}
        nextMove={nextMove}
      />
      <GameFieldGrid>
        {cells.map((symbol, i) => (
          <GameFieldCells
            key={i}
            onClick={() => handleClickCell(i)}
            isWinner={winnerSiquence?.includes(i)}
            disabled={!!winnerSymbol}
          >
            {symbol && <GameSymbol symbol={symbol} className="w-5 h-5" />}
          </GameFieldCells>
        ))}
      </GameFieldGrid>
    </GameFieldLayout>
  );
}

function GameFieldLayout({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md pt-5 pb-7 px-8 mb-4">
      {children}
    </div>
  );
}

function GameFieldInfo({ actions, currentMove, nextMove }) {
  return (
    <div className="flex items-center gap-2 justify-between mb-3">
      <div>
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
      </div>
      <div className="flex items-center gap-3">{actions}</div>
    </div>
  );
}

function GameFieldGrid({ children }) {
  return (
    <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] -pl-px -pt-px">
      {children}
    </div>
  );
}

function GameFieldCells({ children, onClick, isWinner, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        isWinner && "bg-orange-600/10",
      )}
    >
      {children}
    </button>
  );
}
