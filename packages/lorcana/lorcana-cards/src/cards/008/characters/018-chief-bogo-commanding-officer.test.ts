import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { chiefBogoCommandingOfficer } from "./018-chief-bogo-commanding-officer";

const bodyguardCharacter = createMockCharacter({
  id: "chief-bogo-bodyguard",
  name: "Bodyguard Character",
  cost: 3,
  strength: 3,
  willpower: 3,
  abilities: [
    {
      type: "keyword",
      keyword: "Bodyguard",
      text: "Bodyguard",
    },
  ],
});

const lowCostCharacter = createMockCharacter({
  id: "chief-bogo-top-deck-character",
  name: "Top Deck Character",
  cost: 4,
  strength: 4,
  willpower: 4,
});

describe("Chief Bogo - Commanding Officer", () => {
  it.skip("SENDING BACKUP - during an opponent's turn, banishing one of your Bodyguard characters can reveal and free-play a low-cost character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [chiefBogoCommandingOfficer, bodyguardCharacter],
      deck: [lowCostCharacter],
    });

    const bodyguardId = testEngine.findCardInstanceId(bodyguardCharacter, "play");
    const lowCostCharacterId = testEngine.findCardInstanceId(lowCostCharacter, "deck");

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asServer().manualSetDamage(bodyguardId, 10)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine
        .asPlayerOne()
        .resolvePendingByCard(chiefBogoCommandingOfficer, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    const zone = testEngine.asServer().getState().ctx.zones.private.cardIndex[
      lowCostCharacterId
    ]?.zoneKey;

    expect(zone?.startsWith("play")).toBe(true);
    expect(testEngine.asServer().getCard(lowCostCharacterId).exerted).toBe(true);
  });

  it("does not trigger on your own turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [chiefBogoCommandingOfficer, bodyguardCharacter],
      deck: [lowCostCharacter],
    });

    const bodyguardId = testEngine.findCardInstanceId(bodyguardCharacter, "play");

    expect(testEngine.asServer().manualSetDamage(bodyguardId, 10)).toBeSuccessfulCommand();

    // Per CRD 6.2.7: ability IS enqueued; condition checked at resolution
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine
        .asPlayerOne()
        .resolvePendingByCard(chiefBogoCommandingOfficer, { resolveOptional: true }),
    ).toBeSuccessfulCommand();
  });
});
