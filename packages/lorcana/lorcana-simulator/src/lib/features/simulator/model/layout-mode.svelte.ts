import { MediaQuery } from "svelte/reactivity";

export type SimulatorLayoutMode = "desktop" | "tablet" | "mobile";

const MOBILE_MAX_WIDTH = 767;
const DESKTOP_MIN_WIDTH = 1240;

export class SimulatorLayoutModeObserver {
  #mobileQuery = new MediaQuery(`max-width: ${MOBILE_MAX_WIDTH}px`);
  #desktopQuery = new MediaQuery(`min-width: ${DESKTOP_MIN_WIDTH}px`);

  get current(): SimulatorLayoutMode {
    if (this.#desktopQuery.current) {
      return "desktop";
    }

    if (this.#mobileQuery.current) {
      return "mobile";
    }

    return "tablet";
  }

  get isCompact(): boolean {
    return this.current !== "desktop";
  }
}
