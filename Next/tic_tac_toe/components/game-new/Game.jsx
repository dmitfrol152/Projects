"use client";

import { GameLayout } from "./components/GameLayout";
import { GameBackLinks } from "./components/GameBackLinks";
import { GameTitle } from "./components/GameTitle";
import { GameInfo } from "./components/GameInfo";
import { PlayerInfo } from "./components/PlayerInfo";
import { PLAYERS } from "../../constants/symbols";
import { GameMoveInfo } from "./components/GameMoveInfo";
import { GameCells } from "./components/GameCells";
import { GameOverModal } from "./GameOverModal";
import { getNextMove } from "../../model/getNextMove";
import { computeWinner } from "../../model/computeWinner";
import { useReducer, useMemo, useCallback } from "react";
import {
  initGameState,
  gameStateReducer,
  GAME_CELL_ACTION,
} from "../../model/gameStateReducer";
import { computeWinnerSymbol } from "../../model/computeWinnerSymbol";
import { computePlayerTimer } from "../../model/computePlayerTimer";
import { useInterval } from "../../lib/timers";

const PLAYERS_COUNT = 2;

export function Game() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    {
      playerCount: PLAYERS_COUNT,
      defaultTimer: 60000,
      currentMoveStart: Date.now(),
    },
    initGameState,
  );

  useInterval(
    1000,
    !!gameState.currentMoveStart,
    useCallback(() => {
      dispatch({
        type: GAME_CELL_ACTION.TICK,
        now: Date.now(),
      });
    }),
  );

  const winnerSiquence = useMemo(() => computeWinner(gameState), [gameState]);
  const nextMove = getNextMove(gameState);
  const winnerSymbol = computeWinnerSymbol(gameState, {
    nextMove,
    winnerSiquence,
  });

  const winnerPlayer = PLAYERS.find((symbol) => symbol.symbol === winnerSymbol);

  const handleCellClick = useCallback((i) => {
    dispatch({
      type: GAME_CELL_ACTION.CELL_CLICK,
      i,
      now: Date.now(),
    });
  }, []);

  const { cells, currentMove } = gameState;

  return (
    <>
      <GameLayout
        backLinks={<GameBackLinks />}
        title={<GameTitle />}
        gameInfo={
          <GameInfo
            playerCount={PLAYERS_COUNT}
            isRatingGame
            timeMode="1 мин на ход"
          />
        }
        plyerInfo={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => {
          const { timer, timerStartAt } = computePlayerTimer(
            gameState,
            player.symbol,
          );

          return (
            <PlayerInfo
              key={player.id}
              name={player.name}
              rating={player.rating}
              avatar={player.avatar}
              symbol={player.symbol}
              isRight={index % 2 === 1}
              timer={timer}
              timerStartAt={timerStartAt}
            />
          );
        })}
        gameMovieInfo={
          <GameMoveInfo nextMove={nextMove} currentMove={currentMove} />
        }
        gameCells={cells.map((cell, i) => (
          <GameCells
            key={i}
            index={i}
            onClick={handleCellClick}
            isWinner={winnerSiquence?.includes(i)}
            disabled={!!winnerSymbol}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal
        players={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
          <PlayerInfo
            key={player.id}
            name={player.name}
            rating={player.rating}
            avatar={player.avatar}
            symbol={player.symbol}
            isRight={index % 2 === 1}
            timer={gameState.timers[player.symbol]}
          />
        ))}
        winnerName={winnerPlayer?.name}
      />
    </>
  );
}
