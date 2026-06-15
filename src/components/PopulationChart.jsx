import { useEffect, useRef } from "react";
import { WIDTH } from "../game/constants";

const HEIGHT = 48;

export default function PopulationChart({ history }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || history.length === 0) return;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#12121a";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const max = Math.max(...history, 1);
    ctx.strokeStyle = "#3ef0d3";
    ctx.lineWidth = 2;
    ctx.beginPath();

    history.forEach((v, i) => {
      const x = (i / Math.max(history.length - 1, 1)) * (WIDTH - 8) + 4;
      const y = HEIGHT - 4 - (v / max) * (HEIGHT - 8);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [history]);

  return (
    <div className="lifeChart">
      <span className="lifeChartLabel">Population</span>
      <canvas ref={ref} width={WIDTH} height={HEIGHT} />
    </div>
  );
}
