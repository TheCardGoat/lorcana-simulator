import type { ItemCard } from "@tcg/lorcana-types";

export const cleansingRainwater: ItemCard = {
  id: "fol",
  canonicalId: "ci_fol",
  reprints: ["set3-029"],
  cardType: "item",
  name: "Cleansing Rainwater",
  i18n: {
    en: {
      name: "Cleansing Rainwater",
      text: [
        {
          title: "ANCIENT POWER",
          description: "Banish this item — Remove up to 2 damage from each of your characters.",
        },
      ],
    },
    de: {
      name: "Reinigendes Regenwasser",
      text: [
        {
          title: "URALTE MACHT",
          description:
            "Verbanne diesen Gegenstand — Entferne bis zu 2 Schaden von jedem deiner Charaktere.",
        },
      ],
    },
    fr: {
      name: "Eau de pluie purifiante",
      text: [
        {
          title: "ANCIEN POUVOIR",
          description:
            "Bannissez cet objet — Retirez jusqu'à 2 jetons Dommage de chacun de vos personnages.",
        },
      ],
    },
    it: {
      name: "Pioggia Purificatrice",
      text: [
        {
          title: "ANTICO POTERE",
          description:
            "Esilia questo oggetto — Rimuovi fino a 2 danni da ciascuno dei tuoi personaggi.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Raya and the Last Dragon",
  set: "003",
  cardNumber: 29,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_46df24a1b90a460d8572440c007f0af5",
    tcgPlayer: 537406,
  },
  text: [
    {
      title: "ANCIENT POWER",
      description: "Banish this item — Remove up to 2 damage from each of your characters.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "you",
          selector: "all",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "w7f-1",
      name: "ANCIENT POWER",
      text: "ANCIENT POWER Banish this item — Remove up to 2 damage from each of your characters.",
      type: "activated",
    },
  ],
};
