import { describe, expect, it } from "bun:test";
import { LORCANA_REGRESSION_FIXTURE_LIST } from "@/features/simulator-devtools/fixtures/regressions";
import {
  generalFixtureRouteLinks,
  regressionFixtureCount,
  regressionRouteLink,
  staticRouteLinks,
} from "./dev-routes.js";

describe("dev-routes", () => {
  it("keeps general fixture links separate from the regression index link", () => {
    expect(staticRouteLinks.some((route) => route.href === "/tests/regressions")).toBe(false);
    expect(generalFixtureRouteLinks.some((route) => route.href === "/tests/regressions")).toBe(
      false,
    );
    expect(
      generalFixtureRouteLinks.some((route) => route.href.includes("/tests/regressions/")),
    ).toBe(false);
    expect(regressionRouteLink.href).toBe("/tests/regressions");
    expect(regressionFixtureCount).toBe(LORCANA_REGRESSION_FIXTURE_LIST.length);
  });
});
