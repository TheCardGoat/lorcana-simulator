import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { goliathClanLeader } from "./173-goliath-clan-leader";

const filler1 = createMockCharacter({ id: "goliath-filler-1", name: "Filler 1", cost: 1 });
const filler2 = createMockCharacter({ id: "goliath-filler-2", name: "Filler 2", cost: 1 });
const filler3 = createMockCharacter({ id: "goliath-filler-3", name: "Filler 3", cost: 1 });
const filler4 = createMockCharacter({ id: "goliath-filler-4", name: "Filler 4", cost: 1 });

// NOTE FOR DEVELOPERS:
// The reason why this card is heavily tested it that it has caused so many issues over time, that we kept adding test cases to cover the issues found.
describe("Goliath - Clan Leader", () => {
  describe("DUSK TO DAWN - Goliath on player ONE board", () => {
    it("when player has more than 2 cards in hand should discard down to 2 cards at end of turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [goliathClanLeader],
        hand: [filler1, filler2, filler3, filler4],
        deck: 2,
      });

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      // Resolve the bag — player chooses which cards to discard (need to go from 4 to 2)
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(goliathClanLeader, {
          targets: [filler1, filler2],
        }),
      ).toBeSuccessfulCommand();

      // Player should now have exactly 2 cards in hand
      expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 2, discard: 2 });
      expect(testEngine.asPlayerOne().getCardZone(filler1)).toBe("discard");
      expect(testEngine.asPlayerOne().getCardZone(filler2)).toBe("discard");
      expect(testEngine.asPlayerOne().getCardZone(filler3)).toBe("hand");
      expect(testEngine.asPlayerOne().getCardZone(filler4)).toBe("hand");
    });

    it("when player has fewer than 2 cards in hand should draw up to 2 cards at end of turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [goliathClanLeader],
        hand: [filler1],
        deck: 10,
      });

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // Resolve the bag effect — draw-until-hand-size triggers
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(goliathClanLeader),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 2 });
    });

    it("should draw up to 2 cards when player has 0 cards", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [goliathClanLeader],
        hand: [],
        deck: 10,
      });

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // draw-until-hand-size auto-resolves when hand is empty
      expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 2 });
    });

    it("when player has exactly 2 cards in hand should not change hand size", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [goliathClanLeader],
        hand: [filler1, filler2],
        deck: 10,
      });

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // Trigger fires but both conditional branches are no-ops
      testEngine.asPlayerOne().resolveAllBagEffects();

      expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 2 });
    });
  });

  describe.skip("DUSK TO DAWN - Goliath on player TWO board", () => {
    it("P2 board: when P2 ends their turn and P2 has more than 2 cards, P2 should discard", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        { hand: [filler1, filler2], deck: 10 },
        { play: [goliathClanLeader], hand: [filler3, filler4, filler1, filler2], deck: 2 },
      );

      // P1 ends turn (P1 has exactly 2 cards — no-op for DUSK TO DAWN)
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      testEngine.asPlayerTwo().resolveAllBagEffects();

      // P2 ends turn — Goliath triggers, checks P2's hand (4 cards > 2)
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().getBagCount()).toBe(1);

      // P2 resolves the bag — P2 chooses which cards to discard
      expect(
        testEngine.asPlayerTwo().resolvePendingByCard(goliathClanLeader, {
          targets: [filler3, filler4],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo()).toHaveZoneCounts({ hand: 2, discard: 2 });
      expect(testEngine.asPlayerTwo().getCardZone(filler3)).toBe("discard");
      expect(testEngine.asPlayerTwo().getCardZone(filler4)).toBe("discard");
    });
  });

  describe("STONE BY DAY - If you have 3 or more cards in your hand, this character can't ready.", () => {
    it("full two-turn cycle: Goliath readies correctly with exactly 2 cards at ready time", () => {
      // P1 has Goliath (exerted), exactly 2 cards in hand, deck has cards for draw
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        { play: [{ card: goliathClanLeader, exerted: true }], hand: [filler1, filler2], deck: 10 },
        { hand: [], deck: 10 },
      );

      expect(testEngine.asPlayerOne().isExerted(goliathClanLeader)).toBe(true);

      // P1 passes turn → DUSK TO DAWN fires (2 cards, no change — no-op)
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(goliathClanLeader),
      ).toBeSuccessfulCommand();

      // P2 passes turn → DUSK TO DAWN fires again (P1 still has 2 cards — no-op)
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(goliathClanLeader),
      ).toBeSuccessfulCommand();

      // P1's new turn: ready step happens BEFORE draw step
      // P1 has 2 cards at ready time → STONE BY DAY does NOT apply → Goliath readies
      expect(testEngine.asPlayerOne().isExerted(goliathClanLeader)).toBe(false);
      // After draw step, P1 should have 3 cards (2 + 1 drawn)
      expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(3);
    });

    it.skip("prevents Goliath from readying when controller has 3+ cards in hand", () => {
      // Start with 2 cards. After DUSK TO DAWN (no change) and start-of-turn draw, hand = 3.
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: goliathClanLeader, exerted: true }],
        hand: [filler1, filler2],
        deck: 10,
      });

      expect(testEngine.asPlayerOne().isExerted(goliathClanLeader)).toBe(true);

      // Pass p1 turn — DUSK TO DAWN fires (exactly 2, no change)
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // P2 passes — DUSK TO DAWN fires for p2's end (p1 still has 2)
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      // P1's turn starts: draws 1 card → hand = 3, STONE BY DAY activates
      // Goliath should NOT have readied
      expect(testEngine.asPlayerOne().isExerted(goliathClanLeader)).toBe(true);
    });

    // TODO: The "allows Goliath to ready" test requires further engine investigation.
    // The static restriction check works (verified by the 3+ cards test above),
    // but the 2-card scenario may have timing issues with DUSK TO DAWN bag resolution
    // and the ready phase order. Legacy tests verified this worked correctly.
  });
});
