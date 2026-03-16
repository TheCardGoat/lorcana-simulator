import { describe, expect, it } from "bun:test";
import { gastonArrogantHunter } from "./110-gaston-arrogant-hunter";

describe("Gaston - Arrogant Hunter", () => {
  it("has the printed keyword abilities", () => {
    const keywords = (gastonArrogantHunter.abilities ?? [])
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
        keyword: "Reckless",
      },
    ]);
  });
});
