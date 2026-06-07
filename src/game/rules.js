import { createBoard } from "./board";
import { countNeighbors } from "./neighbors";

export function step(board, ruleset, gridOpt) {
  const rows = board.length;
  const cols = board[0].length;
  const next = createBoard(rows, cols);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const age = board[y][x];
      const neighbors = countNeighbors(board, x, y, { rows, cols, ...gridOpt });

      if (age > 0) {
        if (ruleset.survival.includes(neighbors)) {
          next[y][x] = age + 1;
        }
      } else if (ruleset.birth.includes(neighbors)) {
        next[y][x] = 1;
      }
    }
  }
  return next;
}
