import type { ActionCard } from "@tcg/lorcana-types";

export const teethAndAmbitions: ActionCard = {
  id: "4lC",
  canonicalId: "ci_4lC",
  reprints: ["set2-130"],
  cardType: "action",
  name: "Teeth and Ambitions",
  i18n: {
    en: {
      name: "Teeth and Ambitions",
      text: "Deal 2 damage to chosen character of yours to deal 2 damage to another chosen character.",
    },
    de: {
      name: "Zähne blank wie Neid",
      text: "Wähle einen deiner Charaktere und füge ihm 2 Schaden zu, um einem anderen Charakter deiner Wahl 2 Schaden zuzufügen.",
    },
    fr: {
      name: "Votre roi vous invite à la fête",
      text: "Choisissez l'un de vos personnages et infligez-lui 2 dommages pour infliger 2 dommages à un autre personnage au choix.",
    },
    it: {
      name: "Affiliamo le Zanne",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Infliggi 2 danni a un tuo personaggio a tua scelta per infliggere 2 danni a un altro personaggio a tua scelta.",
    },
  },
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "002",
  cardNumber: 130,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5fede8ed6d6845b7be83496ccb0fb2f8",
    tcgPlayer: 527248,
  },
  text: "Deal 2 damage to chosen character of yours to deal 2 damage to another chosen character.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 2,
            type: "deal-damage",
            target: "CHOSEN_CHARACTER_OF_YOURS",
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            then: {
              amount: 2,
              type: "deal-damage",
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
                requireDifferentTargets: true,
              },
            },
          },
        ],
      },
    },
  ],
};
