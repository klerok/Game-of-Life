export const RULESETS = {
  conway: {
    key: "conway",
    name: "Conway (B3/S23)",
    birth: [3],
    survival: [2, 3],
  },
  highLife: {
    key: "highLife",
    name: "HighLife (B36/S23)",
    birth: [3, 6],
    survival: [2, 3],
  },
  dayAndNight: {
    key: "dayAndNight",
    name: "Day & Night (B3678/S34678)",
    birth: [3, 6, 7, 8],
    survival: [3, 4, 6, 7, 8],
  },
  seeds: {
    key: "seeds",
    name: "Seeds (B2/S)",
    birth: [2],
    survival: [],
  },
};

export function getRuleset(key) {
  return RULESETS[key] ?? RULESETS.conway;
}

export function listRulesets() {
  return Object.values(RULESETS);
}