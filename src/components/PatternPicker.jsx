import { listPatterns } from "../game/patterns";

export default function PatternPicker({ onSelect, disabled }) {
  return (
    <div className="lifePatterns">
      <span className="lifePatternsLabel">Presets</span>
      {listPatterns().map(({ key, name }) => (
        <button
          key={key}
          type="button"
          className="lifeBtn lifeBtnSmall"
          disabled={disabled}
          onClick={() => onSelect(key)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
