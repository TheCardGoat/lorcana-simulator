import type { KeywordAbilityDefinition } from "@tcg/lorcana-types";

export const boost = (value: number): KeywordAbilityDefinition => ({
  keyword: "Boost",
  text: `Boost ${value} {I}`,
  type: "keyword",
  value,
});
