import type { ActionCard } from "@tcg/lorcana-types";

export const doubleTrouble: ActionCard = {
  id: "Y2J",
  canonicalId: "ci_Y2J",
  reprints: ["set7-202"],
  cardType: "action",
  name: "Double Trouble",
  i18n: {
    en: {
      name: "Double Trouble",
      text: "Deal 1 damage each to up to 2 chosen characters.",
    },
    de: {
      name: "Doppelter Ärger",
      text: "Wähle bis zu 2 Charaktere und füge ihnen je 1 Schaden zu.",
    },
    fr: {
      name: "Les problèmes vont par paire",
      text: "Choisissez jusqu'à 2 personnages et infligez 1 dommage à chacun.",
    },
    it: {
      name: "Doppio Problema",
      text: "Infliggi 1 danno ciascuno a fino a 2 personaggi a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Sleeping Beauty",
  set: "007",
  cardNumber: 202,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b03fcfe1974a4516a5b260cd9cd838b2",
    tcgPlayer: 619524,
  },
  text: "Deal 1 damage each to up to 2 chosen characters.",
  abilities: [
    {
      type: "action",
      text: "Deal 1 damage each to up to 2 chosen characters.",
      effect: {
        amount: 1,
        target: {
          selector: "chosen",
          count: {
            upTo: 2,
          },
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
        },
        type: "deal-damage",
      },
    },
  ],
};
