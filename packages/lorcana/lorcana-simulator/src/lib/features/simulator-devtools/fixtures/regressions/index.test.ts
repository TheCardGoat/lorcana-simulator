import { describe, expect, it } from "bun:test";
import { LORCANA_SIMULATOR_FIXTURES } from "../index.js";
import {
  getLorcanaRegressionFixture,
  LORCANA_REGRESSION_FIXTURES,
  LORCANA_REGRESSION_FIXTURE_LIST,
} from "./index.js";

describe("regression fixture registry", () => {
  it("keeps regression fixtures separate from general fixtures", () => {
    const regressionFixture = getLorcanaRegressionFixture("ward-hidden-zone-selection");

    expect(LORCANA_REGRESSION_FIXTURES[regressionFixture.id]).toBe(regressionFixture);
    expect(LORCANA_REGRESSION_FIXTURE_LIST).toContain(regressionFixture);
    expect(LORCANA_SIMULATOR_FIXTURES[regressionFixture.id]).toBeUndefined();
  });

  it("throws for unknown regression fixture ids", () => {
    expect(() => getLorcanaRegressionFixture("missing-regression")).toThrow(/not found/i);
  });
});
