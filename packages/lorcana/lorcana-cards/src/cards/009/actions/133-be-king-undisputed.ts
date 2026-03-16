import type { ActionCard } from "@tcg/lorcana-types";

export const beKingUndisputed: ActionCard = {
  id: "GX9",
  canonicalId: "ci_th8",
  reprints: ["set4-129", "set9-133"],
  cardType: "action",
  name: "Be King Undisputed",
  i18n: {
    en: {
      name: "Be King Undisputed",
      text: "Each opponent chooses and banishes one of their characters.",
    },
    de: {
      name: "Als König geboren",
      text: "Alle gegnerischen Mitspielenden wählen je einen ihrer Charaktere und verbannen ihn.",
    },
    fr: {
      name: "Un roi incontesté",
      text: "Chaque adversaire choisit un de ses personnages et le bannit.",
    },
    it: {
      name: "Sarò un Re Stimato",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Ogni avversario sceglie ed esilia uno dei suoi personaggi.",
    },
  },
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 133,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_d47a329c9f87420c8c2714ea6f7fffde",
    tcgPlayer: 650152,
  },
  text: "Each opponent chooses and banishes one of their characters.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "banish",
        chosenBy: "opponent",
        target: {
          selector: "chosen",
          count: 1,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
};
