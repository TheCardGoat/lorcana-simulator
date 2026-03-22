import type { CharacterCard } from "@tcg/lorcana-types";
import { tukTukDisarminglyCuteI18n } from "./187-tuk-tuk-disarmingly-cute.i18n";

export const tukTukDisarminglyCute: CharacterCard = {
  id: "MK2",
  canonicalId: "ci_MK2",
  reprints: ["set7-187"],
  cardType: "character",
  name: "Tuk Tuk",
  version: "Disarmingly Cute",
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "007",
  cardNumber: 187,
  rarity: "rare",
  cost: 2,
  strength: 0,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_fd63d8b5d43d49ae9441e6839bfdec37",
    tcgPlayer: 619514,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Resist +2",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1xz-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "1xz-2",
      keyword: "Resist",
      text: "Resist +2",
      type: "keyword",
      value: 2,
    },
  ],
  i18n: tukTukDisarminglyCuteI18n,
};
