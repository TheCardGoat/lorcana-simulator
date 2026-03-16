import type { CharacterCard } from "@tcg/lorcana-types";

export const panicImmortalSidekick: CharacterCard = {
  id: "AcX",
  canonicalId: "ci_AcX",
  reprints: ["set4-082"],
  cardType: "character",
  name: "Panic",
  version: "Immortal Sidekick",
  i18n: {
    en: {
      name: "Panic",
      version: "Immortal Sidekick",
      text: [
        {
          title: "REPORTING FOR DUTY",
          description:
            "While this character is exerted, if you have a character named Pain in play, your Villain characters can't be challenged.",
        },
      ],
    },
    de: {
      name: "Schwefel",
      version: "Unsterblicher Handlanger",
      text: [
        {
          title: "MELDEN SICH ZUM DIENST!",
          description:
            "Solange dieser Charakter erschöpft ist und du einen Pech-Charakter im Spiel hast, können deine Schurkinnen und Schurken nicht herausgefordert werden.",
        },
      ],
    },
    fr: {
      name: "Panique",
      version: "Sous-fifre immortel",
      text: [
        {
          title: "À VOS ORDRES",
          description:
            "Tant que ce personnage est épuisé, si vous avez un personnage Peine en jeu, vos personnages Méchant ne peuvent pas être défiés.",
        },
      ],
    },
    it: {
      name: "Panico",
      version: "Tirapiedi Immortale",
      text: [
        {
          title: "A RAPPORTO SIGNORE!",
          description:
            "Mentre questo personaggio è impegnato, se hai in gioco un personaggio chiamato Pena, i tuoi personaggi Cattivo non possono essere sfidati.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 82,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_3b8a6e3644374d98828747b29622e053",
    tcgPlayer: 550579,
  },
  text: [
    {
      title: "REPORTING FOR DUTY",
      description:
        "While this character is exerted, if you have a character named Pain in play, your Villain characters can't be challenged.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a character named Pain in play",
          type: "if",
        },
        then: {
          restriction: "cant-be-challenged",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "1bf-1",
      text: "REPORTING FOR DUTY While this character is exerted, if you have a character named Pain in play, your Villain characters can't be challenged.",
      type: "static",
    },
  ],
};
