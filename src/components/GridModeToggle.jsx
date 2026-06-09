import { GRID_MODES } from "../game/constants";

export default function GridModeToggle({ gridMode, onChange, disabled }) {
  return (
    <div className="life-toggle">
      <span className="life-toggle__label">Grid</span>
      <button
        type="button"
        className={`life-btn${
          gridMode === GRID_MODES.BOUNDED ? " life-btn--active" : ""
        }`}
        disabled={disabled}
        onClick={() => onChange(GRID_MODES.BOUNDED)}
      >
        Bounded
      </button>
      <button
        type="button"
        className={`life-btn${
          gridMode === GRID_MODES.TOROIDAL ? " life-btn--active" : ""
        }`}
        disabled={disabled}
        onClick={() => onChange(GRID_MODES.TOROIDAL)}
      >
        Toroidal
      </button>
    </div>
  );
}
