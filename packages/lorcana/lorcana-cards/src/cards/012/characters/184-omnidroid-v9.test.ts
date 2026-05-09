import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { omnidroidV9 } from "./184-omnidroid-v9";

// Shift base must share the same name as Omnidroid V.9
const omnidroidShiftBase = createMockCharacter({
  id: "omnidroid-v9-shift-base",
  name: "Omnidroid",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  classifications: ["Storyborn", "Robot"],
});

const opponentTarget = createMockCharacter({
  id: "omnidroid-v9-opp-target",
  name: "Hapless Bystander",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
});

describe("Omnidroid - V.9", () => {
  describe("ENEMY DETECTED — When you play this character, if you used Shift to play it, you may deal 2 damage to chosen character.", () => {
    it("deals 2 damage to chosen character when played via Shift", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [omnidroidShiftBase],
          hand: [omnidroidV9],
          inkwell: 2,
        },
        {
          play: [opponentTarget],
          deck: 1,
        },
      );

      const shiftTarget = testEngine.findCardInstanceId(omnidroidShiftBase, "play", PLAYER_ONE);

      expect(
        testEngine.asPlayerOne().playCard(omnidroidV9, {
          cost: { cost: "shift", shiftTarget },
        }),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolvePendingByCard(omnidroidV9, {
          resolveOptional: true,
          targets: [opponentTarget],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getDamage(opponentTarget)).toBe(2);
    });

    it("does not deal damage when the optional is declined", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [omnidroidShiftBase],
          hand: [omnidroidV9],
          inkwell: 2,
        },
        {
          play: [opponentTarget],
          deck: 1,
        },
      );

      const shiftTarget = testEngine.findCardInstanceId(omnidroidShiftBase, "play", PLAYER_ONE);

      expect(
        testEngine.asPlayerOne().playCard(omnidroidV9, {
          cost: { cost: "shift", shiftTarget },
        }),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolvePendingByCard(omnidroidV9, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getDamage(opponentTarget)).toBe(0);
    });
  });
});
