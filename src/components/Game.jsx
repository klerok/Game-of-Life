import { useGame } from "../hooks/useGame";
import { useHelpModal } from "../hooks/useHelpModal";
import Board from "./Board";
import Controls from "./Controls";
import GridModeToggle from "./GridModeToggle";
import HelpModal, { HelpDrawer } from "./HelpModal";
import PatternPicker from "./PatternPicker";
import PopulationChart from "./PopulationChart";
import StatsBar from "./StatsBar";
import "../styles/Game.css";

export default function Game() {
  const game = useGame();
  const { isOpen, placement, openHelp, closeHelp } = useHelpModal();

  const isPanelOpen = isOpen && placement === "right";

  return (
    <>
      <div className="lifeShell">
        <div className="lifeGame">
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
          <div className="lifeGameRow">
            <GridModeToggle
              gridMode={game.gridMode}
              onChange={game.setGridMode}
              disabled={game.isRunning}
            />
            <PatternPicker
              onSelect={game.applyPattern}
              disabled={game.isRunning}
            />
          </div>
        </div>

        <aside className="lifeShellSide">
          <aside
            className={`helpPanel helpPanelRight${
              isPanelOpen ? " helpPanelOpen" : ""
            }`}
            aria-hidden={!isPanelOpen}
          >
            {isPanelOpen && <HelpDrawer onClose={closeHelp} />}
          </aside>

          {!isPanelOpen && (
            <button
              type="button"
              className="lifeBtn lifeShellBtnHelp"
              onClick={() => openHelp("right")}
              title="Справка"
              aria-label="Открыть справку"
            >
              ?
            </button>
          )}
        </aside>
      </div>

      <HelpModal isOpen={isOpen} placement={placement} onClose={closeHelp} />
    </>
  );
}
