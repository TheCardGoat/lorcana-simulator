import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { ursulaPowerHungry } from "./059-ursula-power-hungry";

const ursulaTopDeckCard = createMockCharacter({
  id: "ursula-power-hungry-top",
  name: "Ursula Draw Card",
  cost: 1,
});

const ursulaSecondDeckCard = createMockCharacter({
  id: "ursula-power-hungry-second",
  name: "Ursula Second Card",
  cost: 2,
});

describe("Ursula - Power Hungry", () => {
  it("makes each opponent lose 1 lore when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [ursulaPowerHungry],
        inkwell: ursulaPowerHungry.cost,
        deck: [ursulaTopDeckCard, ursulaSecondDeckCard],
      },
      {
        deck: 2,
      },
    );

    expect(testEngine.asServer().manualSetLore(PLAYER_TWO, 3)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().playCard(ursulaPowerHungry)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getLore(PLAYER_TWO)).toBe(2);
  });
});
