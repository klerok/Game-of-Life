import { GRID_MODES } from "../game/constants";

export default function GridModeToggle({ gridMode, onChange, disabled }) {
  return (
    <div className="lifeToggle">
      <span className="lifeToggleLabel">Grid</span>
      <button
        type="button"
        className={`lifeBtn${
          gridMode === GRID_MODES.BOUNDED ? " lifeBtnActive" : ""
        }`}
        disabled={disabled}
        onClick={() => onChange(GRID_MODES.BOUNDED)}
      >
        Bounded
      </button>
      <button
        type="button"
        className={`lifeBtn${
          gridMode === GRID_MODES.TOROIDAL ? " lifeBtnActive" : ""
        }`}
        disabled={disabled}
        onClick={() => onChange(GRID_MODES.TOROIDAL)}
      >
        Toroidal
      </button>
    </div>
  );
}
