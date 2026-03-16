import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { calhounMarineSergeant } from "./191-calhoun-marine-sergeant";

const doomedChallenger = createMockCharacter({
  id: "calhoun-doomed-challenger",
  name: "Doomed Challenger",
  cost: 2,
  strength: 2,
  willpower: 1,
});

describe("Calhoun - Marine Sergeant", () => {
  it("gains 2 lore when it banishes another character in a challenge during your turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [calhounMarineSergeant],
      },
      {
        play: [{ card: doomedChallenger, exerted: true }],
      },
    );

    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
    expect(
      testEngine.asPlayerOne().challenge(calhounMarineSergeant, doomedChallenger),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(doomedChallenger)).toBe("discard");
    expect(testEngine.asPlayerOne().getDamage(calhounMarineSergeant)).toBe(1);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(2);
  });
});
