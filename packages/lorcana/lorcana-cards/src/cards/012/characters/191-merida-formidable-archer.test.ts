import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  createMockAction,
} from "@tcg/lorcana-engine/testing";
import { meridaFormidableArcher } from "./191-merida-formidable-archer";

const threeArrowsMock = createMockAction({
  id: "three-arrows-mock",
  name: "Three Arrows",
  cost: 3,
});

describe("Merida - Formidable Archer", () => {
  it("FULL QUIVER - returns Three Arrows from discard to hand when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [meridaFormidableArcher],
        discard: [threeArrowsMock],
        inkwell: meridaFormidableArcher.cost,
      },
      {
        deck: 5,
      },
    );

    expect(testEngine.asPlayerOne().playCard(meridaFormidableArcher)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);
    expect(
      testEngine.asPlayerOne().resolvePendingByCard(meridaFormidableArcher, {
        resolveOptional: true,
        targets: [threeArrowsMock],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(threeArrowsMock)).toBe("hand");
  });
});
