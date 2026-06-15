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
    <div className="lifeControls">
      <div className="lifeControlsGroup">
        {isRunning ? (
          <button type="button" className="lifeBtn" onClick={onStop}>
            Stop
          </button>
        ) : (
          <>
            <button
              type="button"
              className="lifeBtn lifeBtnPrimary"
              onClick={onRun}
            >
              Run
            </button>
            <button type="button" className="lifeBtn" onClick={onStep}>
              Step
            </button>
          </>
        )}
        <button
          type="button"
          className="lifeBtn"
          onClick={onClear}
          disabled={isRunning}
        >
          Clear
        </button>
        <button
          type="button"
          className="lifeBtn"
          onClick={onRandomize}
          disabled={isRunning}
        >
          Random
        </button>
      </div>

      <label className="lifeControlsField">
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

      <label className="lifeControlsField">
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
