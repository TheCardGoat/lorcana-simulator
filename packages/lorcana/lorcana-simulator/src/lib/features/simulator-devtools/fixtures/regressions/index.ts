import type { LorcanaSimulatorFixture } from "@/features/simulator/model/contracts.js";
import { createFixtureRegistry } from "../registry.js";
import { wardHiddenZoneSelectionRegressionFixture } from "./ward-hidden-zone-selection.js";
import { shiftingThenSingingUnderTheSea } from "@/features/simulator-devtools/fixtures/regressions/shifting-then-singing-under-the-sea";

const regressionFixtureRegistry = createFixtureRegistry(
  [
    wardHiddenZoneSelectionRegressionFixture,
    shiftingThenSingingUnderTheSea,
  ] satisfies LorcanaSimulatorFixture[],
  "simulator regression fixtures",
);

export const LORCANA_REGRESSION_FIXTURE_LIST = regressionFixtureRegistry.list;
export const LORCANA_REGRESSION_FIXTURE_MAP = regressionFixtureRegistry.byId;
export const LORCANA_REGRESSION_FIXTURES = regressionFixtureRegistry.record;

export function getLorcanaRegressionFixture(fixtureId: string): LorcanaSimulatorFixture {
  const fixture = LORCANA_REGRESSION_FIXTURES[fixtureId];
  if (!fixture) {
    throw new Error(`Regression fixture "${fixtureId}" not found`);
  }

  return fixture;
}
