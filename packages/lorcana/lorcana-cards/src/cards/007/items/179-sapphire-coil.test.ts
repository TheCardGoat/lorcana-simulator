import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { sapphireCoil } from "./179-sapphire-coil";

const inkCard = createMockCharacter({
  id: "sapphire-coil-ink-card",
  name: "Sapphire Coil Ink Card",
  cost: 1,
});

const weakenedTarget = createMockCharacter({
  id: "sapphire-coil-weakened-target",
  name: "Sapphire Coil Weakened Target",
  cost: 2,
  strength: 4,
});

describe("Sapphire Coil", () => {
  it("gives the chosen character -2 strength this turn when you ink a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkCard],
      play: [sapphireCoil, weakenedTarget],
    });

    expect(testEngine.asPlayerOne().ink(inkCard)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
        targets: [weakenedTarget],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardStrength(weakenedTarget)).toBe(2);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardStrength(weakenedTarget)).toBe(4);
  });
});
