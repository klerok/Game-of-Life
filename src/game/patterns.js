import { BOARD_CENTER } from "./constants";
import { stampPatternAtCenter } from "./board";

function pattern(name, cells, width, height) {
  return { name, cells, width, height };
}

export const PATTERNS = {
  glider: pattern(
    "Glider",
    [
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    3,
    3
  ),

  blinker: pattern(
    "Blinker",
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    3,
    3
  ),

  block: pattern(
    "Block",
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    2,
    2
  ),

  toad: pattern(
    "Toad",
    [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    4,
    2
  ),

  beacon: pattern(
    "Beacon",
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 3, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ],
    4,
    4
  ),

  lwss: pattern(
    "LWSS",
    [
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
    ],
    6,
    4
  ),
};

export function listPatterns() {
  return Object.entries(PATTERNS).map(([key, value]) => ({ key, ...value }));
}

export function getPattern(key) {
  return PATTERNS[key] ?? null;
}

export function stampPatternByKey(board, patternKey) {
  const pattern = getPattern(patternKey);
  if (!pattern) return null;
  return stampPatternAtCenter(board, pattern, BOARD_CENTER.x, BOARD_CENTER.y);
}
