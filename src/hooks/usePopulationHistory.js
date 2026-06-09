import { useCallback, useState } from "react";
import { POPULATION_HISTORY_LIMIT } from "../game/constants";

export function usePopulationHistory(initial = 0) {
  const [history, setHistory] = useState([initial]);

  const push = useCallback((value) => {
    setHistory((prev) => {
      const next = [...prev, value];
      return next.length > POPULATION_HISTORY_LIMIT
        ? next.slice(-POPULATION_HISTORY_LIMIT)
        : next;
    });
  }, []);

  const reset = useCallback((value = 0) => {
    setHistory([value]);
  }, []);

  return { history, push, reset };
}
