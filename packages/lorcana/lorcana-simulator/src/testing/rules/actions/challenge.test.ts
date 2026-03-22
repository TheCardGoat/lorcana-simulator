import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";

import { agustinMadrigalClumsyDad, hiddenCoveTranquilHaven } from "@tcg/lorcana-cards/cards/004";

import { moanaDeterminedExplorer } from "@tcg/lorcana-cards/cards/005";
import { buildCardSnapshotMap } from "@/features/simulator/model/board-utils.js";
import {
  buildChallengeReadyCardIds,
  buildChallengeState,
  buildExecutableMoves,
} from "@/features/simulator/model/derived-state.js";

describe("#### 4.6. Challenge", () => {
  function createChallengeAtLocationFixture() {
    return LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [moanaDeterminedExplorer],
      },
      {
        play: [
          hiddenCoveTranquilHaven,
          { card: agustinMadrigalClumsyDad, atLocation: hiddenCoveTranquilHaven, exerted: true },
        ],
      },
    );
  }

  it("allows challenging a character at a location", () => {
    const testEngine = createChallengeAtLocationFixture();

    expect(
      testEngine.asPlayerOne().challenge(moanaDeterminedExplorer, agustinMadrigalClumsyDad),
    ).toBeSuccessfulCommand();
  });

  it("surfaces a character at a location as a valid simulator challenge target", () => {
    const testEngine = createChallengeAtLocationFixture();
    const playerEngine = testEngine.asPlayerOne();
    const board = playerEngine.getBoard();
    const cardSnapshotsById = buildCardSnapshotMap(board, playerEngine.staticResources);
    const cardSnapshots = Object.values(cardSnapshotsById);
    const moana = cardSnapshots.find((card) => card.label === "Moana - Determined Explorer");
    const agustin = cardSnapshots.find((card) => card.label === "Agustin Madrigal - Clumsy Dad");

    expect(moana).toBeDefined();
    expect(agustin).toBeDefined();

    const readyIds = buildChallengeReadyCardIds(playerEngine.getAvailableMoves());
    expect(readyIds).toContain(moana!.cardId);

    const challengeState = buildChallengeState(
      playerEngine,
      cardSnapshotsById,
      board,
      "playerOne",
      moana!.cardId,
    );
    expect(challengeState.validTargetIds).toContain(agustin!.cardId);
    expect(
      buildChallengeState(playerEngine, cardSnapshotsById, board, "playerOne", moana!.cardId)
        .invalidReasons[agustin!.cardId],
    ).toBeUndefined();

    expect(
      buildExecutableMoves(
        playerEngine,
        cardSnapshotsById,
        playerEngine.getAvailableMoves(),
        playerEngine.enumerateMoves(),
      ).some(
        (move) =>
          move.moveId === "challenge" &&
          "attackerId" in move.params &&
          "defenderId" in move.params &&
          move.params.attackerId === moana!.cardId &&
          move.params.defenderId === agustin!.cardId,
      ),
    ).toBe(true);
  });
});
