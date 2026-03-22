import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { demonaScourgeOfTheWyvernClan } from "./055-demona-scourge-of-the-wyvern-clan";

const opposingCharacterA = createMockCharacter({
  id: "demona-scourge-opposing-a",
  name: "Opposing A",
  cost: 2,
  strength: 2,
  willpower: 2,
});

const opposingCharacterB = createMockCharacter({
  id: "demona-scourge-opposing-b",
  name: "Opposing B",
  cost: 2,
  strength: 2,
  willpower: 2,
});

describe("Demona - Scourge of the Wyvern Clan", () => {
  it("AD SAXUM COMMUTATE - exerts all opposing characters and each player draws until they have 3 cards", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [demonaScourgeOfTheWyvernClan],
        inkwell: demonaScourgeOfTheWyvernClan.cost,
        deck: [opposingCharacterA, opposingCharacterA, opposingCharacterA],
      },
      {
        play: [opposingCharacterA, opposingCharacterB],
        deck: [opposingCharacterB, opposingCharacterB, opposingCharacterB],
      },
    );

    expect(testEngine.asPlayerOne().playCard(demonaScourgeOfTheWyvernClan)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().isExerted(opposingCharacterA)).toBe(true);
    expect(testEngine.asPlayerTwo().isExerted(opposingCharacterB)).toBe(true);
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(3);
    expect(testEngine.asPlayerTwo().getZonesCardCount().hand).toBe(3);
  });
});
