import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  createMockItem,
} from "@tcg/lorcana-engine/testing";
import { scuttleExpertOnHumans } from "./154-scuttle-expert-on-humans";

const matchingItem = createMockItem({
  id: "matching-item",
  name: "Matching Item",
  cost: 2,
});

const nonMatchA = createMockCharacter({
  id: "non-match-a",
  name: "Non Match A",
  cost: 1,
});

const nonMatchB = createMockCharacter({
  id: "non-match-b",
  name: "Non Match B",
  cost: 3,
});

const nonMatchC = createMockCharacter({
  id: "non-match-c",
  name: "Non Match C",
  cost: 4,
});

describe("Scuttle - Expert on Humans", () => {
  it("LET ME SEE - reveals an item card to hand, puts rest on bottom", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [scuttleExpertOnHumans],
      inkwell: scuttleExpertOnHumans.cost,
      deck: [nonMatchA, matchingItem, nonMatchB, nonMatchC],
    });

    expect(testEngine.asPlayerOne().playCard(scuttleExpertOnHumans)).toBeSuccessfulCommand();

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().resolveNextPending({
        destinations: [
          { zone: "hand", cards: [matchingItem] },
          { zone: "deck-bottom", cards: [nonMatchC, nonMatchB, nonMatchA] },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(matchingItem)).toBe("hand");
  });
});
