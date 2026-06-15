import {
  CELL_SIZE,
  CELLS_COLS,
  CELLS_ROWS,
  HEIGHT,
  WIDTH,
} from "../game/constants";
import { ageToColor, BOARD_THEME } from "./colors";

function drawBackground(ctx) {
  ctx.fillStyle = BOARD_THEME.background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawGrid(ctx) {
  ctx.strokeStyle = BOARD_THEME.gridLine;

  for (let x = 0; x <= CELLS_COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL_SIZE + 0.5, 0);
    ctx.lineTo(x * CELL_SIZE + 0.5, HEIGHT);
    ctx.stroke();
  }

  for (let y = 0; y <= CELLS_ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL_SIZE + 0.5);
    ctx.lineTo(WIDTH, y * CELL_SIZE + 0.5);
    ctx.stroke();
  }
}

function drawLiveCells(ctx, board) {
  for (let y = 0; y < CELLS_ROWS; y++) {
    for (let x = 0; x < CELLS_COLS; x++) {
      const age = board[y][x];
      if (age > 0) {
        const color = ageToColor(age);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.fillRect(
          x * CELL_SIZE + 1,
          y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      }
    }
  }
  ctx.shadowBlur = 0;
}

export function drawBoard(ctx, board) {
  drawBackground(ctx);
  drawGrid(ctx);
  drawLiveCells(ctx, board);
}
