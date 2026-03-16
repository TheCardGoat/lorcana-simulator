import type { CanonicalPlayerId } from "../../src/lib/lorcana-simulator/testing/browser-harness.js";
import type { LorcanaZoneId } from "../../src/lib/lorcana-simulator/types.js";

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T = unknown> {
      toHaveOpeningTurnPlayer(expectedPlayer: CanonicalPlayerId | undefined): Promise<R>;
      toHavePendingMulligan(expectedPlayers: CanonicalPlayerId[]): Promise<R>;
      toHavePriorityPlayer(expectedPlayer: CanonicalPlayerId): Promise<R>;
      toHaveChoosingFirstPlayer(expectedPlayer: CanonicalPlayerId | undefined): Promise<R>;
      toBeInPhase(expectedPhase: string): Promise<R>;
      toHaveCardCountInZone(expected: {
        zone: LorcanaZoneId;
        player: string;
        count: number;
      }): Promise<R>;
    }
  }
}

export {};
