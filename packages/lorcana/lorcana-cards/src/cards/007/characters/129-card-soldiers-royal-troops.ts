import type { CharacterCard } from "@tcg/lorcana-types";

export const cardSoldiersRoyalTroops: CharacterCard = {
  id: "HaH",
  canonicalId: "ci_HaH",
  reprints: ["set7-129"],
  cardType: "character",
  name: "Card Soldiers",
  version: "Royal Troops",
  i18n: {
    en: {
      name: "Card Soldiers",
      version: "Royal Troops",
      text: [
        {
          title: "TAKE POINT",
          description: "While a damaged character is in play, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Kartensoldaten",
      version: "Königliche Truppen",
      text: [
        {
          title: "DEN PUNKT NEHMEN",
          description:
            "Solange ein beschädigter Charakter im Spiel ist, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Gardes cartes",
      version: "Troupes royales",
      text: [
        {
          title: "PRENDRE POSITION",
          description: "Tant qu'un personnage a au moins un dommage, ce personnage-ci gagne +2.",
        },
      ],
    },
    it: {
      name: "Carte Soldato",
      version: "Truppe Reali",
      text: [
        {
          title: "PRENDERE IL COMANDO",
          description:
            "Mentre un personaggio danneggiato è in gioco, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 129,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ae70cf678a1f47fe9082e2b769fe2a3c",
    tcgPlayer: 618707,
  },
  text: [
    {
      title: "TAKE POINT",
      description: "While a damaged character is in play, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1p8-1",
      text: "TAKE POINT While a damaged character is in play, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
