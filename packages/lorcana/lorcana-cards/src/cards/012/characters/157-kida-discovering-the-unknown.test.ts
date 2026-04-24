import { describe, expect, it } from "bun:test";
import type { ZoneId } from "@tcg/lorcana-engine";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { kidaDiscoveringTheUnknown } from "./157-kida-discovering-the-unknown";

const topDeckCard = createMockCharacter({
  id: "kida-deck-card",
  name: "Top Deck Card",
  cost: 1,
  strength: 1,
  willpower: 1,
});

const discardFodder = createMockCharacter({
  id: "kida-discard-fodder",
  name: "Discard Fodder",
  cost: 1,
  strength: 1,
  willpower: 1,
});

const discardFodder2 = createMockCharacter({
  id: "kida-discard-fodder-2",
  name: "Discard Fodder 2",
  cost: 1,
  strength: 1,
  willpower: 1,
});

describe("Kida - Discovering the Unknown", () => {
  describe("READ THE RUNES - Whenever this character quests, if 2 or more cards were put into your discard this turn, you may put the top card of your deck into your inkwell facedown and exerted.", () => {
    it("puts the top card of your deck into your inkwell when 2+ cards entered your discard this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: kidaDiscoveringTheUnknown, isDrying: false }],
          hand: [discardFodder, discardFodder2],
          deck: [topDeckCard],
        },
        {
          deck: 1,
        },
      );

      // Put two of Player One's cards into their discard this turn so the metric
      // condition (2+ cards put into discard this turn) is satisfied.
      const fodder1Id = testEngine.findCardInstanceId(discardFodder, "hand", PLAYER_ONE);
      const fodder2Id = testEngine.findCardInstanceId(discardFodder2, "hand", PLAYER_ONE);
      expect(
        testEngine.asServer().manualMoveCard(fodder1Id, `discard:${PLAYER_ONE}` as ZoneId),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asServer().manualMoveCard(fodder2Id, `discard:${PLAYER_ONE}` as ZoneId),
      ).toBeSuccessfulCommand();

      const playerOne = testEngine.asPlayerOne();

      expect(playerOne.quest(kidaDiscoveringTheUnknown)).toBeSuccessfulCommand();

      expect(playerOne.resolvePendingByCard(kidaDiscoveringTheUnknown)).toBeSuccessfulCommand();

      expect(playerOne.getCardZone(topDeckCard)).toBe("inkwell");
    });

    it("is optional - declining leaves the top card of deck untouched", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: kidaDiscoveringTheUnknown, isDrying: false }],
          hand: [discardFodder, discardFodder2],
          deck: [topDeckCard],
        },
        {
          deck: 1,
        },
      );

      const fodder1Id = testEngine.findCardInstanceId(discardFodder, "hand", PLAYER_ONE);
      const fodder2Id = testEngine.findCardInstanceId(discardFodder2, "hand", PLAYER_ONE);
      expect(
        testEngine.asServer().manualMoveCard(fodder1Id, `discard:${PLAYER_ONE}` as ZoneId),
      ).toBeSuccessfulCommand();
      expect(
        testEngine.asServer().manualMoveCard(fodder2Id, `discard:${PLAYER_ONE}` as ZoneId),
      ).toBeSuccessfulCommand();

      const playerOne = testEngine.asPlayerOne();

      expect(playerOne.quest(kidaDiscoveringTheUnknown)).toBeSuccessfulCommand();

      expect(
        playerOne.resolvePendingByCard(kidaDiscoveringTheUnknown, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(playerOne.getCardZone(topDeckCard)).toBe("deck");
    });

    it("does not trigger when fewer than 2 cards entered your discard this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: kidaDiscoveringTheUnknown, isDrying: false }],
          deck: [topDeckCard],
        },
        {
          deck: 1,
        },
      );

      const playerOne = testEngine.asPlayerOne();

      expect(playerOne.quest(kidaDiscoveringTheUnknown)).toBeSuccessfulCommand();

      // Condition not met - top card should remain in the deck.
      expect(playerOne.getCardZone(topDeckCard)).toBe("deck");
    });
  });
});
