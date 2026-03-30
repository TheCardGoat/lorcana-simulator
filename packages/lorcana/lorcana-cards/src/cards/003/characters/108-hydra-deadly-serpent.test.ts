import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { smash } from "../../001/actions/200-smash";
import { hydraDeadlySerpent } from "./108-hydra-deadly-serpent";

const opposingTarget = createMockCharacter({
  id: "hydra-opposing-target",
  name: "Opposing Target",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
});

describe("Hydra - Deadly Serpent", () => {
  it("deals the same amount of damage to a chosen opposing character when Hydra is dealt damage", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [hydraDeadlySerpent],
      },
      {
        hand: [smash],
        inkwell: smash.cost,
        play: [opposingTarget],
      },
    );

    expect(testEngine.asServer().manualPassTurn()).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerTwo().playCard(smash, { targets: [hydraDeadlySerpent] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolvePendingByCard(hydraDeadlySerpent, {
        targets: [opposingTarget],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCard(hydraDeadlySerpent).damage).toBe(3);
    expect(testEngine.asPlayerTwo().getCard(opposingTarget).damage).toBe(3);
  });
});
