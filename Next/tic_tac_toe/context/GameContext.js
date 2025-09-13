import { createContext, useReducer, useState, useMemo, useEffect } from "react";
import {
  gameStateReducer,
  initGameState,
  GAME_CELL_ACTION,
} from "../model/gameStateReducer";
import {
  ARRAY_PLAYERS,
  ARRAY_TIMERS as selectTimers,
} from "../constants/arrays";
import { useContext } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState(2);
  const [timers, setTimers] = useState(30000);
  const [isErrorP, setIsErrorP] = useState(false);
  const [isErrorT, setIsErrorT] = useState(false);

  const selectPlayers = useMemo(
    () => ARRAY_PLAYERS.slice(0, +players + 1),
    [players],
  );

  useEffect(() => {
    const hasValidPlayer = players !== "" && players !== "-- Выбери --";
    const hasValidTimer = timers !== "" && timers !== "-- Выбери --";

    setIsErrorP(!hasValidPlayer);
    setIsErrorT(!hasValidTimer);
  }, [players, timers]);

  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    {
      playerCount: players,
      defaultTimer: timers,
      currentMoveStart: false,
    },
    initGameState,
  );

  useEffect(() => {
    dispatch({
      type: GAME_CELL_ACTION.UPDATE_SETTINGS,
      payload: {
        playerCount: players,
        defaultTimer: timers,
      },
    });
  }, [players, timers]);

  const startGame = () => {
    dispatch({
      type: GAME_CELL_ACTION.START_GAME,
      now: Date.now(),
    });
  };

  const value = {
    gameState,
    dispatch,
    startGame,

    players,
    setPlayers,
    timers,
    setTimers,
    selectPlayers,
    selectTimers,
    isErrorP,
    isErrorT,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("нет контекста");
  }
  return context;
};
