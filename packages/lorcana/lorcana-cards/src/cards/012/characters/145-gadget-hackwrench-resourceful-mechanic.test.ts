import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  createMockItem,
} from "@tcg/lorcana-engine/testing";
import { gadgetHackwrenchResourcefulMechanic } from "./145-gadget-hackwrench-resourceful-mechanic";

const cheapItem = createMockItem({
  id: "gadget-cheap-item",
  name: "Cheap Item",
  cost: 3,
});

const supportCharacter = createMockCharacter({
  id: "gadget-support-char",
  name: "Support Character",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  abilities: [
    {
      id: "gadget-support-char-1",
      name: "Support",
      type: "keyword",
      keyword: "Support",
      text: "Support",
    },
  ],
});

describe("Gadget Hackwrench - Resourceful Mechanic", () => {
  it("TIME TO TINKER - plays an item with cost 3 or less for free when Gadget is played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [gadgetHackwrenchResourcefulMechanic, cheapItem],
        inkwell: gadgetHackwrenchResourcefulMechanic.cost,
      },
      {
        deck: 5,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(gadgetHackwrenchResourcefulMechanic),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);
    expect(
      testEngine.asPlayerOne().resolvePendingByCard(gadgetHackwrenchResourcefulMechanic, {
        resolveOptional: true,
        targets: [cheapItem],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(cheapItem)).toBe("play");
  });

  it("WELL SUPPLIED - Support characters get +1 lore", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [gadgetHackwrenchResourcefulMechanic, supportCharacter],
        deck: 5,
      },
      {
        deck: 5,
      },
    );

    expect(testEngine.asPlayerOne().getCardLore(supportCharacter)).toBe(supportCharacter.lore + 1);
  });
});
