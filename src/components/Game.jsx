import { useGame } from "../hooks/useGame";
import Board from "./Board";
import Controls from "./Controls";
import GridModeToggle from "./GridModeToggle";
import PatternPicker from "./PatternPicker";
import PopulationChart from "./PopulationChart";
import StatsBar from "./StatsBar";
import "../styles/Game.css";

export default function Game() {
  const game = useGame();

  return (
    <div className="life-game">
      <StatsBar
        generation={game.generation}
        population={game.population}
        rulesetName={game.ruleset.name}
        gridMode={game.gridMode}
      />
      <Board
        board={game.board}
        isRunning={game.isRunning}
        paintAt={game.paintAt}
      />
      <PopulationChart history={game.history} />
      <Controls
        isRunning={game.isRunning}
        intervalMs={game.intervalMs}
        rulesetKey={game.rulesetKey}
        onRun={game.run}
        onStop={game.stop}
        onStep={game.stepOnce}
        onClear={game.clear}
        onRandomize={game.randomize}
        onIntervalChange={game.setIntervalMs}
        onRulesetChange={game.setRulesetKey}
      />
      <div className="life-game__row">
        <GridModeToggle
          gridMode={game.gridMode}
          onChange={game.setGridMode}
          disabled={game.isRunning}
        />
        <PatternPicker onSelect={game.applyPattern} disabled={game.isRunning} />
      </div>
    </div>
  );
}
