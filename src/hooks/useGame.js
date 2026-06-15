import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clearBoard, countLive, randomizeBoard, setCell } from "../game/board";
import {
  DEFAULT_GRID_MODE,
  DEFAULT_INTERVAL_MS,
  DEFAULT_RULESET,
} from "../game/constants";
import { stampPatternByKey } from "../game/patterns";
import { getRuleset } from "../game/rulesets";
import { saveGameState } from "../game/storage";
import { buildPersistPayload, getInitialGameState } from "./helpers/gameState";
import { usePopulationHistory } from "./usePopulationHistory";
import { runStep } from "../game/simulation";

export function useGame() {
  const initial = getInitialGameState();

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
    saveGameState(
      buildPersistPayload({
        board,
        generation,
        intervalMs,
        rulesetKey,
        gridMode,
      })
    );
  }, [board, generation, intervalMs, rulesetKey, gridMode]);

  useEffect(() => {
    push(population);
  }, [generation, population, push]);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        if (isRunningRef.current) {
          setBoard((b) => runStep(b, rulesetKey, gridMode));
          setGeneration((g) => g + 1);
        }
      }, Number(intervalMs) || DEFAULT_INTERVAL_MS);
      return () => clearInterval(id);
    }
  }, [isRunning, intervalMs, rulesetKey, gridMode]);

  const stop = useCallback(() => setIsRunning(false), []);
  const run = useCallback(() => setIsRunning(true), []);

  const stepOnce = useCallback(() => {
    if (!isRunning) {
      setBoard((b) => runStep(b, rulesetKey, gridMode));
      setGeneration((g) => g + 1);
    }
  }, [isRunning, rulesetKey, gridMode]);

  const clear = useCallback(() => {
    setIsRunning(false);
    setBoard((b) => clearBoard(b));
    setGeneration(0);
    reset(0);
  }, [reset]);

  const randomize = useCallback(() => {
    setIsRunning(false);
    setBoard((b) => {
      const next = randomizeBoard(b);
      reset(countLive(next));
      return next;
    });
    setGeneration(0);
  }, [reset]);

  const paintAt = useCallback(
    (x, y, value) => {
      if (!isRunning) {
        setBoard((b) => setCell(b, x, y, value));
      }
    },
    [isRunning]
  );

  const applyPattern = useCallback(
    (key) => {
      setIsRunning(false);
      setBoard((b) => {
        const next = stampPatternByKey(b, key);
        if (next) {
          reset(countLive(next));
          setGeneration(0);
          return next;
        }
        return b;
      });
    },
    [reset]
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
