import { DEFAULT_RANDOM_DENSITY } from "./constants.js";

function inBounds(board, x, y) {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length;
}

export function createBoard(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export function cloneBoard(board) {
  return board.map((row) => row.slice());
}

export function getDimensions(board) {
  return {
    rows: board.length,
    cols: board[0]?.length ?? 0,
  };
}

export function countLive(board) {
  let count = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell > 0) {
        count++;
      }
    }
  }
  return count;
}

export function clearBoard(board) {
  const { rows, cols } = getDimensions(board);
  return createBoard(rows, cols);
}

export function randomizeBoard(board, density = DEFAULT_RANDOM_DENSITY) {
  const { rows, cols } = getDimensions(board);
  const next = createBoard(rows, cols);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      next[y][x] = Math.random() < density ? 1 : 0;
    }
  }
  return next;
}

export function toggleCell(board, x, y) {
  if (!inBounds(board, x, y)) {
    return board;
  }
  const next = cloneBoard(board);
  next[y][x] = next[y][x] > 0 ? 0 : 1;
  return next;
}

export function setCell(board, x, y, value) {
  if (!inBounds(board, x, y)) {
    return board;
  }
  const next = cloneBoard(board);
  next[y][x] = value > 0 ? value : 0;
  return next;
}

export function stampPatternAtCenter(board, pattern, centerX, centerY) {
  const originX = centerX - Math.floor(pattern.width / 2);
  const originY = centerY - Math.floor(pattern.height / 2);
  return stampPattern(board, pattern, originX, originY);
}

export function stampPattern(board, pattern, originX, originY) {
  const next = cloneBoard(board);
  for (const { x, y } of pattern.cells) {
    const newX = originX + x;
    const newY = originY + y;
    if (inBounds(next, newX, newY)) {
      next[newY][newX] = 1;
    }
  }
  return next;
}
