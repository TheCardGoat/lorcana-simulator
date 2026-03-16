<script lang="ts">
  import { page } from "$app/state";
  import {
      LORCANA_SIMULATOR_VIEWS,
      LorcanaTabletopSimulator,
      type LorcanaSimulatorReadModel,
      type LorcanaSimulatorView,
  } from "$lib";
  import {getLorcanaFixture, LORCANA_SIMULATOR_FIXTURES} from "@/features/simulator-devtools/fixtures";
  import {LorcanaMultiplayerSimulatorAdapter} from "@/features/simulator-devtools/harness";
  import {
    LORCANA_HARNESS_DEFAULT_FIXTURE_ID,
    LORCANA_HARNESS_DEFAULT_VIEW,
  } from "@/features/simulator-devtools/harness/browser-harness";
  import {LorcanaMultiplayerTestEngine} from "@tcg/lorcana-engine/testing";

  function normalizeView(value: string | null): LorcanaSimulatorView {
    return LORCANA_SIMULATOR_VIEWS.includes(value as LorcanaSimulatorView)
      ? (value as LorcanaSimulatorView)
      : LORCANA_HARNESS_DEFAULT_VIEW;
  }

  function normalizeFixtureId(value: string | null): string {
    const candidate = value?.trim();
    if (!candidate) {
      return LORCANA_HARNESS_DEFAULT_FIXTURE_ID;
    }

    return candidate in LORCANA_SIMULATOR_FIXTURES
      ? candidate
      : LORCANA_HARNESS_DEFAULT_FIXTURE_ID;
  }

  const fixtureId = $derived(normalizeFixtureId(page.url.searchParams.get("fixtureId")));
  const currentView = $derived(normalizeView(page.url.searchParams.get("view")));
  const fixture = $derived(getLorcanaFixture(fixtureId));

  const testEngine = $derived.by(() =>
      LorcanaMultiplayerTestEngine.createWithFixture(fixture.playerOne, fixture.playerTwo, {
          seed: fixture.seed ?? "simulator-default",
          skipPreGame: fixture.skipPreGame ?? true,
          validateSync: false,
          debugServerCommunication: true,
      }),
  );

  const engine = $derived.by(() => {
      if (currentView === "spectator" || currentView === "authoritative") {
          return testEngine.asServer();
    }

      if (currentView === "playerTwo") {
          return testEngine.asPlayerTwo();
      }

      return testEngine.asPlayerOne();
  });

  const readModel = $derived.by<Pick<LorcanaSimulatorReadModel, "getMoveLog">>(() => {
      const adapter = new LorcanaMultiplayerSimulatorAdapter(testEngine);
      return {
          getMoveLog: (limit?: number) => adapter.getMoveLog(limit, currentView),
      };
  });
</script>

<LorcanaTabletopSimulator {engine} {readModel}/>
