import type { LocationCard } from "@tcg/lorcana-types";

export const agrabahMarketplace: LocationCard = {
  id: "TOS",
  canonicalId: "ci_Ic5",
  reprints: ["set3-134", "set9-136"],
  cardType: "location",
  name: "Agrabah",
  version: "Marketplace",
  i18n: {
    en: {
      name: "Agrabah",
      version: "Marketplace",
    },
    de: {
      name: "Agrabah",
      version: "Marktplatz",
    },
    fr: {
      name: "Agrabah",
      version: "Place du marché",
    },
    it: {
      name: "Agrabah",
      version: "Mercato",
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "009",
  cardNumber: 136,
  rarity: "common",
  cost: 3,
  willpower: 5,
  moveCost: 1,
  lore: 2,
  inkable: true,
  vanilla: true,
  externalIds: {
    lorcast: "crd_6e330a06c76a4a15b2a62a2b5d25369f",
    tcgPlayer: 650071,
  },
};
