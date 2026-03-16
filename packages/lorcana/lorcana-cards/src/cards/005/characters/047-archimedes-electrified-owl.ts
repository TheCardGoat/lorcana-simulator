import type { CharacterCard } from "@tcg/lorcana-types";

export const archimedesElectrifiedOwl: CharacterCard = {
  id: "IT1",
  canonicalId: "ci_CCb",
  reprints: ["set5-047"],
  cardType: "character",
  name: "Archimedes",
  version: "Electrified Owl",
  i18n: {
    en: {
      name: "Archimedes",
      version: "Electrified Owl",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Evasive",
        },
        {
          title: "Challenger +3",
        },
      ],
    },
    de: {
      name: "Archimedes",
      version: "Elektrifizierte Eule",
      text: "Gestaltwandel 3 Wendig Herausfordern +3",
    },
    fr: {
      name: "Archimède",
      version: "Hibou électrique",
      text: "Alter 3 Insaisissable Offensif +3",
    },
    it: {
      name: "Anacleto",
      version: "Gufo Elettrizzato",
      text: "Trasformazione 3 Sfuggente Sfidante +3",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 47,
  rarity: "uncommon",
  cost: 5,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_cb38cec5fa8e49139bb0377111d6d048",
    tcgPlayer: 561977,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Evasive",
    },
    {
      title: "Challenger +3",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      id: "oah-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3",
    },
    {
      id: "oah-2",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "oah-3",
      keyword: "Challenger",
      type: "keyword",
      value: 3,
      text: "Challenger +3",
    },
  ],
};
