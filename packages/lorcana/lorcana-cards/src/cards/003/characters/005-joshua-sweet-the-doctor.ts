import type { CharacterCard } from "@tcg/lorcana-types";

export const joshuaSweetTheDoctor: CharacterCard = {
  id: "eZE",
  canonicalId: "ci_eZE",
  reprints: ["set3-005"],
  cardType: "character",
  name: "Joshua Sweet",
  version: "The Doctor",
  i18n: {
    en: {
      name: "Joshua Sweet",
      version: "The Doctor",
      text: "Bodyguard",
    },
    de: {
      name: "Joshua Sweet",
      version: "Der Arzt",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Amadou Gentil",
      version: "Le docteur",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Joshua Dolce",
      version: "Il Dottore",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 5,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_3ff14fbe696348d281fb1974bdcd8e5f",
    tcgPlayer: 537753,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1qp-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
