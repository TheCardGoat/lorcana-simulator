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
});
