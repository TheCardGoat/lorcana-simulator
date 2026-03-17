import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { judyHoppsUncoveringClues } from "./156-judy-hopps-uncovering-clues";

const detectiveCharacter = createMockCharacter({
  id: "detective-match",
  name: "Detective Match",
  cost: 2,
  classifications: ["Storyborn", "Detective"],
});

const nonMatchA = createMockCharacter({
  id: "non-match-a",
  name: "Non Match A",
  cost: 1,
  classifications: ["Storyborn", "Hero"],
});

const nonMatchB = createMockCharacter({
  id: "non-match-b",
  name: "Non Match B",
  cost: 3,
  classifications: ["Dreamborn", "Villain"],
});

const nonMatchC = createMockCharacter({
  id: "non-match-c",
  name: "Non Match C",
  cost: 2,
  classifications: ["Storyborn", "Ally"],
});

describe("Judy Hopps - Uncovering Clues", () => {
  describe("THOROUGH INVESTIGATION", () => {
    it("on play: reveals a Detective character to hand, puts rest on bottom in chosen order", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [judyHoppsUncoveringClues],
        inkwell: judyHoppsUncoveringClues.cost,
        deck: [nonMatchA, detectiveCharacter, nonMatchB],
      });

      expect(testEngine.asPlayerOne().playCard(judyHoppsUncoveringClues)).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextPending({
          destinations: [
            { zone: "hand", cards: [detectiveCharacter] },
            { zone: "deck-bottom", cards: [nonMatchB, nonMatchA] },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(detectiveCharacter)).toBe("hand");
      expect(testEngine.asPlayerOne().getCardZone(nonMatchA)).toBe("deck");
      expect(testEngine.asPlayerOne().getCardZone(nonMatchB)).toBe("deck");
    });

    it("on play: puts all cards on bottom when no Detective character is among the top 3", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [judyHoppsUncoveringClues],
        inkwell: judyHoppsUncoveringClues.cost,
        deck: [nonMatchA, nonMatchB, nonMatchC],
      });

      expect(testEngine.asPlayerOne().playCard(judyHoppsUncoveringClues)).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextPending({
          destinations: [
            { zone: "hand", cards: [] },
            { zone: "deck-bottom", cards: [nonMatchA, nonMatchB, nonMatchC] },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(detectiveCharacter)).not.toBe("hand");
      expect(testEngine.asPlayerOne().getCardZone(nonMatchA)).toBe("deck");
      expect(testEngine.asPlayerOne().getCardZone(nonMatchB)).toBe("deck");
      expect(testEngine.asPlayerOne().getCardZone(nonMatchC)).toBe("deck");
    });

    it("on quest: triggers the same scry effect", () => {
      // Deck is stored bottom-to-top: the last element is the top of the deck and drawn first.
      // Place nonMatchC last so it is drawn on player one's next turn, leaving the target
      // 3 cards [nonMatchA, detectiveCharacter, nonMatchB] as the top 3 for the scry.
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [judyHoppsUncoveringClues],
          deck: [nonMatchA, detectiveCharacter, nonMatchB, nonMatchC],
        },
        { deck: 5 },
      );

      // Pass a full round so Judy Hopps is no longer drying and can quest.
      // Player one draws nonMatchC on the round-trip, leaving [nonMatchA, detectiveCharacter, nonMatchB] on top.
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().quest(judyHoppsUncoveringClues)).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextPending({
          destinations: [
            { zone: "hand", cards: [detectiveCharacter] },
            { zone: "deck-bottom", cards: [nonMatchB, nonMatchA] },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(detectiveCharacter)).toBe("hand");
    });
  });
});
