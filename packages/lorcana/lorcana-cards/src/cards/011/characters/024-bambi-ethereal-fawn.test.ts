import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  createMockCharacter,
  createMockAction,
} from "@tcg/lorcana-engine/testing";
import { bambiEtherealFawn } from "./024-bambi-ethereal-fawn";
import type { ScryResolutionSelectionContext } from "@tcg/lorcana-engine";

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

    it("does not trigger when there are no cards under Bambi", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [bambiEtherealFawn],
        deck: [deckCharacter],
      });

      expect(testEngine.asPlayerOne().quest(bambiEtherealFawn)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.asPlayerOne().getCardZone(deckCharacter)).toBe("deck");
    });

    it("scry-selection pending effect has a valid selectionContext when amount is variable (cards-under-self)", () => {
      // Regression test for THE-884: COME SEE! locked the game because
      // buildScrySelectionContext read `amount` as a static number from the
      // raw effect definition. When `amount` is `{ type: "cards-under-self" }`,
      // getRecordNumber returns undefined, causing the context builder to return
      // undefined and leaving the client with no way to render the selection UI.
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

      const [pendingEffect] = testEngine.asPlayerOne().getPendingEffects();
      expect(pendingEffect).toBeDefined();
      expect(pendingEffect?.selectionContext).toBeDefined();
      expect(pendingEffect?.selectionContext?.kind).toBe("scry-selection");

      const scryContext = pendingEffect?.selectionContext as
        | ScryResolutionSelectionContext
        | undefined;
      // amount must equal the number of cards actually revealed (1 card under = 1 revealed)
      expect(scryContext?.amount).toBe(1);
      expect(scryContext?.revealedCardIds).toHaveLength(1);
    });

    it("triggers on challenge-exert and produces a valid scry-selection selectionContext", () => {
      // Regression test for THE-884: effect also fires when Bambi challenges
      // (exert occurs via challenge, not just quest). The selectionContext must
      // be defined so the client can render the card selection UI.
      const opponent = createMockCharacter({
        id: "bambi-challenge-opponent",
        name: "Opponent Character",
        cost: 2,
        strength: 1,
        willpower: 10,
      });

      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: bambiEtherealFawn, cardsUnder: [underCard] }],
          deck: [deckCharacter],
        },
        {
          play: [{ card: opponent, exerted: true }],
          deck: 2,
        },
      );

      expect(
        testEngine.asPlayerOne().challenge(bambiEtherealFawn, opponent),
      ).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(bambiEtherealFawn),
      ).toBeSuccessfulCommand();

      const [pendingEffect] = testEngine.asPlayerOne().getPendingEffects();
      expect(pendingEffect).toBeDefined();
      expect(pendingEffect?.selectionContext).toBeDefined();
      expect(pendingEffect?.selectionContext?.kind).toBe("scry-selection");

      const scryContext = pendingEffect?.selectionContext as
        | ScryResolutionSelectionContext
        | undefined;
      expect(scryContext?.amount).toBe(1);
      expect(scryContext?.revealedCardIds).toHaveLength(1);
    });
  });
});
