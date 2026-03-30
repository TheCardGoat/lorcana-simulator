import { describe, expect, it } from "bun:test";

import {
  buildFixtureTestRouteHref,
  buildRegressionFixtureTestRouteHref,
  REGRESSION_FIXTURE_INDEX_ROUTE,
  resolveFixtureForTestRoute,
  resolveRegressionFixtureForTestRoute,
} from "./test-routes.js";

describe("test-routes", () => {
  it("builds fixture routes under /tests", () => {
    expect(buildFixtureTestRouteHref("card-states")).toBe("/tests/card-states");
    expect(buildFixtureTestRouteHref("player-selection")).toBe("/tests/player-selection");
  });

  it("builds regression fixture routes under /tests/regressions", () => {
    expect(buildRegressionFixtureTestRouteHref("ward-hidden-zone-selection")).toBe(
      "/tests/regressions/ward-hidden-zone-selection",
    );
    expect(REGRESSION_FIXTURE_INDEX_ROUTE).toBe("/tests/regressions");
  });

  it("resolves registered fixtures for dynamic test routes", () => {
    const fixture = resolveFixtureForTestRoute("card-states");

    expect(fixture?.id).toBe("card-states");
    expect(fixture?.name).toBe("Card States Demo");
  });

  it("resolves the modal abilities fixture route", () => {
    const fixture = resolveFixtureForTestRoute("modal-abilities");

    expect(fixture?.id).toBe("modal-abilities");
    expect(fixture?.name).toBe("Modal Abilities");
  });

  it("resolves the player-selection fixture route", () => {
    const fixture = resolveFixtureForTestRoute("player-selection");

    expect(fixture?.id).toBe("player-selection");
    expect(fixture?.name).toBe("Player Selection");
  });

  it("returns undefined for unknown fixture routes", () => {
    expect(resolveFixtureForTestRoute("does-not-exist")).toBeUndefined();
  });

  it("resolves registered regression fixtures for dynamic test routes", () => {
    const fixture = resolveRegressionFixtureForTestRoute("ward-hidden-zone-selection");

    expect(fixture?.id).toBe("ward-hidden-zone-selection");
    expect(fixture?.name).toBe("Ward Hidden Zone Selection");
  });

  it("returns undefined for unknown regression fixture routes", () => {
    expect(resolveRegressionFixtureForTestRoute("does-not-exist")).toBeUndefined();
  });
});
