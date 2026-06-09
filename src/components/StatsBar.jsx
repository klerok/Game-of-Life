export default function StatsBar({
  generation,
  population,
  rulesetName,
  gridMode,
}) {
  return (
    <div className="life-stats">
      <span>Generation: {generation}</span>
      <span>Alive: {population}</span>
      <span>{rulesetName}</span>
      <span>{gridMode === "toroidal" ? "Toroidal" : "Bounded"}</span>
    </div>
  );
}
