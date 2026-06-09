import { useCallback, useEffect, useRef } from "react";
import {
  CELL_SIZE,
  CELLS_COLS,
  CELLS_ROWS,
  HEIGHT,
  WIDTH,
} from "../game/constants";
import { ageToColor, BOARD_THEME } from "../game/colors";

export default function Board({ board, isRunning, paintAt }) {
  const canvasRef = useRef(null);
  const paintModeRef = useRef(1);
  const draggingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = BOARD_THEME.background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

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

    for (let y = 0; y < CELLS_ROWS; y++) {
      for (let x = 0; x < CELLS_COLS; x++) {
        const age = board[y][x];
        if (age <= 0) continue;
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
    ctx.shadowBlur = 0;
  }, [board]);

  const cellFromEvent = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: Math.floor((e.clientX - rect.left) / CELL_SIZE),
      y: Math.floor((e.clientY - rect.top) / CELL_SIZE),
    };
  }, []);

  const inGrid = ({ x, y }) =>
    x >= 0 && x < CELLS_COLS && y >= 0 && y < CELLS_ROWS;

  const onMouseDown = (e) => {
    if (isRunning) return;
    const cell = cellFromEvent(e);
    if (!inGrid(cell)) return;
    paintModeRef.current = board[cell.y][cell.x] > 0 ? 0 : 1;
    draggingRef.current = true;
    paintAt(cell.x, cell.y, paintModeRef.current);
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current || isRunning) return;
    const cell = cellFromEvent(e);
    if (!inGrid(cell)) return;
    paintAt(cell.x, cell.y, paintModeRef.current);
  };

  const stopDrag = () => {
    draggingRef.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className={`life-board${isRunning ? " life-board--locked" : ""}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    />
  );
}
