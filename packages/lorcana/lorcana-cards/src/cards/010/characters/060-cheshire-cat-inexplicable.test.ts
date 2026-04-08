import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { cheshireCatInexplicable } from "./060-cheshire-cat-inexplicable";

const ally = createMockCharacter({
  id: "cheshire-ally",
  name: "Ally",
  cost: 2,
  strength: 2,
  willpower: 4,
});

const damagedAlly = createMockCharacter({
  id: "cheshire-damaged-ally",
  name: "Damaged Ally",
  cost: 2,
  strength: 2,
  willpower: 8,
});

const opposingTarget = createMockCharacter({
  id: "cheshire-opposing-target",
  name: "Opposing Target",
  cost: 2,
  strength: 2,
  willpower: 4,
});

describe("Cheshire Cat - Inexplicable", () => {
  it("has Boost 2 keyword", () => {
    const abilities = cheshireCatInexplicable.abilities ?? [];
    const ability = abilities[0];
    expect(ability).toBeDefined();
    expect(ability!.type).toBe("keyword");
    expect((ability as { keyword: string }).keyword).toBe("Boost");
    expect((ability as { value: number }).value).toBe(2);
  });

  it("has IT'S LOADS OF FUN triggered ability", () => {
    const abilities = cheshireCatInexplicable.abilities ?? [];
    const ability = abilities[1];
    expect(ability).toBeDefined();
    expect(ability!.type).toBe("triggered");
    expect((ability as { trigger: { event: string } }).trigger.event).toBe("put-card-under");
  });

  describe("IT'S LOADS OF FUN", () => {
    it("controller can move damage from friendly character to opposing character when card is put under Cheshire Cat", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [cheshireCatInexplicable, { card: damagedAlly, damage: 2 }],
          inkwell: 3,
          deck: 3,
        },
        {
          play: [opposingTarget],
          deck: 2,
        },
      );

      // Activate Boost to put a card under Cheshire Cat (triggers IT'S LOADS OF FUN)
      expect(
        testEngine.asPlayerOne().activateAbility(cheshireCatInexplicable, { ability: "Boost" }),
      ).toBeSuccessfulCommand();

      // Should have a bag effect - controller can optionally move damage
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      // Accept: move 2 damage from damagedAlly to opposingTarget
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(cheshireCatInexplicable, {
          resolveOptional: true,
          targets: [damagedAlly, opposingTarget],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(damagedAlly)).toBe(0);
      expect(testEngine.asPlayerTwo().getDamage(opposingTarget)).toBe(2);
    });

    it("controller can decline to move damage", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [cheshireCatInexplicable, { card: damagedAlly, damage: 2 }],
          inkwell: 3,
          deck: 3,
        },
        {
          play: [opposingTarget],
          deck: 2,
        },
      );

      expect(
        testEngine.asPlayerOne().activateAbility(cheshireCatInexplicable, { ability: "Boost" }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      // Decline
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(cheshireCatInexplicable, {
          resolveOptional: false,
        }),
      ).toBeSuccessfulCommand();

      // Damage should be unchanged
      expect(testEngine.asPlayerOne().getDamage(damagedAlly)).toBe(2);
      expect(testEngine.asPlayerTwo().getDamage(opposingTarget)).toBe(0);
    });
  });
});
