import type { ActionCard } from "@tcg/lorcana-types";

export const hesATramp: ActionCard = {
  id: "9Uj",
  canonicalId: "ci_9Uj",
  reprints: ["set7-117"],
  cardType: "action",
  name: "He's a Tramp",
  i18n: {
    en: {
      name: "He's a Tramp",
      text: "Chosen character gets +1 {S} this turn for each character you have in play.",
    },
    de: {
      name: "So ein Strolch",
      text: "Gib einem Charakter deiner Wahl in diesem Zug +1 für jeden deiner Charaktere im Spiel.",
    },
    fr: {
      name: "Il se traîne",
      text: "Choisissez un personnage qui gagne +1 pour le reste de ce tour pour chaque personnage que vous avez en jeu.",
    },
    it: {
      name: "È un Briccon",
      text: "(Un personaggio con costo 1 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta riceve +1 per ogni personaggio che hai in gioco per questo turno.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 117,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_81b8d1f9be6542e0902b77e4ab51fae0",
    tcgPlayer: 618165,
  },
  text: "Chosen character gets +1 {S} this turn for each character you have in play.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: {
          controller: "you",
          type: "characters-in-play",
        },
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
      type: "action",
    },
  ],
};
