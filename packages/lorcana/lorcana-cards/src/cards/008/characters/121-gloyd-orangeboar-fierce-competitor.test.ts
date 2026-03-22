import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { gloydOrangeboarFierceCompetitor } from "./121-gloyd-orangeboar-fierce-competitor";

describe("Gloyd Orangeboar - Fierce Competitor", () => {
  it("makes each opponent lose 1 lore and you gain 1 lore when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [gloydOrangeboarFierceCompetitor],
        inkwell: gloydOrangeboarFierceCompetitor.cost,
        lore: 2,
      },
      {
        lore: 3,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(gloydOrangeboarFierceCompetitor),
    ).toBeSuccessfulCommand();
    expect(testEngine.getLore(PLAYER_ONE)).toBe(3);
    expect(testEngine.getLore(PLAYER_TWO)).toBe(2);
    expect(testEngine.asPlayerOne().getCardZone(gloydOrangeboarFierceCompetitor)).toBe("play");
  });
});
