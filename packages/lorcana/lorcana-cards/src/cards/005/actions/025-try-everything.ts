import type { ActionCard } from "@tcg/lorcana-types";

export const tryEverything: ActionCard = {
  id: "2yZ",
  canonicalId: "ci_2yZ",
  reprints: ["set5-025"],
  cardType: "action",
  name: "Try Everything",
  i18n: {
    en: {
      name: "Try Everything",
      text: "Remove up to 3 damage from chosen character and ready them. They can't quest or challenge for the rest of this turn.",
    },
    de: {
      name: "Try Everything",
      text: "Entferne bis zu 3 Schaden von einem Charakter deiner Wahl und mache ihn bereit. Er kann in diesem Zug nicht mehr erkunden oder herausfordern.",
    },
    fr: {
      name: "Try Everything",
      text: "Choisissez un personnage. Retirez-lui jusqu'à 3 dommages et redressez-le. Il ne peut ni partir à l'aventure ni défier pour le reste de ce tour.",
    },
    it: {
      name: "Try Everything",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Rimuovi fino a 3 danni da un personaggio a tua scelta e preparalo. Non può andare all'avventura o sfidare per il resto di questo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "005",
  cardNumber: 25,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_43b3128f2b504d7b9364db3803511c13",
    tcgPlayer: 559171,
  },
  text: "Remove up to 3 damage from chosen character and ready them. They can't quest or challenge for the rest of this turn.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            steps: [
              {
                type: "remove-damage",
                amount: 3,
                upTo: true,
                target: {
                  selector: "chosen",
                  count: 1,
                  owner: "any",
                  zones: ["play"],
                  cardTypes: ["character"],
                },
              },
              {
                type: "ready",
                target: "CHOSEN_CHARACTER",
              },
            ],
            type: "sequence",
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
            duration: "this-turn",
            restriction: "cant-challenge",
            target: {
              ref: "previous-target",
            },
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "2vk-1",
      text: "Remove up to 3 damage from chosen character and ready them. They can't quest or challenge for the rest of this turn.",
      type: "action",
    },
  ],
};
