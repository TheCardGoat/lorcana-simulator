import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchLittleRocket: CharacterCard = {
  id: "1PU",
  canonicalId: "ci_1PU",
  reprints: ["set3-125"],
  cardType: "character",
  name: "Stitch",
  version: "Little Rocket",
  i18n: {
    en: {
      name: "Stitch",
      version: "Little Rocket",
      text: "Rush",
    },
    de: {
      name: "Stitch",
      version: "Kleine Rakete",
      text: "Rasant",
    },
    fr: {
      name: "Stitch",
      version: "Petite fusée",
      text: "Charge",
    },
    it: {
      name: "Stitch",
      version: "Piccolo Razzo",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lilo and Stitch",
  set: "003",
  cardNumber: 125,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_1f0feec19b8843c8888d22c1520239ac",
    tcgPlayer: 532522,
  },
  text: "Rush",
  classifications: ["Dreamborn", "Hero", "Alien"],
  abilities: [
    {
      id: "cgj-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
