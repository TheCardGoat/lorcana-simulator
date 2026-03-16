import type { MatcherReturnType } from "@playwright/test";
import type {
  CanonicalPlayerId,
  LorcanaBrowserStatus,
} from "../../src/lib/lorcana-simulator/testing/browser-harness.js";
import type { LorcanaZoneId } from "../../src/lib/lorcana-simulator/types.js";
import type { LorcanaSimulatorPomLike } from "./lorcana-simulator-pom.js";

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return `'${value}'`;
  }

  if (value === undefined) {
    return "undefined";
  }

  return JSON.stringify(value);
}

function formatPlayers(players: readonly string[]): string {
  return `[${players.map((player) => formatValue(player)).join(", ")}]`;
}

function isPlayerPom(value: unknown): value is LorcanaSimulatorPomLike {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as LorcanaSimulatorPomLike).getStatus === "function" &&
    typeof (value as LorcanaSimulatorPomLike).getZoneCardCount === "function"
  );
}

async function getStatusOrThrow(received: unknown): Promise<LorcanaBrowserStatus> {
  if (!isPlayerPom(received)) {
    throw new Error("Expected a LorcanaSimulatorSeatPom as the matcher receiver.");
  }

  return received.getStatus();
}

export const lorcanaMatchers = {
  async toHaveOpeningTurnPlayer(
    this: { isNot: boolean },
    received: unknown,
    expectedPlayer: CanonicalPlayerId | undefined,
  ): Promise<MatcherReturnType> {
    const status = await getStatusOrThrow(received);
    const pass = status.openingTurnPlayer === expectedPlayer;

    return {
      pass,
      message: () =>
        `Expected opening-turn player ${this.isNot ? "not " : ""}to be ${formatValue(expectedPlayer)} but received ${formatValue(status.openingTurnPlayer)}.`,
    };
  },

  async toHavePendingMulligan(
    this: { isNot: boolean },
    received: unknown,
    expectedPlayers: CanonicalPlayerId[],
  ): Promise<MatcherReturnType> {
    const status = await getStatusOrThrow(received);
    const actualPlayers = status.pendingMulligan ?? [];
    const pass =
      actualPlayers.length === expectedPlayers.length &&
      actualPlayers.every((player, index) => player === expectedPlayers[index]);

    return {
      pass,
      message: () =>
        `Expected pending mulligan ${this.isNot ? "not " : ""}to be ${formatPlayers(expectedPlayers)} but received ${formatPlayers(actualPlayers)}.`,
    };
  },

  async toHavePriorityPlayer(
    this: { isNot: boolean },
    received: unknown,
    expectedPlayer: CanonicalPlayerId,
  ): Promise<MatcherReturnType> {
    const status = await getStatusOrThrow(received);
    const pass = status.priorityPlayer === expectedPlayer;

    return {
      pass,
      message: () =>
        `Expected priority player ${this.isNot ? "not " : ""}to be ${formatValue(expectedPlayer)} but received ${formatValue(status.priorityPlayer)}.`,
    };
  },

  async toHaveChoosingFirstPlayer(
    this: { isNot: boolean },
    received: unknown,
    expectedPlayer: CanonicalPlayerId | undefined,
  ): Promise<MatcherReturnType> {
    const status = await getStatusOrThrow(received);
    const pass = status.choosingFirstPlayer === expectedPlayer;

    return {
      pass,
      message: () =>
        `Expected choosing-first-player ${this.isNot ? "not " : ""}to be ${formatValue(expectedPlayer)} but received ${formatValue(status.choosingFirstPlayer)}.`,
    };
  },

  async toBeInPhase(
    this: { isNot: boolean },
    received: unknown,
    expectedPhase: string,
  ): Promise<MatcherReturnType> {
    const status = await getStatusOrThrow(received);
    const pass = status.phase === expectedPhase;

    return {
      pass,
      message: () =>
        `Expected phase ${this.isNot ? "not " : ""}to be ${formatValue(expectedPhase)} but received ${formatValue(status.phase)}.`,
    };
  },

  async toHaveCardCountInZone(
    this: { isNot: boolean },
    received: unknown,
    expected: {
      zone: LorcanaZoneId;
      player: string;
      count: number;
    },
  ): Promise<MatcherReturnType> {
    if (!isPlayerPom(received)) {
      throw new Error("Expected a LorcanaSimulatorSeatPom as the matcher receiver.");
    }

    const actualCount = await received.getZoneCardCount({
      zone: expected.zone,
      player: expected.player,
    });
    const pass = actualCount === expected.count;

    return {
      pass,
      message: () =>
        `Expected zone '${expected.zone}' for player '${expected.player}' ${this.isNot ? "not " : ""}to have card count ${expected.count} but received ${actualCount}.`,
    };
  },
};
