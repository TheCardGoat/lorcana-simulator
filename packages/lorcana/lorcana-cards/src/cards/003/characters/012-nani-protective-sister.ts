import type { CharacterCard } from "@tcg/lorcana-types";

export const naniProtectiveSister: CharacterCard = {
  id: "5yO",
  canonicalId: "ci_2at",
  reprints: ["set3-012", "set9-017"],
  cardType: "character",
  name: "Nani",
  version: "Protective Sister",
  i18n: {
    en: {
      name: "Nani",
      version: "Protective Sister",
      text: "Bodyguard",
    },
    de: {
      name: "Nani",
      version: "Beschützende Schwester",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Nani",
      version: "Sœur protectrice",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Nani",
      version: "Sorella Protettiva",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "003",
  cardNumber: 12,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_46a9657cca954d1981ba9f69647ebe44",
    tcgPlayer: 649965,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1fn-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
