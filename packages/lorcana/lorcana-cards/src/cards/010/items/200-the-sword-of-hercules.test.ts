import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { theSwordOfHercules } from "./200-the-sword-of-hercules";

const deityTarget = createMockCharacter({
  id: "sword-of-hercules-deity-target",
  name: "Deity Target",
  cost: 4,
  classifications: ["Storyborn", "Deity"],
});

const victoriousHero = createMockCharacter({
  id: "sword-of-hercules-victorious-hero",
  name: "Victorious Hero",
  cost: 3,
  strength: 4,
  willpower: 4,
});

const doomedInvader = createMockCharacter({
  id: "sword-of-hercules-doomed-invader",
  name: "Doomed Invader",
  cost: 2,
  strength: 1,
  willpower: 2,
});

describe("The Sword of Hercules", () => {
  it("banishes the chosen opposing Deity character when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [theSwordOfHercules],
        inkwell: theSwordOfHercules.cost,
      },
      {
        play: [deityTarget],
      },
    );

    expect(testEngine.asPlayerOne().playCard(theSwordOfHercules)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        targets: [deityTarget],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(deityTarget)).toBe("discard");
  });

  it("gains 1 lore when one of your characters banishes another character in a challenge during your turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
        play: [theSwordOfHercules, victoriousHero],
      },
      {
        deck: 1,
        play: [{ card: doomedInvader, exerted: true, isDrying: false }],
      },
    );

    expect(
      testEngine.asPlayerOne().challenge(victoriousHero, doomedInvader),
    ).toBeSuccessfulCommand();
    expect(testEngine.getLore(PLAYER_ONE)).toBe(1);
  });
});
