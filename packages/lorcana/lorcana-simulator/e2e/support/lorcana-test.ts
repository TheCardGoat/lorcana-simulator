import { expect as baseExpect, test } from "@playwright/test";
import { lorcanaMatchers } from "./lorcana-matchers.js";

export const expect = baseExpect.extend(lorcanaMatchers);
export { test };

export {
  PLAYER_ONE,
  PLAYER_TWO,
} from "../../src/lib/features/simulator-devtools/harness/browser-harness.js";
export { LorcanaSimulatorPom, LorcanaSimulatorSeatPom } from "./lorcana-simulator-pom.js";
