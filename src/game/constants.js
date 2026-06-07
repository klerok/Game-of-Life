export const CELL_SIZE = 20;
export const WIDTH = 800;
export const HEIGHT = 600;
export const CELLS_ROWS = HEIGHT / CELL_SIZE;
export const CELLS_COLS = WIDTH / CELL_SIZE;

export const DEFAULT_INTERVAL_MS = 100;
export const DEFAULT_RULESET = "conway";
export const DEFAULT_GRID_MODE = "bounded";
export const DEFAULT_RANDOM_DENSITY = 0.2;

export const GRID_MODES = {
  BOUNDED: "bounded",
  TOROIDAL: "toroidal",
};

export const STORAGE_KEY = "life-game-state";
export const MAX_AGE_COLOR = 20;
export const POPULATION_HISTORY_LIMIT = 500;
