import type { Page } from "@playwright/test";
import type {
  LorcanaBrowserHarnessConfig,
  LorcanaBrowserHarnessExecuteResult,
  LorcanaBrowserStatus,
  CanonicalPlayerId,
} from "../../src/lib/lorcana-simulator/testing/browser-harness.js";
import {
  LORCANA_HARNESS_DEFAULT_FIXTURE_ID,
  LORCANA_HARNESS_DEFAULT_VIEW,
  toSimulatorView,
} from "../../src/lib/lorcana-simulator/testing/browser-harness.js";
import type {
  LorcanaTableSeat,
  LorcanaSimulatorView,
  LorcanaZoneId,
} from "../../src/lib/lorcana-simulator/types.js";

type OwnedSimulatorView = Extract<LorcanaSimulatorView, "playerOne" | "playerTwo">;

interface LorcanaHarnessWindow extends Window {
  __lorcanaTestHarness?: {
    getConfig(): LorcanaBrowserHarnessConfig;
    reset(): Promise<void>;
    execute(
      view: LorcanaSimulatorView,
      moveId: string,
      params?: Record<string, unknown>,
    ): Promise<LorcanaBrowserHarnessExecuteResult>;
    getStatus(view?: LorcanaSimulatorView): Promise<LorcanaBrowserStatus>;
  };
}

export interface LorcanaSimulatorPomLike {
  getStatus(): Promise<LorcanaBrowserStatus>;
  getZoneCardCount(expected: { zone: LorcanaZoneId; player: string }): Promise<number>;
}

export class LorcanaSimulatorPom {
  private currentView: OwnedSimulatorView = LORCANA_HARNESS_DEFAULT_VIEW;

  constructor(readonly page: Page) {}

  async goto(options?: { fixtureId?: string; view?: LorcanaSimulatorView }): Promise<void> {
    const fixtureId = options?.fixtureId ?? LORCANA_HARNESS_DEFAULT_FIXTURE_ID;
    const view = options?.view ?? LORCANA_HARNESS_DEFAULT_VIEW;
    const params = new URLSearchParams({ fixtureId, view });
    const url = `/test-harness/lorcana?${params.toString()}`;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await this.page.goto(url, { waitUntil: "domcontentloaded" });
        break;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const isRetryable =
          message.includes("ERR_ABORTED") || message.includes("frame was detached");

        if (!isRetryable || attempt === 3) {
          throw error;
        }

        await this.page.waitForTimeout(750);
      }
    }

    await this.page.getByTestId("lorcana-test-harness").waitFor();
    await this.waitForHarness();
    this.currentView = await this.getCurrentOwnedView();
  }

  asTopPlayer(): LorcanaSimulatorSeatPom {
    return new LorcanaSimulatorSeatPom(this, "top");
  }

  asBottomPlayer(): LorcanaSimulatorSeatPom {
    return new LorcanaSimulatorSeatPom(this, "bottom");
  }

  async reset(): Promise<void> {
    await this.page.evaluate(async () => {
      await (window as LorcanaHarnessWindow).__lorcanaTestHarness?.reset();
    });
    await this.waitForHarness();
  }

  async getStatus(view?: LorcanaSimulatorView): Promise<LorcanaBrowserStatus> {
    return this.page.evaluate(async (targetView) => {
      const harness = (window as LorcanaHarnessWindow).__lorcanaTestHarness;
      if (!harness) {
        throw new Error("Lorcana test harness is unavailable in the page.");
      }

      return harness.getStatus(targetView);
    }, view);
  }

  async execute(
    view: LorcanaSimulatorView,
    moveId: string,
    params: Record<string, unknown> = {},
  ): Promise<LorcanaBrowserHarnessExecuteResult> {
    return this.page.evaluate(
      async ({ targetView, targetMoveId, targetParams }) => {
        const harness = (window as LorcanaHarnessWindow).__lorcanaTestHarness;
        if (!harness) {
          throw new Error("Lorcana test harness is unavailable in the page.");
        }

        return harness.execute(targetView, targetMoveId, targetParams);
      },
      { targetView: view, targetMoveId: moveId, targetParams: params },
    );
  }

  async waitForStateChange(previousStateID: number, view: LorcanaSimulatorView): Promise<void> {
    await this.page.waitForFunction(
      async ({ targetView, targetStateID }) => {
        const harness = (window as LorcanaHarnessWindow).__lorcanaTestHarness;
        if (!harness) {
          return false;
        }

        const status = await harness.getStatus(targetView);
        return status.stateID !== targetStateID;
      },
      { targetView: view, targetStateID: previousStateID },
    );
  }

  private async waitForHarness(): Promise<void> {
    await this.page.waitForFunction(() =>
      Boolean((window as LorcanaHarnessWindow).__lorcanaTestHarness),
    );
  }

  async getHarnessConfig(): Promise<LorcanaBrowserHarnessConfig> {
    return this.page.evaluate(() => {
      const harness = (window as LorcanaHarnessWindow).__lorcanaTestHarness;
      if (!harness) {
        throw new Error("Lorcana test harness is unavailable in the page.");
      }

      return harness.getConfig();
    });
  }

  async getCurrentOwnedView(): Promise<OwnedSimulatorView> {
    const config = await this.getHarnessConfig();
    if (config.view === "playerOne" || config.view === "playerTwo") {
      return config.view;
    }

    return this.currentView;
  }

  async resolveViewForSeat(seat: LorcanaTableSeat): Promise<OwnedSimulatorView> {
    const ownedView = await this.getCurrentOwnedView();

    if (seat === "bottom") {
      return ownedView;
    }

    return ownedView === "playerOne" ? "playerTwo" : "playerOne";
  }
}

export class LorcanaSimulatorSeatPom implements LorcanaSimulatorPomLike {
  constructor(
    private readonly pom: LorcanaSimulatorPom,
    private readonly seat: LorcanaTableSeat,
  ) {}

  async chooseFirstPlayer(playerId: CanonicalPlayerId): Promise<void> {
    const view = await this.pom.resolveViewForSeat(this.seat);
    const previousStatus = await this.getStatus();
    const promptButton = this.pom.page.getByTestId(`pregame-choose-first-player-${playerId}`);

    if (
      (await promptButton.count()) > 0 &&
      (await promptButton
        .first()
        .isVisible()
        .catch(() => false))
    ) {
      await promptButton.first().click();
    } else {
      const targetSide = toSimulatorView(playerId);
      const result = await this.pom.execute(view, "chooseWhoGoesFirst", {
        playerId,
        side: targetSide,
      });

      if (!result.success) {
        throw new Error(result.reason ?? `Failed to execute chooseWhoGoesFirst for ${playerId}.`);
      }
    }

    await this.pom.waitForStateChange(previousStatus.stateID, view);
  }

  async getStatus(): Promise<LorcanaBrowserStatus> {
    return this.pom.getStatus();
  }

  async getZoneCardCount(expected: { zone: LorcanaZoneId; player: string }): Promise<number> {
    const status = await this.getStatus();
    return status.zoneCounts[expected.player]?.[expected.zone] ?? 0;
  }
}
