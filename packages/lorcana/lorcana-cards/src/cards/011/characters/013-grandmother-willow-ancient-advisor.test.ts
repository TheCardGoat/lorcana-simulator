import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
  createMockItem,
} from "@tcg/lorcana-engine/testing";
import { grandmotherWillowAncientAdvisor } from "./013-grandmother-willow-ancient-advisor";
import { grandmotherWillowAncientAdvisorEpic } from "./206-grandmother-willow-ancient-advisor-epic";
import { befuddle } from "../../001/actions/062-befuddle";

const discountedCharacter = createMockCharacter({
  id: "grandmother-willow-discounted-character",
  name: "Discounted Character",
  cost: 3,
  strength: 2,
  willpower: 2,
});

const secondCharacter = createMockCharacter({
  id: "grandmother-willow-second-character",
  name: "Second Character",
  cost: 3,
  strength: 1,
  willpower: 3,
});

const testItem = createMockItem({
  id: "grandmother-willow-test-item",
  name: "Test Item",
  cost: 2,
});

describe("Grandmother Willow - Ancient Advisor", () => {
  it("reduces the cost of the next character you play after Grandmother Willow enters play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [grandmotherWillowAncientAdvisor, discountedCharacter],
      inkwell: 4,
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().playCard(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().getBoard().playerEffectSourceIds?.[PLAYER_ONE]).toContain(
      testEngine.findCardInstanceId(grandmotherWillowAncientAdvisor, "play"),
    );

    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(true);
    expect(testEngine.asPlayerOne().playCard(discountedCharacter)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().getBoard().playerEffectSourceIds?.[PLAYER_ONE] ?? [],
    ).toHaveLength(0);
  });

  it("adds a start-of-turn bag effect that discounts only the first character you play that turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [grandmotherWillowAncientAdvisor],
      hand: [discountedCharacter, secondCharacter],
      inkwell: 4,
      deck: 2,
    });

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(0);
    expect(
      testEngine.asPlayerOne().resolvePendingByCard(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().getBoard().playerEffectSourceIds?.[PLAYER_ONE]).toContain(
      testEngine.findCardInstanceId(grandmotherWillowAncientAdvisor, "play"),
    );

    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(true);
    expect(testEngine.asPlayerOne().playCard(discountedCharacter)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().canPlayCard(secondCharacter)).toBe(false);
  });

  it("keeps the discount for the next character even if you play a non-character first", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [grandmotherWillowAncientAdvisor, testItem, discountedCharacter, secondCharacter],
      inkwell: 6,
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().playCard(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().playCard(testItem)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(true);
    expect(testEngine.asPlayerOne().playCard(discountedCharacter)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().canPlayCard(secondCharacter)).toBe(false);
  });

  it("regression: SMOOTH THE WAY does not fire at start of turn when Grandmother Willow has only ever been in hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [grandmotherWillowAncientAdvisor, discountedCharacter],
      inkwell: 1,
      deck: 5,
    });

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(false);
  });

  it("regression (Bug #3, prod replay mgOHDgI0QtKNC7NV7cPFeSZ): SMOOTH THE WAY does not fire when Grandmother Willow is drawn at the start of the turn (still in hand)", () => {
    // Place Willow at the TOP of the deck so the start-of-turn draw places her in hand.
    // The bug: production fires SMOOTH THE WAY for Willow even though she's now in hand,
    // never having been in play.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [discountedCharacter],
      deck: [grandmotherWillowAncientAdvisor],
      inkwell: 1,
    });

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(grandmotherWillowAncientAdvisor)).toBe("hand");
    expect(testEngine.asPlayerOne().getBagEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(false);
  });

  it("regression (Bug #3, prod-shape: putCardIntoInkwell while Willow sits in hand must not enqueue SMOOTH THE WAY)", () => {
    // Reconstructs the prod replay step sequence: Willow in hand, player inks an unrelated card,
    // confirms the bag never gets a SMOOTH THE WAY entry from Willow-in-hand.
    const inkbait = createMockCharacter({ id: "willow-ink-bait", name: "Ink Bait", cost: 1 });
    const inkbait2 = createMockCharacter({ id: "willow-ink-bait-2", name: "Ink Bait 2", cost: 1 });
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [grandmotherWillowAncientAdvisor, inkbait, inkbait2, discountedCharacter],
      inkwell: 0,
      deck: 5,
    });

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().ink(inkbait).success).toBe(true);
    expect(testEngine.asPlayerOne().getBagEffects()).toHaveLength(0);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().ink(inkbait2).success).toBe(true);
    expect(testEngine.asPlayerOne().getBagEffects()).toHaveLength(0);
  });

  it("regression (Bug #3, EPIC variant, prod replay mgOHDgI0QtKNC7NV7cPFeSZ): SMOOTH THE WAY does not fire for the Epic variant while still in hand", () => {
    // Production replay involved the Epic variant (defId 05w). Asserts the same hand-only
    // invariant for that printing.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [discountedCharacter],
      deck: [grandmotherWillowAncientAdvisorEpic],
      inkwell: 1,
    });

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(grandmotherWillowAncientAdvisorEpic)).toBe("hand");
    expect(testEngine.asPlayerOne().getBagEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(false);
  });

  it("regression: no start-of-turn bag effect is created after Grandmother Willow is bounced to hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [grandmotherWillowAncientAdvisor],
        hand: [discountedCharacter],
        inkwell: 2, // Only 2 ink — not enough for 3-cost character without discount
        deck: 5,
      },
      {
        hand: [befuddle],
        inkwell: befuddle.cost,
        deck: 5,
      },
    );

    // Pass to P2, who returns Grandmother Willow to hand
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerTwo().playCard(befuddle, { targets: [grandmotherWillowAncientAdvisor] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(grandmotherWillowAncientAdvisor)).toBe("hand");

    // Pass back to P1
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(false);
  });
});
