import type { CharacterCard } from "@tcg/lorcana-types";

export const sebastianCourtComposer: CharacterCard = {
  id: "Xb7",
  canonicalId: "ci_Xb7",
  reprints: ["set1-019"],
  cardType: "character",
  name: "Sebastian",
  version: "Court Composer",
  i18n: {
    en: {
      name: "Sebastian",
      version: "Court Composer",
      text: "Singer 4",
    },
    de: {
      name: "Sebastian",
      version: "Hofkomponist",
      text: [
        {
          title: "Singen 4",
          description: "(Die Kosten dieses Charakters gelten als 4 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "SÉBASTIEN",
      version: "Compositeur à la Cour",
      text: "Mélomane 4 (Ce personnage est considéré comme ayant un coût de 4 pour chanter des chansons.)",
    },
    it: {
      name: "Sebastian",
      version: "Compositore di Corte",
      text: "Melodioso 4",
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 19,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_acaae5dbf3c341b8ad35851ac755cfd6",
    tcgPlayer: 504540,
  },
  text: "Singer 4",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "8rz-1",
      keyword: "Singer",
      type: "keyword",
      value: 4,
      text: "Singer 4",
    },
  ],
};
