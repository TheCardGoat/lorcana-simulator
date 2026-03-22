import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { lawrenceJealousManservant } from "./187-lawrence-jealous-manservant";

describe("Lawrence - Jealous Manservant (Set 9)", () => {
  describe("PAYBACK - While this character has no damage, he gets +4 {S}.", () => {
    it("should have +4 strength when undamaged (base 0 + 4 = 4)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [lawrenceJealousManservant],
        deck: 5,
      });

      const card = testEngine.asPlayerOne().getCard(lawrenceJealousManservant);
      expect(card.strength).toBe(4);
    });

    it("has a static modify-stat ability", () => {
      const staticAbility = lawrenceJealousManservant.abilities?.find((a) => a.type === "static");
      expect(staticAbility).toBeDefined();
    });
  });
});
