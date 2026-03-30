import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack, moanaOfMotunui } from "../../001";
import { flynnRiderHisOwnBiggestFan } from "../../002";
import { annaSoothingSister } from "./050-anna-soothing-sister";

describe("Anna - Soothing Sister", () => {
  describe("WARM HEART - Whenever this character quests, you may gain lore equal to the lore of a character card in your discard. If you do, put that card on the bottom of your deck.", () => {
    it("should trigger when questing and gain lore from character in discard", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: annaSoothingSister, isDrying: false }],
        discard: [moanaOfMotunui],
        deck: 10,
      });

      const loreBefore = testEngine.getLore(PLAYER_ONE);

      // Quest with Anna — triggers WARM HEART
      const questResult = testEngine.asPlayerOne().quest(annaSoothingSister);
      expect(questResult).toBeSuccessfulCommand();

      // Check lore after quest (should be 1 from Anna's base quest)
      const loreAfterQuest = testEngine.getLore(PLAYER_ONE);
      expect(loreAfterQuest).toBe(loreBefore + annaSoothingSister.lore);

      // Check bag effects
      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      // Resolve WARM HEART: choose Moana from discard
      const moanaId = testEngine.findCardInstanceId(moanaOfMotunui, "discard", PLAYER_ONE);
      const resolveResult = testEngine.asPlayerOne().resolvePendingByCard(annaSoothingSister, {
        resolveOptional: true,
        targets: [moanaId],
      });
      expect(resolveResult).toBeSuccessfulCommand();

      // Should gain Moana's printed lore on top of quest lore
      const loreAfterResolve = testEngine.getLore(PLAYER_ONE);
      expect(loreAfterResolve).toBe(loreBefore + annaSoothingSister.lore + moanaOfMotunui.lore);

      // Moana should be moved to bottom of deck
      expect(testEngine.asPlayerOne().getCardZone(moanaOfMotunui)).toBe("deck");
    });

    it("should use printed lore (Flynn Rider in discard gets full 4 lore)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: annaSoothingSister, isDrying: false }],
          discard: [flynnRiderHisOwnBiggestFan],
          deck: 10,
        },
        {
          hand: [heiheiBoatSnack, heiheiBoatSnack, heiheiBoatSnack],
          deck: 5,
        },
      );

      const loreBefore = testEngine.getLore(PLAYER_ONE);

      expect(testEngine.asPlayerOne().quest(annaSoothingSister)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      const flynnId = testEngine.findCardInstanceId(
        flynnRiderHisOwnBiggestFan,
        "discard",
        PLAYER_ONE,
      );
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(annaSoothingSister, {
          resolveOptional: true,
          targets: [flynnId],
        }),
      ).toBeSuccessfulCommand();

      // 1 from Anna quest + 4 from Flynn's printed lore = 5
      const loreAfter = testEngine.getLore(PLAYER_ONE);
      expect(loreAfter).toBe(loreBefore + 5);

      expect(testEngine.asPlayerOne().getCardZone(flynnRiderHisOwnBiggestFan)).toBe("deck");
    });

    it("should be optional - declining leaves discard untouched and gains no extra lore", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: annaSoothingSister, isDrying: false }],
        discard: [moanaOfMotunui],
        deck: 10,
      });

      expect(testEngine.asPlayerOne().quest(annaSoothingSister)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      expect(
        testEngine.asPlayerOne().resolvePendingByCard(annaSoothingSister, {
          resolveOptional: false,
        }),
      ).toBeSuccessfulCommand();

      // Should only have gained 1 lore from questing
      expect(testEngine.getLore(PLAYER_ONE)).toBe(annaSoothingSister.lore);

      // Moana should still be in discard
      expect(testEngine.asPlayerOne().getCardZone(moanaOfMotunui)).toBe("discard");
    });
  });

  describe("Stats and basic properties", () => {
    it("should have correct stats", () => {
      expect(annaSoothingSister.cost).toBe(5);
      expect(annaSoothingSister.strength).toBe(5);
      expect(annaSoothingSister.willpower).toBe(5);
      expect(annaSoothingSister.lore).toBe(1);
    });

    it("should be inkable", () => {
      expect(annaSoothingSister.inkable).toBe(true);
    });

    it("should have correct classifications", () => {
      expect(annaSoothingSister.classifications).toEqual(["Floodborn", "Hero", "Queen"]);
    });

    it("should be amethyst ink", () => {
      expect(annaSoothingSister.inkType).toEqual(["amethyst"]);
    });
  });
});
