import type { CharacterCard } from "@tcg/lorcana-types";

export const razoulPalaceGuard: CharacterCard = {
  id: "Lj2",
  canonicalId: "ci_Lj2",
  reprints: ["set3-188"],
  cardType: "character",
  name: "Razoul",
  version: "Palace Guard",
  i18n: {
    en: {
      name: "Razoul",
      version: "Palace Guard",
      text: [
        {
          title: "LOOKY HERE",
          description: "While this character has no damage, he gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Rasul",
      version: "Palastwache",
      text: [
        {
          title: "SEHT EUCH DAS AN",
          description: "Solange dieser Charakter unbeschädigt ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Razoul",
      version: "Garde du palais",
      text: [
        {
          title: "REGARDEZ",
          description: "Tant que ce personnage n'a aucun jeton Dommage sur lui, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Razoul",
      version: "Guardia di Palazzo",
      text: [
        {
          title: "GUARDATE UN PO'",
          description: "Mentre questo personaggio non ha danno, riceve +2.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 188,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_35f95b92c0ce4e8e85eef87a3edbeb29",
    tcgPlayer: 539114,
  },
  text: [
    {
      title: "LOOKY HERE",
      description: "While this character has no damage, he gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Captain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1xc-1",
      text: "LOOKY HERE While this character has no damage, he gets +2 {S}.",
      type: "static",
    },
  ],
};
