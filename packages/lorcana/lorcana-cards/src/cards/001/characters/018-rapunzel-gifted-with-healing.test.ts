import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { rapunzelGiftedWithHealing } from "./018-rapunzel-gifted-with-healing";

const woundedAlly = createMockCharacter({
  id: "rapunzel-gifted-with-healing-wounded-ally",
  name: "Wounded Ally",
  cost: 2,
  willpower: 5,
});

describe("Rapunzel - Gifted with Healing", () => {
  it("removes 2 damage and draws 2 cards when 2 damage is removed", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: 3,
      hand: [rapunzelGiftedWithHealing],
      inkwell: rapunzelGiftedWithHealing.cost,
      play: [{ card: woundedAlly, damage: 2 }],
    });
    const woundedAllyId = testEngine.findCardInstanceId(woundedAlly, "play", "player_one");

    expect(testEngine.asPlayerOne().playCard(rapunzelGiftedWithHealing)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        targets: [woundedAllyId],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getDamage(woundedAlly)).toBe(0);
    expect(testEngine.asPlayerOne().getZonesCardCount()).toMatchObject({
      deck: 1,
      discard: 0,
      hand: 2,
      play: 2,
    });
  });

  it("removes 3 damage and draws 3 cards when 3 damage is removed", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: 3,
      hand: [rapunzelGiftedWithHealing],
      inkwell: rapunzelGiftedWithHealing.cost,
      play: [{ card: woundedAlly, damage: 3 }],
    });
    const woundedAllyId = testEngine.findCardInstanceId(woundedAlly, "play", "player_one");

    expect(testEngine.asPlayerOne().playCard(rapunzelGiftedWithHealing)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        targets: [woundedAllyId],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getDamage(woundedAlly)).toBe(0);
    expect(testEngine.asPlayerOne().getZonesCardCount()).toMatchObject({
      deck: 0,
      discard: 0,
      hand: 3,
      play: 2,
    });
  });
});
