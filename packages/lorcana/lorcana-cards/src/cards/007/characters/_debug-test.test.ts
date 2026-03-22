import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
const simpleActivatedCard = createMockCharacter({
  id: "simple-test",
  name: "Simple Test",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  classifications: [],
  abilities: [
    {
      id: "simple-1",
      type: "activated",
      text: "{E} — Deal 3 damage to chosen character.",
      cost: { exert: true },
      effect: {
        type: "deal-damage",
        amount: 3,
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
});

const target = createMockCharacter({
  id: "target-char",
  name: "Target",
  cost: 3,
});

describe("Simple Activated Ability Debug", () => {
  it("deals damage with CHOSEN_CHARACTER target", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      { play: [simpleActivatedCard], deck: 1 },
      { play: [target], deck: 1 },
    );

    const result = engine.asPlayerOne().activateAbility(simpleActivatedCard, {
      targets: [target],
    });
    console.log("Result:", JSON.stringify(result));

    expect(result).toBeSuccessfulCommand();
    expect(engine.asPlayerTwo().getDamage(target)).toBe(3);
  });
});
