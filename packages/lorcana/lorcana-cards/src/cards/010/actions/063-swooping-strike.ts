import type { ActionCard } from "@tcg/lorcana-types";

export const swoopingStrike: ActionCard = {
  id: "uRz",
  canonicalId: "ci_uRz",
  reprints: ["set10-063"],
  cardType: "action",
  name: "Swooping Strike",
  i18n: {
    en: {
      name: "Swooping Strike",
      text: "Each opponent chooses and exerts one of their ready characters.",
    },
    de: {
      name: "Sturzflug",
      text: "Alle gegnerischen Mitspielenden wählen je einen ihrer bereiten Charaktere und erschöpfen ihn.",
    },
    fr: {
      name: "Attaque en piqué",
      text: "Chaque adversaire choisit l'un de ses personnages redressés et l'épuise.",
    },
    it: {
      name: "Attacco in Picchiata",
      text: "Ogni avversario sceglie e impegna uno dei suoi personaggi preparati.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 63,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c285a7ee2f8644b3a286c71d28dabaa6",
    tcgPlayer: 659417,
  },
  text: "Each opponent chooses and exerts one of their ready characters.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "exert",
        chosenBy: "opponent",
        target: {
          selector: "chosen",
          count: 1,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "ready",
            },
          ],
        },
      },
    },
  ],
};
