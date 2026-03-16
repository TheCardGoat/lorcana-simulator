import { describe, expect, it } from "bun:test";
import type { TestInitialState } from "@tcg/lorcana-engine/testing";
import { createFixture, type LorcanaSimulatorFixtureInput } from "./fixture-factory.js";

function buildFixtureInput(
  playerOneDeck: TestInitialState["deck"] | string,
  playerTwoDeck: TestInitialState["deck"] | string,
): LorcanaSimulatorFixtureInput {
  return {
    id: "fixture-factory-test",
    name: "Fixture Factory Test",
    description: "Fixture factory parser tests",
    playerOne: {
      deck: playerOneDeck,
      hand: 0,
      inkwell: 0,
      lore: 0,
      play: [],
      discard: [],
    },
    playerTwo: {
      deck: playerTwoDeck,
      hand: 0,
      inkwell: 0,
      lore: 0,
      play: [],
      discard: [],
    },
    seed: "fixture-factory-test-seed",
    skipPreGame: false,
  };
}

function getDisplayName(card: { name: string; version?: string }): string {
  return card.version ? `${card.name} - ${card.version}` : card.name;
}

describe("createFixture decklist string support", () => {
  it("resolves valid decklist strings into expanded card arrays", () => {
    const fixture = createFixture(
      buildFixtureInput("2 Sail The Azurite Sea\n1 Grab your Bow", "1 Sail The Azurite Sea"),
    );

    expect(Array.isArray(fixture.playerOne.deck)).toBe(true);
    expect(Array.isArray(fixture.playerTwo.deck)).toBe(true);
    expect((fixture.playerOne.deck as unknown[]).length).toBe(3);
    expect((fixture.playerTwo.deck as unknown[]).length).toBe(1);
  });

  it("resolves punctuation/case variants like API decklist lookup", () => {
    const fixture = createFixture(buildFixtureInput("1 Grab your Bow", "1 Grab your Bow"));
    const card = (fixture.playerOne.deck as Array<{ name: string; version?: string }>)[0];

    expect(card).toBeDefined();
    expect(getDisplayName(card)).toBe("Grab Your Bow");
  });

  it("uses latest set then lower rarity for ambiguous names", () => {
    const fixture = createFixture(
      buildFixtureInput(
        "1 Under The Sea\n1 Into The Unknown",
        "1 Under The Sea\n1 Into The Unknown",
      ),
    );

    const deck = fixture.playerOne.deck as Array<{ set?: string; rarity?: string }>;
    const underTheSea = deck[0];
    const intoTheUnknown = deck[1];

    expect(underTheSea?.set).toBe("009");
    expect(intoTheUnknown?.rarity).toBe("common");
  });

  it("fails fast on malformed decklist lines", () => {
    expect(() =>
      createFixture(
        buildFixtureInput(
          "1 Sail The Azurite Sea\nthis line is malformed",
          "1 Sail The Azurite Sea\nthis line is malformed",
        ),
      ),
    ).toThrow(/malformed/i);
  });

  it("fails fast on unknown card names", () => {
    expect(() =>
      createFixture(
        buildFixtureInput(
          "1 Definitely Not A Real Lorcana Card",
          "1 Definitely Not A Real Lorcana Card",
        ),
      ),
    ).toThrow(/unknown card name/i);
  });

  it("rejects mixed string/non-string deck input types", () => {
    expect(() => createFixture(buildFixtureInput("1 Sail The Azurite Sea", 60))).toThrow(
      /mismatched deck input types/i,
    );
  });

  it("keeps existing non-string deck values unchanged", () => {
    const fixture = createFixture(buildFixtureInput(60, 40));
    expect(fixture.playerOne.deck).toBe(60);
    expect(fixture.playerTwo.deck).toBe(40);
  });
});
