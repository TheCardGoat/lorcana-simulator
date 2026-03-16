import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { fairyGodmothersWand } from "./168-fairy-godmothers-wand";

const princessTarget = createMockCharacter({
  id: "fairy-godmothers-wand-princess",
  name: "Princess Target",
  cost: 3,
  classifications: ["Storyborn", "Hero", "Princess"],
});

const inkCard = createMockCharacter({
  id: "fairy-godmothers-wand-ink-card",
  name: "Ink Card",
  cost: 1,
});

describe("Fairy Godmother's Wand", () => {
  it("triggers when you ink a card during your turn and grants Ward until the start of your next turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 2,
        hand: [inkCard],
        play: [fairyGodmothersWand, princessTarget],
      },
      {
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().ink(inkCard)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        targets: [princessTarget],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().hasKeyword(princessTarget, "Ward")).toBe(true);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().hasKeyword(princessTarget, "Ward")).toBe(true);

    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().hasKeyword(princessTarget, "Ward")).toBe(false);
  });
});
