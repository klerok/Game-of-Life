import {
  CELLS_COLS,
  CELLS_ROWS,
  DEFAULT_GRID_MODE,
  DEFAULT_INTERVAL_MS,
  DEFAULT_RULESET,
  STORAGE_KEY,
} from "./constants";
import { createBoard } from "./board";

export function saveGameState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.board) || parsed.board.length === 0) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function createDefaultGameState() {
  return {
    board: createBoard(CELLS_ROWS, CELLS_COLS),
    generation: 0,
    intervalMs: DEFAULT_INTERVAL_MS,
    rulesetKey: DEFAULT_RULESET,
    gridMode: DEFAULT_GRID_MODE,
  };
}
