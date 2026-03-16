import { describe, expect, it } from "bun:test";
import { aladdinPrinceAli } from "./069-aladdin-prince-ali";

describe("Aladdin - Prince Ali", () => {
  it("has the printed keyword abilities", () => {
    const keywords = (aladdinPrinceAli.abilities ?? [])
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
        keyword: "Ward",
      },
    ]);
  });
});
