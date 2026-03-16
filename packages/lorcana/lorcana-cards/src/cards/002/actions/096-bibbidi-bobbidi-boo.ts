import type { ActionCard } from "@tcg/lorcana-types";

export const bibbidiBobbidiBoo: ActionCard = {
  id: "GrH",
  canonicalId: "ci_GrH",
  reprints: ["set2-096"],
  cardType: "action",
  name: "Bibbidi Bobbidi Boo",
  i18n: {
    en: {
      name: "Bibbidi Bobbidi Boo",
      text: "Return chosen character of yours to your hand to play another character with the same cost or less for free.",
    },
    de: {
      name: "Bibbidi Babbidi Bu",
      text: "Wähle einen deiner Charaktere und nimm ihn zurück auf deine Hand, um einen Charakter kostenlos auszuspielen, der gleich viel oder weniger kostet als der zurückgenommene Charakter.",
    },
    fr: {
      name: "Bibbidi Bobbidi Boo",
      text: "Choisissez l'un de vos personnages et renvoyez-le dans votre main pour pouvoir jouer gratuitement un autre personnage coûtant autant ou moins.",
    },
    it: {
      name: "Bibbidi Bobbidi Boo",
      text: "Return chosen character of yours to your hand to play a character with the same cost or less for free.",
    },
  },
  inkType: ["emerald"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 96,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_5438ceaeaafb4d50a66613cc5df1ac84",
    tcgPlayer: 524184,
  },
  text: "Return chosen character of yours to your hand to play another character with the same cost or less for free.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "return-to-hand",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "you",
              selector: "chosen",
              zones: ["play"],
            },
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            then: {
              type: "play-card",
              from: "hand",
              cardType: "character",
              cost: "free",
              filter: {
                maxCost: "chosen-card-cost",
                excludeChosenCard: true,
              },
            },
          },
        ],
      },
    },
  ],
};
