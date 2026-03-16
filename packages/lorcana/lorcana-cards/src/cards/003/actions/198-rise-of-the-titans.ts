import type { ActionCard } from "@tcg/lorcana-types";

export const riseOfTheTitans: ActionCard = {
  id: "uvL",
  canonicalId: "ci_uvL",
  reprints: ["set3-198"],
  cardType: "action",
  name: "Rise of the Titans",
  i18n: {
    en: {
      name: "Rise of the Titans",
      text: "Banish chosen location or item.",
    },
    de: {
      name: "Gib frei die Titanen",
      text: "Verbanne einen Ort oder Gegenstand deiner Wahl.",
    },
    fr: {
      name: "Libérer les Titans",
      text: "Choisissez un lieu ou un objet et bannissez-le.",
    },
    it: {
      name: "Ascesa dei Titani",
      text: "Esilia un luogo o un oggetto a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 198,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_d36e3111ff2a40f4916b08b01de3cbeb",
    tcgPlayer: 537609,
  },
  text: "Banish chosen location or item.",
  abilities: [
    {
      effect: {
        target: "CHOSEN_ITEM_OR_LOCATION",
        type: "banish",
      },
      type: "action",
    },
  ],
};
