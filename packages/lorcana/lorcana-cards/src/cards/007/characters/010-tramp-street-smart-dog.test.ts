import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { trampStreetsmartDog } from "./010-tramp-street-smart-dog";

const partyGuestOne = createMockCharacter({
  id: "tramp-party-guest-one",
  name: "Party Guest One",
  cost: 1,
});

const partyGuestTwo = createMockCharacter({
  id: "tramp-party-guest-two",
  name: "Party Guest Two",
  cost: 1,
});

const partyGuestThree = createMockCharacter({
  id: "tramp-party-guest-three",
  name: "Party Guest Three",
  cost: 1,
});

const drawnCardOne = createMockCharacter({
  id: "tramp-drawn-card-one",
  name: "Drawn Card One",
  cost: 1,
});

const drawnCardTwo = createMockCharacter({
  id: "tramp-drawn-card-two",
  name: "Drawn Card Two",
  cost: 1,
});

const discardFodder = createMockCharacter({
  id: "tramp-discard-fodder",
  name: "Discard Fodder",
  cost: 1,
});

describe("Tramp - Street-Smart Dog", () => {
  it("costs 1 less to play for each character you control", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: 5,
      play: [partyGuestOne, partyGuestTwo],
      hand: [trampStreetsmartDog],
    });

    expect(testEngine.asPlayerOne().playCard(trampStreetsmartDog)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(trampStreetsmartDog)).toBe("play");
  });

  it("does not get a discount when you control no characters", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: 5,
      hand: [trampStreetsmartDog],
    });

    expect(testEngine.asPlayerOne().playCard(trampStreetsmartDog).success).toBe(false);

    expect(testEngine.asPlayerOne().getCardZone(trampStreetsmartDog)).toBe("hand");
  });

  it("may draw and then discard one card for each other character you control", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: [drawnCardOne, drawnCardTwo],
      hand: [trampStreetsmartDog, discardFodder],
      inkwell: 5,
      play: [partyGuestOne, partyGuestTwo],
    });

    expect(testEngine.asPlayerOne().playCard(trampStreetsmartDog)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(drawnCardOne)).toBe("hand");
    expect(testEngine.asPlayerOne().getCardZone(drawnCardTwo)).toBe("hand");
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(3);

    const discardFodderId = testEngine.findCardInstanceId(discardFodder, "hand", "player_one");
    const drawnCardOneId = testEngine.findCardInstanceId(drawnCardOne, "hand", "player_one");

    expect(
      testEngine.asPlayerOne().resolveNextPending({
        targets: [discardFodderId, drawnCardOneId],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(trampStreetsmartDog)).toBe("play");
    expect(testEngine.asPlayerOne().getCardZone(discardFodder)).toBe("discard");
    expect(testEngine.asPlayerOne().getCardZone(drawnCardOne)).toBe("discard");
    expect(testEngine.asPlayerOne().getCardZone(drawnCardTwo)).toBe("hand");
    expect(testEngine.asPlayerOne().getZonesCardCount()).toMatchObject({
      deck: 0,
      discard: 2,
      hand: 1,
      play: 3,
    });
  });

  it("still cannot be played without enough ink after the discount is applied", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: 3,
      play: [partyGuestOne, partyGuestTwo, partyGuestThree],
      hand: [trampStreetsmartDog],
    });

    expect(testEngine.asPlayerOne().playCard(trampStreetsmartDog).success).toBe(false);

    expect(testEngine.asPlayerOne().getCardZone(trampStreetsmartDog)).toBe("hand");
  });
});
