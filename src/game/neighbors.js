const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

export function countNeighbors(board, x, y, opt) {
  const { rows, cols, gridMode = "bounded" } = opt;
  let count = 0;

  for (const [dy, dx] of DIRECTIONS) {
    let y1 = y + dy;
    let x1 = x + dx;

    if (gridMode === "toroidal") {
      y1 = ((y1 % rows) + rows) % rows;
      x1 = ((x1 % cols) + cols) % cols;
      if (board[y1][x1] > 0) {
        count += 1;
      }
    } else if (
      x1 >= 0 &&
      x1 < cols &&
      y1 >= 0 &&
      y1 < rows &&
      board[y1][x1] > 0
    ) {
      count += 1;
    }
  }
  return count;
}
