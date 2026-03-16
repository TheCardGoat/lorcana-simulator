import type { CharacterCard } from "@tcg/lorcana-types";

export const kitCloudkickerNavigator: CharacterCard = {
  id: "RK7",
  canonicalId: "ci_RK7",
  reprints: ["set3-147"],
  cardType: "character",
  name: "Kit Cloudkicker",
  version: "Navigator",
  i18n: {
    en: {
      name: "Kit Cloudkicker",
      version: "Navigator",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Ward",
        },
      ],
    },
    de: {
      name: "Kit Wolkenflitzer",
      version: "Navigator",
      text: "Gestaltwandel 3 Behütet",
    },
    fr: {
      name: "Kit",
      version: "Copilote",
      text: "Alter 3 Hors d'atteinte",
    },
    it: {
      name: "Kit Nuvoletta",
      version: "Navigatore",
      text: "Trasformazione 3 Protetto",
    },
  },
  inkType: ["sapphire"],
  franchise: "Talespin",
  set: "003",
  cardNumber: 147,
  rarity: "uncommon",
  cost: 6,
  strength: 2,
  willpower: 5,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_d77c74eca9ae4b56b85f6c1feac4c1c5",
    tcgPlayer: 539097,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Ward",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      id: "jtu-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3",
    },
    {
      id: "jtu-2",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
