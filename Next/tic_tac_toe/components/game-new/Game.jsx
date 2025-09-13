"use client";

import { GameLayout } from "./components/GameLayout";
import { GameTitle } from "./components/GameTitle";
import { GameInfo } from "./components/GameInfo";
import { PlayerInfo } from "./components/PlayerInfo";
import { PLAYERS } from "../../constants/symbols";
import { GameMoveInfo } from "./components/GameMoveInfo";
import { GameCells } from "./components/GameCells";
import { GameOverModal } from "./GameOverModal";
import { getNextMove } from "../../model/getNextMove";
import { computeWinner } from "../../model/computeWinner";
import { useMemo, useCallback } from "react";
import { GAME_CELL_ACTION } from "../../model/gameStateReducer";
import { computeWinnerSymbol } from "../../model/computeWinnerSymbol";
import { computePlayerTimer } from "../../model/computePlayerTimer";
import { useInterval } from "../../hooks/timers";
import { UiTextField } from "../../ui/fields/UiTextField";
import { useGame } from "../../context/GameContext";

/**
 *
 * @param {
 *  gameIsStarted: boolean,
 * } param0
 * @returns
 */

export function Game() {
  const {
    gameState,
    dispatch,
    players,
    setPlayers,
    timers,
    setTimers,
    selectPlayers,
    selectTimers,
    isErrorP,
    isErrorT,
    startGame,
  } = useGame();

  useInterval(
    1000,
    !!gameState.currentMoveStart,
    useCallback(() => {
      dispatch({
        type: GAME_CELL_ACTION.TICK,
        now: Date.now(),
      });
    }, [dispatch]),
  );

  const winnerSiquence = useMemo(() => computeWinner(gameState), [gameState]);
  const nextMove = getNextMove(gameState);
  const winnerSymbol = computeWinnerSymbol(gameState, {
    nextMove,
    winnerSiquence,
  });

  const winnerPlayer = PLAYERS.find((symbol) => symbol.symbol === winnerSymbol);

  const handleCellClick = useCallback(
    (i) => {
      if (!gameState.currentMoveStart) {
        startGame();
      }
      dispatch({
        type: GAME_CELL_ACTION.CELL_CLICK,
        i,
        now: Date.now(),
      });
    },
    [dispatch, gameState.currentMoveStart],
  );

  const handleClickGameStart = () => {
    dispatch({
      type: GAME_CELL_ACTION.START_NEW_GAME,
      playerCount: players,
      defaultTimer: timers,
      currentMoveStart: Date.now(),
    });
  };

  const handleClickInHome = () => {
    dispatch({
      type: GAME_CELL_ACTION.START_NEW_GAME,
      playerCount: players,
      defaultTimer: timers,
      currentMoveStart: false,
    });
  };

  const { cells, currentMove } = gameState;

  return (
    <>
      <GameLayout
        playerSelect={
          <UiTextField
            label="Количество играков:"
            requared
            helperText="Выберите один из вариантов"
            errorText={isErrorP && "Не выбран ни один вариант!"}
            value={players}
            handleChange={(eventTargetValue) => {
              setPlayers(Number(eventTargetValue));
            }}
            selectArray={selectPlayers}
          />
        }
        timerSelect={
          <UiTextField
            label="Время игры:"
            requared
            helperText="Выберите один из вариантов"
            errorText={isErrorT && "Не выбран ни один вариант!"}
            value={timers}
            handleChange={(eventTargetValue) => {
              setTimers(Number(eventTargetValue));
            }}
            selectArray={selectTimers}
          />
        }
        // backLinks={<GameBackLinks />}
        title={<GameTitle />}
        gameInfo={
          <GameInfo
            playerCount={players}
            isRatingGame
            timeMode="1 мин на ход"
          />
        }
        plyerInfo={PLAYERS.slice(0, players).map((player, index) => {
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
        players={PLAYERS.slice(0, players).map((player, index) => (
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
        handleClickGameStart={handleClickGameStart}
        handleClickInHome={handleClickInHome}
        handleClickOnClose={handleClickInHome}
      />
    </>
  );
}
