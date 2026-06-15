import { MAX_AGE_COLOR } from "../game/constants";

export function ageToColor(age, maxAge = MAX_AGE_COLOR) {
  if (age <= 0) return null;
  const t = Math.min(age, maxAge) / maxAge;
  return `hsl(${180 + t * 120}, 80%, ${45 + t * 15}%)`;
}

export function ageToGlow(age, maxAge = MAX_AGE_COLOR) {
  if (age <= 0) return "transparent";
  const t = Math.min(age, maxAge) / maxAge;
  const hue = 180 + t * 120;
  return `0 0 ${4 + t * 8}px hsla(${hue}, 80%, 60%, 0.65)`;
}

export const BOARD_THEME = {
  background: "#0a0a0f",
  gridLine: "rgba(255, 255, 255, 0.06)",
};
