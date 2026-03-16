import type { ActionCard } from "@tcg/lorcana-types";

export const suddenChill: ActionCard = {
  id: "9VA",
  canonicalId: "ci_72X",
  reprints: ["set1-098", "set9-095"],
  cardType: "action",
  name: "Sudden Chill",
  i18n: {
    en: {
      name: "Sudden Chill",
      text: "Each opponent chooses and discards a card.",
    },
    de: {
      name: "Durchbohrender Blick",
      text: "Alle gegnerischen Mitspielenden wählen je 1 Karte aus ihrer Hand und werfen sie ab.",
    },
    fr: {
      name: "CRUELLE DIABLESSE",
      text: "Chaque adversaire choisit et défausse une carte de sa main.",
    },
    it: {
      name: "Sudden Chill",
      text: "Each opponent chooses and discards a card.",
    },
  },
  inkType: ["emerald"],
  franchise: "101 Dalmatians",
  set: "009",
  cardNumber: 95,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_541fd75946914a688a54b5fc5f1d966d",
    tcgPlayer: 650033,
  },
  text: "Each opponent chooses and discards a card.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        amount: 1,
        chosen: true,
        from: "hand",
        target: "EACH_OPPONENT",
        type: "discard",
      },
    },
  ],
};
