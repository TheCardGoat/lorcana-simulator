import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { belleBookworm } from "./071-belle-bookworm";

const opponentHandCard = createMockCharacter({
  id: "belle-test-opp-hand-1",
  name: "Opponent Hand Card",
  cost: 1,
});

describe("Belle - Bookworm", () => {
  describe("USE YOUR IMAGINATION — While an opponent has no cards in their hand, this character gets +2 {L}.", () => {
    it("gets +2 lore when opponent has no cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [belleBookworm],
        },
        {
          hand: [],
          deck: 1,
        },
      );

      expect(testEngine.asPlayerOne().getCardLore(belleBookworm)).toBe(3);
    });

    it("does not get +2 lore when opponent has cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [belleBookworm],
        },
        {
          hand: [opponentHandCard],
          deck: 1,
        },
      );

      // Use server view: the condition depends on opponent's hidden hand state,
      // which only the server can evaluate correctly.
      expect(testEngine.asServer().getCardLore(belleBookworm)).toBe(1);
    });
  });
});
