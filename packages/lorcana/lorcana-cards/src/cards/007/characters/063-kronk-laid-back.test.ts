import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { suddenChill } from "../../001/actions/098-sudden-chill";
import { simbaProtectiveCub } from "../../001/characters/020-simba-protective-cub";
import { kronkLaidBack } from "./063-kronk-laid-back";

describe("Kronk - Laid Back", () => {
  describe("I'M LOVIN' THIS - If an effect would cause you to discard one or more cards, you don't discard.", () => {
    it("prevents the controller from discarding when an opponent plays Sudden Chill", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [suddenChill],
          inkwell: suddenChill.cost,
        },
        {
          play: [kronkLaidBack],
          hand: [simbaProtectiveCub],
        },
      );

      expect(testEngine.asPlayerOne().playCard(suddenChill)).toBeSuccessfulCommand();

      // Player two has Kronk in play: the discard should be prevented (no pending discard choice)
      expect(testEngine.asPlayerTwo().getPendingEffects()).toHaveLength(0);
      expect(testEngine.asPlayerTwo()).toHaveZoneCounts({
        hand: 1,
        discard: 0,
      });
      expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("hand");
    });

    it("does not prevent the opponent from discarding (Kronk only protects its own controller)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [kronkLaidBack],
          hand: [suddenChill],
          inkwell: suddenChill.cost,
        },
        {
          hand: [simbaProtectiveCub],
        },
      );

      expect(testEngine.asPlayerOne().playCard(suddenChill)).toBeSuccessfulCommand();

      // Player two does NOT have Kronk, so they must discard
      expect(
        testEngine.asPlayerTwo().resolveNextPending({
          targets: [simbaProtectiveCub],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo()).toHaveZoneCounts({
        hand: 0,
        discard: 1,
      });
    });
  });
});
