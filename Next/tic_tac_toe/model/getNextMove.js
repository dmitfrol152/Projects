import { MOVE_ORDER } from "../constants/symbols";

export function getNextMove({ currentMove, playerCount, timers }) {
  const slicedMove = MOVE_ORDER.slice(0, playerCount).filter(
    (symbol) => timers[symbol] > 0,
  );

  const nextMove = slicedMove.indexOf(currentMove) + 1;
  return slicedMove[nextMove] ?? slicedMove[0];
}
