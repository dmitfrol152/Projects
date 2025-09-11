export function computeWinnerSymbol(gameState, { nextMove, winnerSiquence }) {
  return nextMove === gameState.currentMove
    ? gameState.currentMove
    : gameState.cells[winnerSiquence?.[0]];
}
