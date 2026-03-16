import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { badanonVillainSupportCenter } from "./203-bad-anon-villain-support-center";

const ratiganHost = createMockCharacter({
  id: "badanon-ratigan-host",
  name: "Ratigan",
  cost: 4,
  classifications: ["Storyborn", "Villain"],
});

const ratiganGuest = createMockCharacter({
  id: "badanon-ratigan-guest",
  name: "Ratigan",
  cost: 5,
  classifications: ["Storyborn", "Villain"],
});

describe("Bad-Anon - Villain Support Center", () => {
  it("grants Villains here an ability to play a same-name character for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        badanonVillainSupportCenter,
        { card: ratiganHost, atLocation: badanonVillainSupportCenter },
      ],
      hand: [ratiganGuest],
      inkwell: 3,
      deck: 1,
    });

    expect(
      testEngine.asPlayerOne().activateAbility(ratiganHost, {
        ability: "THERE'S NO ONE I'D RATHER BE THAN ME",
        targets: [ratiganGuest],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(ratiganGuest)).toBe("play");
    expect(testEngine.asPlayerOne().getCardZone(ratiganHost)).toBe("play");
  });
});
