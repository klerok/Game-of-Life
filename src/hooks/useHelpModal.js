import { useCallback, useEffect, useState } from "react";
import { HELP_SEEN_KEY } from "../game/constants";

export function useHelpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState("center");

  useEffect(() => {
    try {
      if (!localStorage.getItem(HELP_SEEN_KEY)) {
        setPlacement("center");
        setIsOpen(true);
      }
    } catch {
      setPlacement("center");
      setIsOpen(true);
    }
  }, []);

  const openHelp = useCallback((side = "right") => {
    setPlacement(side);
    setIsOpen(true);
  }, []);

  const closeHelp = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem(HELP_SEEN_KEY, "1");
    } catch {
      // private mode
    }
  }, []);

  return { isOpen, placement, openHelp, closeHelp };
}
