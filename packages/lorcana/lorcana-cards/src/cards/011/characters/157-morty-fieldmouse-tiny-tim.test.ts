import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mortyFieldmouseTinyTim } from "./157-morty-fieldmouse-tiny-tim";

describe("Morty Fieldmouse - Tiny Tim", () => {
  // HOLIDAY SPIRIT - "Once during your turn, whenever you put a card under one of your other characters,
  //   put the top card of your deck facedown under this character."
  // HOLIDAY CHEER - "This character gets +1 {L} for each card under him."
  // Abilities are not yet defined in card data (abilities: []).
  // Tests below verify the card can be played; behavior tests are pending ability implementation.

  it("can be played onto the board", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [mortyFieldmouseTinyTim],
      inkwell: mortyFieldmouseTinyTim.cost,
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(mortyFieldmouseTinyTim)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(mortyFieldmouseTinyTim)).toBe("play");
  });
});
