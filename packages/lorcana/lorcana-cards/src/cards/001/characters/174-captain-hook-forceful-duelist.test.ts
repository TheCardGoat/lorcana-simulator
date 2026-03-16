import { describe, expect, it } from "bun:test";
import { captainHookForcefulDuelist } from "./174-captain-hook-forceful-duelist";

describe("Captain Hook - Forceful Duelist", () => {
  it("has the printed keyword abilities", () => {
    const keywords = (captainHookForcefulDuelist.abilities ?? [])
      .filter((ability) => ability.type === "keyword")
      .map((ability) =>
        ability.type === "keyword" && "value" in ability && typeof ability.value === "number"
          ? { keyword: ability.keyword, value: ability.value }
          : ability.type === "keyword"
            ? { keyword: ability.keyword }
            : null,
      )
      .filter((ability) => ability !== null);

    expect(keywords).toEqual([
      {
        keyword: "Challenger",
        value: 2,
      },
    ]);
  });
});
