import type { ActionCard } from "@tcg/lorcana-types";

export const seldomAllTheySeem: ActionCard = {
  id: "2xE",
  canonicalId: "ci_2xE",
  reprints: ["set4-164"],
  cardType: "action",
  name: "Seldom All They Seem",
  i18n: {
    en: {
      name: "Seldom All They Seem",
      text: "Chosen character gets -3 {S} this turn.",
    },
    de: {
      name: "Ich weiß was geschieht",
      text: "Gib einem Charakter deiner Wahl in diesem Zug -3.",
    },
    fr: {
      name: "J'en ai Rêvé",
      text: "Choisissez un personnage qui subit -3 pour le reste de ce tour.",
    },
    it: {
      name: "È Tutta Illusione",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta riceve -3 per questo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleeping Beauty",
  set: "004",
  cardNumber: 164,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c894fefd53624306a2a7f29942641a9c",
    tcgPlayer: 547771,
  },
  text: "Chosen character gets -3 {S} this turn.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: -3,
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
      id: "19i-1",
      text: "Chosen character gets -3 {S} this turn.",
      type: "action",
    },
  ],
};
