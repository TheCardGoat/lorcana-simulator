import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { pocahontasPeacekeeper } from "./022-pocahontas-peacekeeper";

describe("Pocahontas - Peacekeeper", () => {
  it("can be played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [pocahontasPeacekeeper],
      inkwell: pocahontasPeacekeeper.cost,
      deck: 5,
    });

    expect(testEngine.asPlayerOne().playCard(pocahontasPeacekeeper)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(pocahontasPeacekeeper)).toBe("play");
  });
});
