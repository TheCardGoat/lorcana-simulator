import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { shift } from "../../../helpers/abilities/shift";
import { metamorphosis } from "./031-metamorphosis";

const shiftTarget = createMockCharacter({
  id: "metamorphosis-shift-target",
  name: "Shiftable Hero",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
});

const shiftableCharacter = createMockCharacter({
  id: "metamorphosis-shifter",
  name: "Shiftable Hero",
  version: "Upgraded",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  abilities: [shift(3)],
});

describe("Metamorphosis", () => {
  it("shifts a character from discard onto a matching in-play character for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [metamorphosis],
      inkwell: metamorphosis.cost,
      discard: [shiftableCharacter],
      play: [shiftTarget],
    });

    const playResult = testEngine.asPlayerOne().playCard(metamorphosis, {
      targets: [shiftableCharacter, shiftTarget],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(shiftableCharacter)).toBe("play");
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({
      discard: 1,
      play: 1,
    });
  });
});
