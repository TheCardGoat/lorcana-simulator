import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { belleSnowfieldStrategist } from "./158-belle-snowfield-strategist";

const sacrificialCharacter = createMockCharacter({
  id: "belle-sacrifice",
  name: "Belle Sacrifice",
  cost: 2,
  strength: 2,
  willpower: 1,
});

const opponentAttacker = createMockCharacter({
  id: "belle-opponent-attacker",
  name: "Belle Opponent Attacker",
  cost: 3,
  strength: 5,
  willpower: 5,
});

describe("Belle - Snowfield Strategist", () => {
  it("puts banished character from discard into inkwell facedown and exerted when accepted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [belleSnowfieldStrategist, { card: sacrificialCharacter, exerted: true }],
        deck: 2,
      },
      {
        play: [opponentAttacker],
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    // Opponent challenges the sacrificial character to banish it
    expect(
      testEngine.asPlayerTwo().challenge(opponentAttacker, sacrificialCharacter),
    ).toBeSuccessfulCommand();

    // Belle's WINTER STOCKPILE triggers - accept the optional ability
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
      }),
    ).toBeSuccessfulCommand();

    // Accepting creates a pending target selection for which discard card to put in inkwell
    const sacrificialId = testEngine.findCardInstanceId(sacrificialCharacter, "discard", "p1");
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [sacrificialId] }),
    ).toBeSuccessfulCommand();

    // The banished character should now be in the inkwell
    expect(testEngine.asPlayerOne().getCardZone(sacrificialCharacter)).toBe("inkwell");

    // It should be exerted and facedown
    const cardInstanceId = testEngine.findCardInstanceId(sacrificialCharacter, "inkwell", "p1");
    const card = testEngine.asServer().getCard(cardInstanceId);
    expect(card.exerted).toBe(true);
    expect(
      testEngine.getAuthoritativeState().ctx.zones.private.cardMeta[cardInstanceId]
        ?.publicFaceState,
    ).toBe("faceDown");
  });

  it("does not move the card when the optional ability is declined", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [belleSnowfieldStrategist, { card: sacrificialCharacter, exerted: true }],
        deck: 2,
      },
      {
        play: [opponentAttacker],
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    // Opponent challenges the sacrificial character to banish it
    expect(
      testEngine.asPlayerTwo().challenge(opponentAttacker, sacrificialCharacter),
    ).toBeSuccessfulCommand();

    // Belle's WINTER STOCKPILE triggers - decline the optional ability
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: false,
      }),
    ).toBeSuccessfulCommand();

    // The banished character should remain in the discard
    expect(testEngine.asPlayerOne().getCardZone(sacrificialCharacter)).toBe("discard");
  });

  it("does not trigger when an opponent's character is banished", () => {
    const opponentCharacter = createMockCharacter({
      id: "belle-opp-char",
      name: "Opponent Character",
      cost: 2,
      strength: 1,
      willpower: 1,
    });

    const playerAttacker = createMockCharacter({
      id: "belle-player-attacker",
      name: "Player Attacker",
      cost: 3,
      strength: 5,
      willpower: 5,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [belleSnowfieldStrategist, playerAttacker],
        deck: 2,
      },
      {
        play: [{ card: opponentCharacter, exerted: true }],
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    // Opponent quests with their character (exerting it)
    expect(testEngine.asPlayerTwo().quest(opponentCharacter)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    // Player one challenges opponent's exerted character to banish it
    expect(
      testEngine.asPlayerOne().challenge(playerAttacker, opponentCharacter),
    ).toBeSuccessfulCommand();

    // No trigger should fire for Belle since it was an opponent's character
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });
});
