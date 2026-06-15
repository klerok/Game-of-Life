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

function isInBounds(x, y, cols, rows) {
  return x >= 0 && x < cols && y >= 0 && y < rows;
}

function isLiveCell(board, x, y) {
  return board[y][x] > 0;
}

function liveNeighborContribution(board, x1, y1, cols, rows) {
  return isInBounds(x1, y1, cols, rows) && isLiveCell(board, x1, y1) ? 1 : 0;
}

export function countNeighbors(board, x, y, opt) {
  const { rows, cols, gridMode = "bounded" } = opt;
  let count = 0;

  for (const [dy, dx] of DIRECTIONS) {
    let y1 = y + dy;
    let x1 = x + dx;

    if (gridMode === "toroidal") {
      y1 = ((y1 % rows) + rows) % rows;
      x1 = ((x1 % cols) + cols) % cols;
    }
    count += liveNeighborContribution(board, x1, y1, cols, rows);
  }
  return count;
}
