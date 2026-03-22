import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockAction,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { liloCausingAnUproar } from "./137-lilo-causing-an-uproar";

const action1 = createMockAction({
  id: "lilo-uproar-action-1",
  name: "Action 1",
  cost: 1,
});

const action2 = createMockAction({
  id: "lilo-uproar-action-2",
  name: "Action 2",
  cost: 1,
});

const exertedCharacter = createMockCharacter({
  id: "lilo-uproar-exerted-char",
  name: "Exerted Character",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

describe("Lilo - Causing an Uproar", () => {
  describe("STOMPIN' TIME! - During your turn, if you've played 3 or more actions this turn, you may play this character for free.", () => {
    it.todo("can be played for free after playing 3 actions this turn - requires static cost-reduction ability with turn-metric condition", () => {});

    it.todo("can be played for free after playing 4 or more actions this turn - requires static cost-reduction ability with turn-metric condition", () => {});

    it("cannot be played for free with only 2 actions played this turn (no ink)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [liloCausingAnUproar, action1, action2],
        inkwell: 2,
        deck: 2,
      });

      expect(testEngine.asPlayerOne().playCard(action1)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().playCard(action2)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().playCard(liloCausingAnUproar).success).toBe(false);
      expect(testEngine.asPlayerOne().getCardZone(liloCausingAnUproar)).toBe("hand");
    });

    it("can still be played at full cost when fewer than 3 actions have been played", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [liloCausingAnUproar],
        inkwell: liloCausingAnUproar.cost,
        deck: 2,
      });

      expect(testEngine.asPlayerOne().playCard(liloCausingAnUproar)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getCardZone(liloCausingAnUproar)).toBe("play");
    });
  });

  describe("RAAAWR! - When you play this character, ready chosen character. They can't quest for the rest of this turn.", () => {
    it.todo("readies chosen exerted character and applies cant-quest restriction - requires triggered ability with optional ready + restriction sequence targeting chosen character", () => {});

    it.todo("cant-quest restriction expires after the turn ends - requires triggered ability with optional ready + restriction sequence targeting chosen character", () => {});

    it.todo("can target a ready character (ready effect is redundant but restriction still applies) - requires triggered ability with optional ready + restriction sequence targeting chosen character", () => {});
  });
});
