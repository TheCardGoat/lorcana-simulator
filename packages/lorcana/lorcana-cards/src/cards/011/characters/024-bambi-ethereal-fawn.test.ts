import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  createMockCharacter,
  createMockAction,
  createMockSong,
} from "@tcg/lorcana-engine/testing";
import { bambiEtherealFawn } from "./024-bambi-ethereal-fawn";

const underCard = createMockCharacter({
  id: "bambi-under-card",
  name: "Under Card",
  cost: 1,
});

const underCard2 = createMockCharacter({
  id: "bambi-under-card-2",
  name: "Under Card 2",
  cost: 1,
});

const deckCharacter = createMockCharacter({
  id: "bambi-deck-character",
  name: "Deck Character",
  cost: 2,
});

const deckAction = createMockAction({
  id: "bambi-deck-action",
  name: "Deck Action",
  cost: 2,
  text: "A test action.",
});

const deckCharacter2 = createMockCharacter({
  id: "bambi-deck-character-2",
  name: "Deck Character 2",
  cost: 3,
});

const testSong = createMockSong({
  id: "bambi-test-song",
  name: "Test Song",
  cost: 3,
  text: "A test song for Bambi.",
  abilities: [],
});

describe("Bambi - Ethereal Fawn", () => {
  it("can be played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [bambiEtherealFawn],
      inkwell: bambiEtherealFawn.cost,
      deck: 5,
    });

    expect(testEngine.asPlayerOne().playCard(bambiEtherealFawn)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(bambiEtherealFawn)).toBe("play");
  });

  it("has Boost 2", () => {
    const testEngine = new LorcanaTestEngine({
      play: [bambiEtherealFawn],
    });

    expect(testEngine.getCardModel(bambiEtherealFawn).hasBoost()).toBe(true);
  });

  describe("COME SEE!", () => {
    it("when questing with 1 card under, reveals 1 card - character goes to hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: bambiEtherealFawn, cardsUnder: [underCard] }],
        deck: [deckCharacter],
      });

      expect(testEngine.asPlayerOne().quest(bambiEtherealFawn)).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(bambiEtherealFawn),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextPending({
          destinations: [{ zone: "hand", cards: [deckCharacter] }],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(deckCharacter)).toBe("hand");
    });

    it("when questing with 2 cards under, reveals 2 cards - characters go to hand, rest to bottom", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: bambiEtherealFawn, cardsUnder: [underCard, underCard2] }],
        deck: [deckAction, deckCharacter],
      });

      expect(testEngine.asPlayerOne().quest(bambiEtherealFawn)).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(bambiEtherealFawn),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextPending({
          destinations: [
            { zone: "hand", cards: [deckCharacter] },
            { zone: "deck-bottom", cards: [deckAction] },
          ],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(deckCharacter)).toBe("hand");
      expect(testEngine.asPlayerOne().getCardZone(deckAction)).toBe("deck");
    });

    it("triggers when singing a song with cards under", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: bambiEtherealFawn, cardsUnder: [underCard] }],
        hand: [testSong],
        deck: [deckCharacter],
      });

      expect(
        testEngine.asPlayerOne().singSong(testSong, bambiEtherealFawn),
      ).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(bambiEtherealFawn),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextPending({
          destinations: [{ zone: "hand", cards: [deckCharacter] }],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(deckCharacter)).toBe("hand");
    });

    it("does not trigger when there are no cards under Bambi", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [bambiEtherealFawn],
        deck: [deckCharacter],
      });

      expect(testEngine.asPlayerOne().quest(bambiEtherealFawn)).toBeSuccessfulCommand();
      // Per CRD 6.2.7: ability IS enqueued; condition checked at resolution
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(bambiEtherealFawn, { resolveOptional: true }),
      ).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getCardZone(deckCharacter)).toBe("deck");
    });
  });
});
