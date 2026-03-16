import type { CharacterCard } from "@tcg/lorcana-types";

export const snowannaRainbeauCoolCompetitor: CharacterCard = {
  id: "3sJ",
  canonicalId: "ci_3sJ",
  reprints: ["set5-110"],
  cardType: "character",
  name: "Snowanna Rainbeau",
  version: "Cool Competitor",
  i18n: {
    en: {
      name: "Snowanna Rainbeau",
      version: "Cool Competitor",
      text: "Rush",
    },
    de: {
      name: "Snowanna Rainbeau",
      version: "Coole Konkurrenz",
      text: "Rasant",
    },
    fr: {
      name: "Ninou Gatine",
      version: "Compétitrice glacée",
      text: "Charge",
    },
    it: {
      name: "Snowanna Rainbeau",
      version: "Avversaria Glaciale",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 110,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_0af4496693f64685885b27455c69e385",
    tcgPlayer: 555268,
  },
  text: "Rush",
  classifications: ["Storyborn", "Ally", "Racer"],
  abilities: [
    {
      id: "rgl-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
