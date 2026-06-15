import { useEffect, useRef } from "react";
import { HEIGHT, WIDTH } from "../game/constants";
import { drawBoard } from "../render/drawBoard";
import { useBoardPainting } from "../hooks/useBoardPainting";

export default function Board({ board, isRunning, paintAt }) {
  const canvasRef = useRef(null);

  const pointerHandlers = useBoardPainting({
    board,
    isRunning,
    paintAt,
    canvasRef,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawBoard(ctx, board);
  }, [board]);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className={`lifeBoard${isRunning ? " lifeBoardLocked" : ""}`}
      {...pointerHandlers}
    />
  );
}
