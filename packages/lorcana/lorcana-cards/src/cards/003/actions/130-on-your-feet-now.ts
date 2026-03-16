import type { ActionCard } from "@tcg/lorcana-types";

export const onYourFeetNow: ActionCard = {
  id: "luq",
  canonicalId: "ci_luq",
  reprints: ["set3-130"],
  cardType: "action",
  name: "On Your Feet! Now!",
  i18n: {
    en: {
      name: "On Your Feet! Now!",
      text: "Ready all your characters and deal 1 damage to each of them. They can't quest for the rest of this turn.",
    },
    de: {
      name: "Auf die Beine! Jetzt!",
      text: "Mache alle deine Charaktere bereit und füge ihnen 1 Schaden zu. Sie können in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Debout ! Tout de suite !",
      text: "Redressez tous vos personnages et infligez-leur 1 dommage à chacun. Ils ne peuvent pas être envoyés à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "In Piedi, Adesso!",
      text: "Prepara tutti i tuoi personaggi e infliggi 1 danno a ciascuno di loro. Non possono andare all'avventura per il resto di questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 130,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_d42f3cca7b9c46a988d81347b0a4ba8b",
    tcgPlayer: 539093,
  },
  text: "Ready all your characters and deal 1 damage to each of them. They can't quest for the rest of this turn.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "ready",
            target: "YOUR_CHARACTERS",
          },
          {
            type: "deal-damage",
            amount: 1,
            target: "YOUR_CHARACTERS",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "YOUR_CHARACTERS",
            type: "restriction",
          },
        ],
      },
    },
  ],
};
