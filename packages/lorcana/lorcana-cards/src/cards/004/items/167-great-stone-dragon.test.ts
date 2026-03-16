import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { greatStoneDragon } from "./167-great-stone-dragon";

const fallenSoldier = createMockCharacter({
  id: "great-stone-dragon-soldier",
  name: "Fallen Soldier",
  cost: 2,
});

describe("Great Stone Dragon", () => {
  it("enters play exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [greatStoneDragon],
      inkwell: greatStoneDragon.cost,
    });

    expect(testEngine.asPlayerOne().playCard(greatStoneDragon)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().isExerted(greatStoneDragon)).toBe(true);
  });

  it("puts a chosen character card from your discard into your inkwell facedown and exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [greatStoneDragon],
      discard: [fallenSoldier],
    });

    const soldierId = testEngine.findCardInstanceId(fallenSoldier, "discard", "player_one");

    expect(
      testEngine.asPlayerOne().activateAbility(greatStoneDragon, {
        targets: [fallenSoldier],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(greatStoneDragon)).toBe(true);
    expect(testEngine.asPlayerOne().getCardZone(fallenSoldier)).toBe("inkwell");
    expect(testEngine.getCardPublicFaceState(fallenSoldier, "inkwell")).toBe("faceDown");
    expect(testEngine.asServer().getCard(soldierId)?.exerted).toBe(true);
  });
});
