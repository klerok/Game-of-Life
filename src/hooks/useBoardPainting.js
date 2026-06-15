import { useCallback, useRef } from "react";
import { CELL_SIZE, CELLS_COLS, CELLS_ROWS } from "../game/constants";

function isInGrid(x, y) {
  return x >= 0 && x < CELLS_COLS && y >= 0 && y < CELLS_ROWS;
}

function cellFromCanvas(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.floor((event.clientX - rect.left) / CELL_SIZE),
    y: Math.floor((event.clientY - rect.top) / CELL_SIZE),
  };
}

export function useBoardPainting({ board, isRunning, paintAt, canvasRef }) {
  const paintModeRef = useRef(1);
  const draggingRef = useRef(false);

  const resolveCell = useCallback(
    (event, requireDrag) => {
      if (isRunning) return null;
      if (requireDrag && !draggingRef.current) return null;

      const canvas = canvasRef.current;
      if (!canvas) return null;

      const cell = cellFromCanvas(event, canvas);
      return isInGrid(cell.x, cell.y) ? cell : null;
    },
    [isRunning, canvasRef]
  );

  const onMouseDown = useCallback(
    (event) => {
      const cell = resolveCell(event, false);
      if (!cell) return;

      paintModeRef.current = board[cell.y][cell.x] > 0 ? 0 : 1;
      draggingRef.current = true;
      paintAt(cell.x, cell.y, paintModeRef.current);
    },
    [board, paintAt, resolveCell]
  );

  const onMouseMove = useCallback(
    (event) => {
      const cell = resolveCell(event, true);
      if (!cell) return;

      paintAt(cell.x, cell.y, paintModeRef.current);
    },
    [paintAt, resolveCell]
  );

  const stopDrag = useCallback(() => {
    draggingRef.current = false;
  }, []);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp: stopDrag,
    onMouseLeave: stopDrag,
  };
}
