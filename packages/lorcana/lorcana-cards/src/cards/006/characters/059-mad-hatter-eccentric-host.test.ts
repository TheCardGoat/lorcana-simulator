import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { madHatterEccentricHost } from "./059-mad-hatter-eccentric-host";

const opponentTopCard = createMockCharacter({
  id: "hatter-opponent-top",
  name: "Opponent Top Card",
  cost: 2,
});

describe("Mad Hatter - Eccentric Host", () => {
  describe("WE'LL HAVE TO LOOK INTO THIS - Whenever this character quests, you may look at the top card of chosen player's deck. Put it on top of their deck or into their discard.", () => {
    it("triggers a bag effect when questing", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: madHatterEccentricHost, isDrying: false }],
          deck: 2,
        },
        {
          deck: [opponentTopCard],
        },
      );

      expect(testEngine.asPlayerOne().quest(madHatterEccentricHost)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    });

    it("does not scry when the optional is declined", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: madHatterEccentricHost, isDrying: false }],
          deck: 2,
        },
        {
          deck: [opponentTopCard],
        },
      );

      expect(testEngine.asPlayerOne().quest(madHatterEccentricHost)).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(
        testEngine
          .asPlayerOne()
          .resolvePendingByCard(madHatterEccentricHost, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getCardZone(opponentTopCard)).toBe("deck");
    });
  });
});
