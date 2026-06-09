import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  clearBoard,
  countLive,
  randomizeBoard,
  setCell,
  stampPatternAtCenter,
} from "../game/board";
import {
  CELLS_COLS,
  CELLS_ROWS,
  DEFAULT_GRID_MODE,
  DEFAULT_INTERVAL_MS,
  DEFAULT_RULESET,
} from "../game/constants";
import { getPattern } from "../game/patterns";
import { step } from "../game/rules";
import { getRuleset } from "../game/rulesets";
import {
  createDefaultGameState,
  loadGameState,
  saveGameState,
} from "../game/storage";
import { usePopulationHistory } from "./usePopulationHistory";

export function useGame() {
  const saved = loadGameState();
  const initial = saved ?? createDefaultGameState();

  const [board, setBoard] = useState(initial.board);
  const [generation, setGeneration] = useState(initial.generation ?? 0);
  const [intervalMs, setIntervalMs] = useState(
    initial.intervalMs ?? DEFAULT_INTERVAL_MS
  );
  const [rulesetKey, setRulesetKey] = useState(
    initial.rulesetKey ?? DEFAULT_RULESET
  );
  const [gridMode, setGridMode] = useState(
    initial.gridMode ?? DEFAULT_GRID_MODE
  );
  const [isRunning, setIsRunning] = useState(false);

  const isRunningRef = useRef(false);
  const ruleset = useMemo(() => getRuleset(rulesetKey), [rulesetKey]);
  const population = useMemo(() => countLive(board), [board]);
  const { history, push, reset } = usePopulationHistory(
    countLive(initial.board)
  );

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    saveGameState({ board, generation, intervalMs, rulesetKey, gridMode });
  }, [board, generation, intervalMs, rulesetKey, gridMode]);

  useEffect(() => {
    push(population);
  }, [generation, population, push]);

  useEffect(() => {
    if (!isRunning) return undefined;

    const id = setInterval(() => {
      if (!isRunningRef.current) return;
      setBoard((b) => step(b, getRuleset(rulesetKey), { gridMode }));
      setGeneration((g) => g + 1);
    }, Number(intervalMs) || DEFAULT_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isRunning, intervalMs, rulesetKey, gridMode]);

  const stop = useCallback(() => setIsRunning(false), []);
  const run = useCallback(() => setIsRunning(true), []);

  const stepOnce = useCallback(() => {
    if (isRunning) return;
    setBoard((b) => step(b, ruleset, { gridMode }));
    setGeneration((g) => g + 1);
  }, [isRunning, ruleset, gridMode]);

  const clear = useCallback(() => {
    stop();
    setBoard((b) => clearBoard(b));
    setGeneration(0);
    reset(0);
  }, [stop, reset]);

  const randomize = useCallback(() => {
    stop();
    setBoard((b) => {
      const next = randomizeBoard(b);
      reset(countLive(next));
      return next;
    });
    setGeneration(0);
  }, [stop, reset]);

  const paintAt = useCallback(
    (x, y, value) => {
      if (isRunning) return;
      setBoard((b) => setCell(b, x, y, value));
    },
    [isRunning]
  );

  const applyPattern = useCallback(
    (key) => {
      const pattern = getPattern(key);
      if (!pattern) return;
      stop();
      setBoard((b) => {
        const next = stampPatternAtCenter(
          b,
          pattern,
          Math.floor(CELLS_COLS / 2),
          Math.floor(CELLS_ROWS / 2)
        );
        reset(countLive(next));
        return next;
      });
      setGeneration(0);
    },
    [stop, reset]
  );

  return {
    board,
    generation,
    population,
    history,
    intervalMs,
    rulesetKey,
    ruleset,
    gridMode,
    isRunning,
    run,
    stop,
    stepOnce,
    clear,
    randomize,
    paintAt,
    applyPattern,
    setIntervalMs,
    setRulesetKey,
    setGridMode,
  };
}
