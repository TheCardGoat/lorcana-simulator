import type { ItemCard } from "@tcg/lorcana-types";

export const devilsEyeDiamond: ItemCard = {
  id: "47U",
  canonicalId: "ci_o00",
  reprints: ["set7-152"],
  cardType: "item",
  name: "Devil's Eye Diamond",
  i18n: {
    en: {
      name: "Devil's Eye Diamond",
      text: [
        {
          title: "THE PRICE OF POWER",
          description: "{E} — If one of your characters was damaged this turn, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Teufelsaugen Diamant",
      text: [
        {
          title: "DER PREIS DER MACHT",
          description:
            "— Falls einer deiner Charaktere in diesem Zug Schaden erhalten hat, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Le Diamant Œil-du-Diable",
      text: [
        {
          title: "LE PRIX DU POUVOIR",
          description:
            "— Si l'un de vos personnages s'est vu infliger des dommages ce tour-ci, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Diamante Occhio del Diavolo",
      text: [
        {
          title: "IL PREZZO DEL POTERE",
          description:
            "— Se uno dei tuoi personaggi è stato danneggiato in questo turno, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Rescuers",
  set: "007",
  cardNumber: 152,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6a4c5fe1b3b74110acd16d725f8cc3f6",
    tcgPlayer: 619746,
  },
  text: [
    {
      title: "THE PRICE OF POWER",
      description: "{E} — If one of your characters was damaged this turn, gain 1 lore.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          type: "turn-metric",
          metric: "damaged-characters-by-owner",
          ownerScope: "you",
          comparison: {
            operator: "gt",
            value: 0,
          },
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "136-1",
      name: "THE PRICE OF POWER",
      text: "THE PRICE OF POWER {E} — If one of your characters was damaged this turn, gain 1 lore.",
      type: "activated",
    },
  ],
};
