import { GAME_SYMBOLS, MOVE_ORDER } from "../constants/symbols";
import { getNextMove } from "./getNextMove";

export const GAME_CELL_ACTION = {
  CELL_CLICK: "cell-click",
  TICK: "tick",
  START_GAME: "start-game",
  UPDATE_SETTINGS: "update-settings",
  START_NEW_GAME: "start-new-game",
};

export const initGameState = ({
  playerCount,
  defaultTimer,
  currentMoveStart,
}) => ({
  cells: new Array(19 * 19).fill(null),
  currentMove: GAME_SYMBOLS.CROSS,
  currentMoveStart,
  playerCount,
  timers: MOVE_ORDER.reduce((timers, symbol, index) => {
    if (index < playerCount) {
      timers[symbol] = defaultTimer;
    }

    return timers;
  }, {}),
});

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case GAME_CELL_ACTION.CELL_CLICK: {
      const { i, now } = action;

      if (state.cells[i]) {
        return state;
      }

      return {
        ...state,
        timers: updateTimers(state, now),
        currentMove: getNextMove(state),
        currentMoveStart: now,
        cells: updateCells(state, i),
      };
    }
    case GAME_CELL_ACTION.TICK: {
      const { now } = action;

      if (!isTimeOver(state, now)) {
        return state;
      }

      return {
        ...state,
        timers: updateTimers(state, now),
        currentMove: getNextMove(state),
        currentMoveStart: now,
      };
    }
    case GAME_CELL_ACTION.START_GAME: {
      return {
        ...state,
        currentMoveStart: action.now,
      };
    }
    case GAME_CELL_ACTION.UPDATE_SETTINGS: {
      const { playerCount, defaultTimer } = action.payload;
      return initGameState({
        playerCount,
        defaultTimer,
        currentMoveStart: false,
      });
    }
    case GAME_CELL_ACTION.START_NEW_GAME: {
      const { playerCount, defaultTimer, currentMoveStart } = action;

      return {
        ...state,
        playerCount,
        defaultTimer,
        currentMoveStart,
        cells: new Array(19 * 19).fill(null),
        currentMove: GAME_SYMBOLS.CROSS,
        currentMoveStart,
        playerCount,
        timers: MOVE_ORDER.reduce((timers, symbol, index) => {
          if (index < playerCount) {
            timers[symbol] = defaultTimer;
          }

          return timers;
        }, {}),
      };
    }
    default: {
      return state;
    }
  }
};

function updateTimers(gameState, now) {
  const diff = now - gameState.currentMoveStart;
  const timer = gameState.timers[gameState.currentMove];

  return {
    ...gameState.timers,
    [gameState.currentMove]: timer - diff,
  };
}

function updateCells(gameState, i) {
  return gameState.cells.map((cell, index) =>
    index === i ? gameState.currentMove : cell,
  );
}

function isTimeOver(gameState, now) {
  const timer = updateTimers(gameState, now)[gameState.currentMove];

  return timer <= 0;
}
