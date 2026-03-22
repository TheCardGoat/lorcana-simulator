import type { CharacterCard } from "@tcg/lorcana-types";
import { arielSingingMermaidI18n } from "./015-ariel-singing-mermaid.i18n";

export const arielSingingMermaid: CharacterCard = {
  id: "h0r",
  canonicalId: "ci_k8k",
  reprints: ["set4-003", "set9-015"],
  cardType: "character",
  name: "Ariel",
  version: "Singing Mermaid",
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 15,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_4b656001901d4c34829cfe124d5c166b",
    tcgPlayer: 647652,
  },
  text: "Singer 7",
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "17w-1",
      keyword: "Singer",
      type: "keyword",
      value: 7,
      text: "Singer 7",
    },
  ],
  i18n: arielSingingMermaidI18n,
};
