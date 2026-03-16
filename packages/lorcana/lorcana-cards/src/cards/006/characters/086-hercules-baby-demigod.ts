import type { CharacterCard } from "@tcg/lorcana-types";

export const herculesBabyDemigod: CharacterCard = {
  id: "7Td",
  canonicalId: "ci_7Td",
  reprints: ["set6-086"],
  cardType: "character",
  name: "Hercules",
  version: "Baby Demigod",
  i18n: {
    en: {
      name: "Hercules",
      version: "Baby Demigod",
      text: [
        {
          title: "Ward",
        },
        {
          title: "STRONG LIKE HIS DAD 3",
          description: "{I} — Deal 1 damage to chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Hercules",
      version: "Baby-Halbgott",
      text: "Behütet STARK, WIE SEIN VATER 3 — Füge einem beschädigten Charakter deiner Wahl 1 Schaden zu.",
    },
    fr: {
      name: "Hercule",
      version: "Bébé demi-dieu",
      text: "Hors d'atteinte FORT COMME SON PÈRE 3 — Infligez 1 dommage à un personnage ayant au moins 1 dommage.",
    },
    it: {
      name: "Ercole",
      version: "Semidio Bambino",
      text: "Protetto FORTE, COME IL SUO PAPÀ 3 — Infliggi 1 danno a un personaggio danneggiato a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "006",
  cardNumber: 86,
  rarity: "legendary",
  cost: 6,
  strength: 6,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_3463916fe4e54939a91ee57a62d50ba2",
    tcgPlayer: 588071,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "STRONG LIKE HIS DAD 3",
      description: "{I} — Deal 1 damage to chosen damaged character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "844-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "844-2",
      text: "STRONG LIKE HIS DAD 3 {I} - Deal 1 damage to chosen damaged character.",
      type: "action",
    },
  ],
};
