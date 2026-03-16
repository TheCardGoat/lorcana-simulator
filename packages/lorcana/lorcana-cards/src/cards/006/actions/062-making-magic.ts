import type { ActionCard } from "@tcg/lorcana-types";

export const makingMagic: ActionCard = {
  id: "sXO",
  canonicalId: "ci_sXO",
  reprints: ["set6-062"],
  cardType: "action",
  name: "Making Magic",
  i18n: {
    en: {
      name: "Making Magic",
      text: "Move 1 damage counter from chosen character to chosen opposing character. Draw a card.",
    },
    de: {
      name: "Magie schaffen",
      text: "Verschiebe 1 Schadensmarker von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl. Ziehe 1 Karte.",
    },
    fr: {
      name: "Faire de la magie",
      text: "Choisissez un personnage et déplacez 1 de ses dommages sur un personnage adverse de votre choix. Piochez une carte.",
    },
    it: {
      name: "Fare una Magia",
      text: "Sposta 1 segnalino danno da un personaggio a tua scelta a un personaggio avversario a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Princess and the Frog",
  set: "006",
  cardNumber: 62,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_9bc0e3add087485a927ee66c7414802d",
    tcgPlayer: 593024,
  },
  text: "Move 1 damage counter from chosen character to chosen opposing character. Draw a card.",
  abilities: [
    {
      id: "1ci-1",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "move-damage",
            amount: 1,
            from: "CHOSEN_CHARACTER",
            to: "CHOSEN_OPPOSING_CHARACTER",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
      },
      type: "action",
      text: "Move 1 damage counter from chosen character to chosen opposing character. Draw a card.",
    },
  ],
};
