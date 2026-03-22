import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { dragonFire, liloMakingAWish } from "../../001";
import { lyleTiberiusRourkeCunningMercenary } from "./078-lyle-tiberius-rourke-cunning-mercenary";

describe("Lyle Tiberius Rourke - Cunning Mercenary", () => {
  describe("WELL, NOW YOU KNOW — When you play this character, chosen opposing character gains Reckless during their next turn.", () => {
    it("chosen opposing character gains Reckless during their next turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: lyleTiberiusRourkeCunningMercenary.cost,
          hand: [lyleTiberiusRourkeCunningMercenary],
        },
        {
          play: [liloMakingAWish],
        },
      );

      expect(
        testEngine.asPlayerOne().playCard(lyleTiberiusRourkeCunningMercenary),
      ).toBeSuccessfulCommand();

      // Resolve the triggered ability via bag
      expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThanOrEqual(1);
      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
      ).toBeSuccessfulCommand();

      // Choose the opposing character as target
      expect(
        testEngine.asPlayerOne().resolveNextPending({ targets: [liloMakingAWish] }),
      ).toBeSuccessfulCommand();

      // Pass turn to opponent's turn
      testEngine.asServer().passTurn();

      // During opponent's next turn, the character should have Reckless
      expect(testEngine.hasKeyword(liloMakingAWish, "Reckless")).toBe(true);
    });
  });

  describe("THANKS FOR VOLUNTEERING — Whenever one of your other characters is banished, each opponent loses 1 lore.", () => {
    it("opponent loses 1 lore when your other character is banished", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: dragonFire.cost,
        hand: [dragonFire],
        play: [lyleTiberiusRourkeCunningMercenary, liloMakingAWish],
      });

      testEngine.asServer().manualSetLore(PLAYER_TWO, 5);

      expect(
        testEngine.asPlayerOne().playCard(dragonFire, { targets: [liloMakingAWish] }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(liloMakingAWish)).toBe("discard");
      expect(testEngine.getLore(PLAYER_TWO)).toBe(4);
    });

    it("does not trigger when Lyle himself is banished", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: dragonFire.cost,
        hand: [dragonFire],
        play: [lyleTiberiusRourkeCunningMercenary],
      });

      testEngine.asServer().manualSetLore(PLAYER_TWO, 5);

      expect(
        testEngine.asPlayerOne().playCard(dragonFire, {
          targets: [lyleTiberiusRourkeCunningMercenary],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(lyleTiberiusRourkeCunningMercenary)).toBe(
        "discard",
      );
      expect(testEngine.getLore(PLAYER_TWO)).toBe(5);
    });

    // These interaction tests require simultaneous banish + trigger resolution
    // which depends on Be Prepared/Grab Your Sword properly firing banish triggers
    it.todo("Grab Your Sword interaction - triggers for each banished character", () => {});

    it.todo("Be Prepared interaction - banishes all characters, triggers for each non-Lyle banish", () => {});

    it.todo("Be Prepared with 2 Lyles - both trigger for each banish", () => {});
  });
});
