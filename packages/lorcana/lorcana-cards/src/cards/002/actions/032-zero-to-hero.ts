import type { ActionCard } from "@tcg/lorcana-types";

export const zeroToHero: ActionCard = {
  id: "YND",
  canonicalId: "ci_YND",
  reprints: ["set2-032"],
  cardType: "action",
  name: "Zero to Hero",
  i18n: {
    en: {
      name: "Zero to Hero",
      text: "Count the number of characters you have in play. You pay that amount of {I} less for the next character you play this turn.",
    },
    de: {
      name: "In Sekunden auf Hundert",
      text: "Zähle deine Charaktere im Spiel. Der nächste Charakter, den du in diesem Zug ausspielst, kostet dich diese Anzahl weniger.",
    },
    fr: {
      name: "De zéro en héros",
      text: "Le prochain personnage que vous jouez durant ce tour vous coûte -X, X étant le nombre de personnages que vous avez en jeu à ce moment-là.",
    },
    it: {
      name: "Zero to Hero",
      text: "Count the number of characters you have in play. You pay that amount of less for the next character you play this turn.",
    },
  },
  inkType: ["amber"],
  franchise: "Hercules",
  set: "002",
  cardNumber: 32,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_03538324959a406cb3ac98684214d437",
    tcgPlayer: 516387,
  },
  text: "Count the number of characters you have in play. You pay that amount of {I} less for the next character you play this turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        amount: {
          controller: "you",
          type: "characters-in-play",
        },
        cardType: "character",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
    },
  ],
};
