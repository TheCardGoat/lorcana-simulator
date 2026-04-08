import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, createMockCharacter } from "../../../testing";

describe("ink exertion when playing cards", () => {
  it("exerts inkwell cards when playing a standard cost card", () => {
    const card = createMockCharacter({
      id: "test-ink-exertion-char",
      name: "Test Ink Exertion Character",
      cost: 3,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [card],
      inkwell: 5,
      deck: 2,
    });

    const inkBefore = engine.asPlayerOne().getAvailableInk(PLAYER_ONE);
    expect(inkBefore).toBe(5);

    const result = engine.asPlayerOne().playCard(card);
    expect(result.success).toBe(true);

    const inkAfter = engine.asPlayerOne().getAvailableInk(PLAYER_ONE);
    expect(inkAfter).toBe(2); // 5 - 3 = 2
  });

  it("cannot play cards when not enough ink", () => {
    const card = createMockCharacter({
      id: "test-insufficient-ink-char",
      name: "Test Insufficient Ink Character",
      cost: 4,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [card],
      inkwell: 2,
      deck: 2,
    });

    const inkBefore = engine.asPlayerOne().getAvailableInk(PLAYER_ONE);
    expect(inkBefore).toBe(2);

    const result = engine.asPlayerOne().playCard(card);
    expect(result.success).toBe(false);

    // Ink should be unchanged
    const inkAfter = engine.asPlayerOne().getAvailableInk(PLAYER_ONE);
    expect(inkAfter).toBe(2);
  });

  it("exerts exactly the right amount of ink", () => {
    const card = createMockCharacter({
      id: "test-exact-ink-char",
      name: "Test Exact Ink Character",
      cost: 1,
      strength: 1,
      willpower: 1,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [card],
      inkwell: 3,
      deck: 2,
    });

    expect(engine.asPlayerOne().getAvailableInk(PLAYER_ONE)).toBe(3);

    const result = engine.asPlayerOne().playCard(card);
    expect(result.success).toBe(true);

    // Only 1 ink should be spent
    expect(engine.asPlayerOne().getAvailableInk(PLAYER_ONE)).toBe(2);
  });
});
