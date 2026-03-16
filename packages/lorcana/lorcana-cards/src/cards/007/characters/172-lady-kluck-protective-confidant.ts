import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyKluckProtectiveConfidant: CharacterCard = {
  id: "wEk",
  canonicalId: "ci_wEk",
  reprints: ["set7-172"],
  cardType: "character",
  name: "Lady Kluck",
  version: "Protective Confidant",
  i18n: {
    en: {
      name: "Lady Kluck",
      version: "Protective Confidant",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "Ward",
        },
      ],
    },
    de: {
      name: "Lady Gluck",
      version: "Beschützende Vertraute",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) Behütet",
    },
    fr: {
      name: "Dame Gertrude",
      version: "Confidente protectrice",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) Hors d'atteinte",
        },
      ],
    },
    it: {
      name: "Lady Cocca",
      version: "Confidente Protettiva",
      text: "Guardiano Protetto",
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Robin Hood",
  set: "007",
  cardNumber: 172,
  rarity: "uncommon",
  cost: 5,
  strength: 2,
  willpower: 7,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e8dd905ba7294b62a44a49ab52a3860a",
    tcgPlayer: 618146,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Ward",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "18v-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "18v-2",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
  ],
};
