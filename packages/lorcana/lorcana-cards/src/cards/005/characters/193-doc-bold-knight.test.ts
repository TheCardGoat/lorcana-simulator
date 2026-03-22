import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { docBoldKnight } from "./193-doc-bold-knight";

const kingVictorious = createMockCharacter({
  id: "doc-king-victorious",
  name: "King Victorious",
  cost: 3,
});

const mischievousCub = createMockCharacter({
  id: "doc-mischievous-cub",
  name: "Mischievous Cub",
  cost: 2,
});

const ukulelePlayer = createMockCharacter({
  id: "doc-ukulele-player",
  name: "Ukulele Player",
  cost: 2,
});

const northernMoose = createMockCharacter({
  id: "doc-northern-moose",
  name: "Northern Moose",
  cost: 4,
});

const drawOne = createMockCharacter({ id: "doc-draw-one", name: "Draw One", cost: 1 });
const drawTwo = createMockCharacter({ id: "doc-draw-two", name: "Draw Two", cost: 1 });
const drawThree = createMockCharacter({ id: "doc-draw-three", name: "Draw Three", cost: 1 });

describe("Doc - Bold Knight", () => {
  it("may discard your hand to draw 2 cards when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [docBoldKnight, kingVictorious, mischievousCub, ukulelePlayer, northernMoose],
      inkwell: docBoldKnight.cost,
      deck: [drawOne, drawTwo, drawThree],
    });

    expect(testEngine.asPlayerOne().playCard(docBoldKnight)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    expect(
      testEngine
        .asPlayerOne()
        .resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({
        hand: 2,
        deck: 1,
        discard: 4,
      }),
    );
  });

  it("projects an optional bag selection and lets you decline it", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [docBoldKnight, kingVictorious, mischievousCub, ukulelePlayer, northernMoose],
      inkwell: docBoldKnight.cost,
      deck: [drawOne, drawTwo, drawThree],
    });

    expect(testEngine.asPlayerOne().playCard(docBoldKnight)).toBeSuccessfulCommand();

    const bagEffect = testEngine.asPlayerOne().getBoard().bagEffects[0];

    expect(bagEffect?.selectionContext).toMatchObject({
      kind: "optional-selection",
      chooserId: "player_one",
      submitField: "resolveOptional",
    });

    expect(
      testEngine
        .asPlayerOne()
        .resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, { resolveOptional: false }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({
        hand: 4,
        deck: 3,
        discard: 0,
      }),
    );
  });
});
