import type { ActionCard } from "@tcg/lorcana-types";

export const trialsAndTribulations: ActionCard = {
  id: "yHH",
  canonicalId: "ci_yHH",
  reprints: ["set8-043"],
  cardType: "action",
  name: "Trials and Tribulations",
  i18n: {
    en: {
      name: "Trials and Tribulations",
      text: "Chosen character gets -4 {S} until the start of your next turn.",
    },
    de: {
      name: "Oft war ich verzweifelt",
      text: "Gib einem Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -4.",
    },
    fr: {
      name: "Je travaillerai sans trêve",
      text: "Choisissez un personnage qui subit -4 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Mille Ostacoli e Impedimenti",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta riceve -4 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "008",
  cardNumber: 43,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0194ae6591894265a420ae3e50f6a355",
    tcgPlayer: 631381,
  },
  text: "Chosen character gets -4 {S} until the start of your next turn.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        duration: "until-start-of-next-turn",
        modifier: -4,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "1o4-1",
      text: "Chosen character gets -4 {S} until the start of your next turn.",
      type: "action",
    },
  ],
};
