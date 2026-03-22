import type {
  LorcanaSimulatorFixture,
  LorcanaSimulatorView,
} from "@/features/simulator/model/contracts.js";
import {
  getLorcanaFixture,
  LORCANA_SIMULATOR_FIXTURES,
} from "@/features/simulator-devtools/fixtures";
import { decodeInlineFixtureParam, deserializeInlineFixture } from "./browser-fixture";
import {
  LORCANA_HARNESS_DEFAULT_FIXTURE_ID,
  LORCANA_HARNESS_DEFAULT_VIEW,
} from "./browser-harness";

export interface LorcanaBrowserRouteState {
  fixture: LorcanaSimulatorFixture;
  fixtureId: string;
  view: LorcanaSimulatorView;
}

export function normalizeView(value: string | null): LorcanaSimulatorView {
  return value === "playerOne" ||
    value === "playerTwo" ||
    value === "spectator" ||
    value === "authoritative"
    ? value
    : LORCANA_HARNESS_DEFAULT_VIEW;
}

export function normalizeFixtureId(value: string | null): string {
  const candidate = value?.trim();
  if (!candidate) {
    return LORCANA_HARNESS_DEFAULT_FIXTURE_ID;
  }

  return candidate in LORCANA_SIMULATOR_FIXTURES ? candidate : LORCANA_HARNESS_DEFAULT_FIXTURE_ID;
}

export function resolveBrowserRouteState(url: URL): LorcanaBrowserRouteState {
  const view = normalizeView(url.searchParams.get("view"));
  const fixtureId = normalizeFixtureId(url.searchParams.get("fixtureId"));
  const parsedFixture = decodeInlineFixtureParam(url.searchParams.get("fixture"));
  const fixture = parsedFixture
    ? deserializeInlineFixture(parsedFixture)
    : getLorcanaFixture(fixtureId);

  return {
    fixture,
    fixtureId: parsedFixture?.id ?? fixture.id ?? fixtureId,
    view,
  };
}
