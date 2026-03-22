import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { sevenDwarfsMineSecureFortress } from "./204-seven-dwarfs-mine-secure-fortress";

const sleepyKnight = createMockCharacter({
  id: "mine-knight",
  name: "Sleepy Knight",
  cost: 2,
  classifications: ["Storyborn", "Knight"],
});

const targetDummy = createMockCharacter({
  id: "mine-target",
  name: "Mine Target",
  cost: 2,
  willpower: 4,
});

describe("Seven Dwarfs' Mine - Secure Fortress", () => {
  it("deals 2 damage the first time a Knight moves here during your turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [sevenDwarfsMineSecureFortress, sleepyKnight],
        inkwell: sevenDwarfsMineSecureFortress.moveCost,
        deck: 1,
      },
      {
        play: [targetDummy],
        deck: 1,
      },
    );

    expect(
      testEngine.asPlayerOne().moveCharacterToLocation(sleepyKnight, sevenDwarfsMineSecureFortress)
        .success,
    ).toBe(true);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().resolveNextPending({ targets: [targetDummy] }).success).toBe(
      true,
    );

    expect(testEngine.asPlayerTwo().getCard(targetDummy)?.damage).toBe(2);
  });
});
