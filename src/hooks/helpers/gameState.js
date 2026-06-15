import { createDefaultGameState, loadGameState } from "../../game/storage";

export function getInitialGameState() {
  return loadGameState() ?? createDefaultGameState();
}

export function buildPersistPayload({
  board,
  generation,
  intervalMs,
  rulesetKey,
  gridMode,
}) {
  return {
    board,
    generation,
    intervalMs,
    rulesetKey,
    gridMode,
  };
}
