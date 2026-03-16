import type { ActionCard } from "@tcg/lorcana-types";

export const ragingStorm: ActionCard = {
  id: "R9J",
  canonicalId: "ci_QH5",
  reprints: ["set11-028"],
  cardType: "action",
  name: "Raging Storm",
  i18n: {
    en: {
      name: "Raging Storm",
      text: "Banish all characters.",
    },
    de: {
      name: "Wütender Sturm",
      text: "Verbanne alle Charaktere.",
    },
    fr: {
      name: "Tempête violente",
      text: "Bannissez tous les personnages.",
    },
    it: {
      name: "Bufera Furiosa",
      text: "Esilia tutti i personaggi.",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 28,
  rarity: "common",
  cost: 8,
  inkable: false,
  externalIds: {
    lorcast: "crd_b3c4b83755bd417bb09f35ffea57cb68",
    tcgPlayer: 677159,
  },
  text: "Banish all characters.",
  abilities: [
    {
      type: "action",
      text: "Banish all characters.",
      effect: {
        type: "banish",
        target: "ALL_CHARACTERS",
      },
    },
  ],
};
