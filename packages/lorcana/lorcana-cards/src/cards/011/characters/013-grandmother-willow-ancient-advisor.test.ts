import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  createMockItem,
} from "@tcg/lorcana-engine/testing";
import { grandmotherWillowAncientAdvisor } from "./013-grandmother-willow-ancient-advisor";

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
  it("requires activating SMOOTH THE WAY before the next character gets the discount", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [grandmotherWillowAncientAdvisor, discountedCharacter],
      inkwell: 4,
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().playCard(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(false);

    expect(
      testEngine.asPlayerOne().activateAbility(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(true);
    expect(testEngine.asPlayerOne().playCard(discountedCharacter)).toBeSuccessfulCommand();
  });

  it("can only activate SMOOTH THE WAY once each turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [grandmotherWillowAncientAdvisor],
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().activateAbility(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();
    const secondActivation = testEngine
      .asPlayerOne()
      .activateAbility(grandmotherWillowAncientAdvisor);
    expect(secondActivation.success).toBe(false);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().activateAbility(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();
  });

  it("keeps the discount for the next character even if you play a non-character first", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [testItem, discountedCharacter, secondCharacter],
      inkwell: 4,
      play: [grandmotherWillowAncientAdvisor],
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().activateAbility(grandmotherWillowAncientAdvisor),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().playCard(testItem)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().canPlayCard(discountedCharacter)).toBe(true);
    expect(testEngine.asPlayerOne().playCard(discountedCharacter)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().canPlayCard(secondCharacter)).toBe(false);
  });
});
