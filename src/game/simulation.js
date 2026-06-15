import { step } from "./rules";
import { getRuleset } from "./rulesets";

export function runStep(board, rulesetKey, gridMode) {
  return step(board, getRuleset(rulesetKey), { gridMode });
}
