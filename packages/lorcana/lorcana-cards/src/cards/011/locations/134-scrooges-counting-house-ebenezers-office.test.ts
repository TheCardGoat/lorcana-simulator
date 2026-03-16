import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { scroogesCountingHouseEbenezersOffice } from "./134-scrooges-counting-house-ebenezers-office";

const firstCoin = createMockCharacter({
  id: "counting-house-under-one",
  name: "Counting House Under One",
  cost: 1,
});

describe("Scrooge's Counting House - Ebenezer's Office", () => {
  it("gets +1 willpower and +1 lore after boosting once", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [scroogesCountingHouseEbenezersOffice],
      inkwell: 2,
      deck: [firstCoin],
    });

    expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).willpower).toBe(4);
    expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).lore).toBe(1);
    expect(
      testEngine.asPlayerOne().activateAbility(scroogesCountingHouseEbenezersOffice, {
        ability: "Boost 2",
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardsUnder(scroogesCountingHouseEbenezersOffice)).toHaveLength(1);
    expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).willpower).toBe(5);
    expect(testEngine.getCard(scroogesCountingHouseEbenezersOffice).lore).toBe(2);
  });
});
