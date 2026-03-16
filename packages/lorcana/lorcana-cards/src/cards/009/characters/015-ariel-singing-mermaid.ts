import type { CharacterCard } from "@tcg/lorcana-types";

export const arielSingingMermaid: CharacterCard = {
  id: "h0r",
  canonicalId: "ci_k8k",
  reprints: ["set4-003", "set9-015"],
  cardType: "character",
  name: "Ariel",
  version: "Singing Mermaid",
  i18n: {
    en: {
      name: "Ariel",
      version: "Singing Mermaid",
      text: "Singer 7",
    },
    de: {
      name: "Arielle",
      version: "Singende Meerjungfrau",
      text: [
        {
          title: "Singen 7",
          description: "(Die Kosten dieses Charakters gelten als 7 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Ariel",
      version: "Sirène chantante",
      text: "Mélomane 7 (Ce personnage est considéré comme ayant un coût de 7 pour chanter des chansons.)",
    },
    it: {
      name: "Ariel",
      version: "Sirena Canterina",
      text: "Melodioso 7",
    },
  },
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
};
