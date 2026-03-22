import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack } from "../../001/characters/007-heihei-boat-snack";
import { tinkerBellSnowflakeCollector } from "./048-tinker-bell-snowflake-collector";

const fillerCard = createMockCharacter({
  id: "tinker-hand-filler",
  name: "Tinker Hand Filler",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

describe("Reproduction Tests", () => {
  describe("Tinker Bell", () => {
    it("should update Evasive dynamically when hand size changes", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [tinkerBellSnowflakeCollector],
        hand: [fillerCard, fillerCard, fillerCard, fillerCard],
        inkwell: fillerCard.cost,
        deck: 5,
      });

      expect(testEngine.asPlayerOne().hasKeyword(tinkerBellSnowflakeCollector, "Evasive")).toBe(
        true,
      );

      const firstFiller = testEngine.getCardInstanceIdsInZone("hand", PLAYER_ONE)[0];
      expect(firstFiller).toBeDefined();

      expect(testEngine.asPlayerOne().playCard(firstFiller!)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(3);
      expect(testEngine.asPlayerOne().hasKeyword(tinkerBellSnowflakeCollector, "Evasive")).toBe(
        false,
      );
    });

    it("should update Evasive dynamically - with real cards", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [tinkerBellSnowflakeCollector],
        hand: [heiheiBoatSnack, heiheiBoatSnack, heiheiBoatSnack, heiheiBoatSnack],
        inkwell: heiheiBoatSnack.cost,
        deck: 5,
      });

      expect(testEngine.asPlayerOne().hasKeyword(tinkerBellSnowflakeCollector, "Evasive")).toBe(
        true,
      );

      const firstHeihei = testEngine.findCardInstanceId(heiheiBoatSnack, "hand", PLAYER_ONE);
      expect(firstHeihei).toBeDefined();

      expect(testEngine.asPlayerOne().playCard(firstHeihei!)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(3);
      expect(testEngine.asPlayerOne().hasKeyword(tinkerBellSnowflakeCollector, "Evasive")).toBe(
        false,
      );
    });
  });
});
