import { listRulesets } from "../game/rulesets";

export default function Controls({
  isRunning,
  intervalMs,
  rulesetKey,
  onRun,
  onStop,
  onStep,
  onClear,
  onRandomize,
  onIntervalChange,
  onRulesetChange,
}) {
  return (
    <div className="life-controls">
      <div className="life-controls__group">
        {isRunning ? (
          <button type="button" className="life-btn" onClick={onStop}>
            Stop
          </button>
        ) : (
          <>
            <button
              type="button"
              className="life-btn life-btn--primary"
              onClick={onRun}
            >
              Run
            </button>
            <button type="button" className="life-btn" onClick={onStep}>
              Step
            </button>
          </>
        )}
        <button
          type="button"
          className="life-btn"
          onClick={onClear}
          disabled={isRunning}
        >
          Clear
        </button>
        <button
          type="button"
          className="life-btn"
          onClick={onRandomize}
          disabled={isRunning}
        >
          Random
        </button>
      </div>

      <label className="life-controls__field">
        Speed
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={intervalMs}
          onChange={(e) => onIntervalChange(Number(e.target.value))}
        />
        <span>{intervalMs} ms</span>
      </label>

      <label className="life-controls__field">
        Rules
        <select
          value={rulesetKey}
          disabled={isRunning}
          onChange={(e) => onRulesetChange(e.target.value)}
        >
          {listRulesets().map(({ key, name }) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
