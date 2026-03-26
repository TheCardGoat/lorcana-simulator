import { describe, expect, it } from "bun:test";
import type { CardInstanceId } from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { aladdinPrinceAli, tinkerBellPeterPansAlly } from "../characters";
import { healingGlow } from "./028-healing-glow";
import { developYourBrain } from "./161-develop-your-brain";

describe("Develop Your Brain", () => {
  it("creates a pending scry selection that reveals the looked-at cards before the player chooses destinations", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [developYourBrain],
      inkwell: developYourBrain.cost,
      deck: [aladdinPrinceAli, tinkerBellPeterPansAlly, healingGlow],
    });

    const playResult = testEngine.asPlayerOne().playCard(developYourBrain);
    expect(playResult).toBeSuccessfulCommand();

    const projectedPendingEffect = testEngine.asPlayerOne().getPendingEffects()[0];

    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(1);
    expect(testEngine.asPlayerOne().getPendingChoice()).toEqual(
      expect.objectContaining({
        type: "action-effect",
        playerID: PLAYER_ONE,
      }),
    );
    expect(projectedPendingEffect).toEqual(
      expect.objectContaining({
        type: "scry-selection",
        payload: expect.objectContaining({
          resolutionInput: expect.objectContaining({
            eventSnapshot: expect.objectContaining({
              revealedCardIds: expect.any(Array),
            }),
          }),
        }),
      }),
    );
    const gameLog = testEngine.getServerEngine().getRuntime().getGameLog();
    const scryLogEntry = [...gameLog]
      .reverse()
      .find((entry) => entry.defaultMessage?.key === "lorcana.scry.count");

    expect(scryLogEntry).toBeDefined();
    expect(scryLogEntry?.visibility.mode).toBe("PUBLIC_WITH_OVERRIDES");
    expect(scryLogEntry?.defaultMessage).toMatchObject({
      key: "lorcana.scry.count",
      values: { playerId: PLAYER_ONE, count: 2 },
    });
    if (!scryLogEntry || scryLogEntry.visibility.mode !== "PUBLIC_WITH_OVERRIDES") {
      return;
    }
    expect(scryLogEntry.visibility.overrides[PLAYER_ONE]).toMatchObject({
      key: "lorcana.scry.detail",
      values: { playerId: PLAYER_ONE, count: 2 },
    });

    const pendingEffect = testEngine.asServer().getState().G.pendingEffects[0];
    expect(pendingEffect).toEqual(
      expect.objectContaining({
        kind: "scry-selection",
        chooserId: PLAYER_ONE,
        controllerId: PLAYER_ONE,
      }),
    );

    const revealedCardIds = pendingEffect?.resolutionInput.eventSnapshot?.revealedCardIds as
      | CardInstanceId[]
      | undefined;
    expect(revealedCardIds).toHaveLength(2);
    expect(scryLogEntry.visibility.overrides[PLAYER_ONE]?.values).toMatchObject({
      lookedAt: revealedCardIds,
    });

    const [firstRevealedId, secondRevealedId] = revealedCardIds!;
    expect(testEngine.getCardDefinitionId(firstRevealedId)).toEqual(tinkerBellPeterPansAlly.id);
    expect(testEngine.getCardDefinitionId(secondRevealedId)).toEqual(healingGlow.id);

    expect(
      testEngine.asPlayerOne().resolvePendingEffect(developYourBrain, {
        destinations: [
          {
            zone: "hand",
            cards: [secondRevealedId],
          },
          {
            zone: "deck-bottom",
            cards: [firstRevealedId],
          },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().getCardZone(healingGlow)).toEqual("hand");
    const lastDeckCardId = testEngine.getCardInstanceIdsInZone("deck", PLAYER_ONE).at(-1);

    expect(lastDeckCardId).toBeDefined();
    expect(testEngine.getCardDefinitionId(lastDeckCardId!)).toEqual(aladdinPrinceAli.id);

    const resolveScryLogEntry = [...testEngine.getServerEngine().getRuntime().getGameLog()]
      .reverse()
      .find((entry) => entry.defaultMessage?.key === "lorcana.effect.resolve.scrySelection");

    expect(resolveScryLogEntry).toBeDefined();
    expect(resolveScryLogEntry?.visibility.mode).toBe("PUBLIC_WITH_OVERRIDES");
    if (!resolveScryLogEntry || resolveScryLogEntry.visibility.mode !== "PUBLIC_WITH_OVERRIDES") {
      return;
    }

    expect(resolveScryLogEntry.visibility.overrides[PLAYER_ONE]).toMatchObject({
      key: "lorcana.effect.resolve.scrySelection.detail",
      values: {
        playerId: PLAYER_ONE,
        selection: ["Hand: Healing Glow", "Bottom of deck: Tinker Bell - Peter Pan’s Ally"],
        handCards: [secondRevealedId],
        deckBottomCards: [firstRevealedId],
      },
    });
  });

  it("projects enriched scry destination metadata for the pending selection", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [developYourBrain],
      inkwell: developYourBrain.cost,
      deck: [aladdinPrinceAli, tinkerBellPeterPansAlly],
    });

    expect(testEngine.asPlayerOne().playCard(developYourBrain)).toBeSuccessfulCommand();

    const pendingEffect = testEngine.asServer().getState().G.pendingEffects[0];
    expect(pendingEffect?.selectionContext).toMatchObject({
      kind: "scry-selection",
      destinationRules: [
        {
          zone: "hand",
          min: 1,
          max: 1,
          filters: [],
          playFilters: [],
        },
        {
          zone: "deck-bottom",
          remainder: true,
          filters: [],
          playFilters: [],
        },
      ],
    });
  });
});
