import type { ActionCard } from "@tcg/lorcana-types";

export const goTheDistance: ActionCard = {
  id: "lwc",
  canonicalId: "ci_lwc",
  reprints: ["set2-129"],
  cardType: "action",
  name: "Go the Distance",
  i18n: {
    en: {
      name: "Go the Distance",
      text: "Ready chosen damaged character of yours. They can't quest for the rest of this turn. Draw a card.",
    },
    de: {
      name: "Ich werd‘s noch beweisen",
      text: "Mache einen deiner beschädigten Charaktere bereit. Er kann in diesem Zug nicht mehr erkunden. Ziehe 1 Karte.",
    },
    fr: {
      name: "Le monde qui est le mien",
      text: "Choisissez l'un de vos personnages blessés et redressez-le. Celui-ci ne peut pas être envoyé à l'aventure pour le reste de ce tour. Piochez une carte.",
    },
    it: {
      name: "Ce la Posso Fare",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Prepara un tuo personaggio danneggiato a tua scelta. Non può andare all'avventura per il resto di questo turno. Pesca una carta.",
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "002",
  cardNumber: 129,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2d25ebdcc8874b25b749753468ba5956",
    tcgPlayer: 527242,
  },
  text: "Ready chosen damaged character of yours. They can't quest for the rest of this turn. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            target: "YOUR_CHOSEN_DAMAGED_CHARACTER",
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: {
              ref: "previous-target",
            },
            type: "restriction",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
      },
    },
  ],
};
