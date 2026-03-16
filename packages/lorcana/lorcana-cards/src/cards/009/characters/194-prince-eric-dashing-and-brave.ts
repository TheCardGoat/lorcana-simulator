import type { CharacterCard } from "@tcg/lorcana-types";

export const princeEricDashingAndBrave: CharacterCard = {
  id: "Moj",
  canonicalId: "ci_Zf7",
  reprints: ["set1-187", "set9-194"],
  cardType: "character",
  name: "Prince Eric",
  version: "Dashing and Brave",
  i18n: {
    en: {
      name: "Prince Eric",
      version: "Dashing and Brave",
      text: "Challenger +2 (While challenging, this character gets +2 {S}).",
    },
    de: {
      name: "Prinz Eric",
      version: "Elegant und kühn",
      text: "Herausfordern +2",
    },
    fr: {
      name: "PRINCE ERIC",
      version: "Fougueux et courageux",
      text: "Offensif +2",
    },
    it: {
      name: "Prince Eric",
      version: "Dashing and Brave",
      text: "Challenger +2 (While challenging, this character gets +2.)",
    },
  },
  inkType: ["steel"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 194,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_81a978c964b049f19747a98304b7f03d",
    tcgPlayer: 650127,
  },
  text: "Challenger +2 (While challenging, this character gets +2 {S}).",
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1cu-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2.",
    },
  ],
};
