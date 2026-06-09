import { listPatterns } from "../game/patterns";

export default function PatternPicker({ onSelect, disabled }) {
  return (
    <div className="life-patterns">
      <span className="life-patterns__label">Presets</span>
      {listPatterns().map(({ key, name }) => (
        <button
          key={key}
          type="button"
          className="life-btn life-btn--small"
          disabled={disabled}
          onClick={() => onSelect(key)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
