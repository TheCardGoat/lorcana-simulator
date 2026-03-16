import type { ItemCard } from "@tcg/lorcana-types";

export const fryingPan: ItemCard = {
  id: "HLs",
  canonicalId: "ci_HLs",
  reprints: ["set1-202"],
  cardType: "item",
  name: "Frying Pan",
  i18n: {
    en: {
      name: "Frying Pan",
      text: [
        {
          title: "CLANG!",
          description:
            "Banish this item — Chosen character can't challenge during their next turn.",
        },
      ],
    },
    de: {
      name: "Bratpfanne",
      text: [
        {
          title: "KLONG!",
          description:
            "Verbanne diesen Gegenstand — wähle einen gegnerischen Charakter. Er kann in seinem nächsten Zug nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "POÊLE À FRIRE",
      text: [
        {
          title: "BANG!",
          description:
            "Bannissez cet objet — Choisissez un personnage qui ne pourra pas défier durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Frying Pan",
      text: [
        {
          title: "CLANG!",
          description:
            "Banish this item — Chosen character can't challenge during their next turn.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 202,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_aa294faf68c14f559c22e0e79a6c101e",
    tcgPlayer: 492999,
  },
  text: [
    {
      title: "CLANG!",
      description: "Banish this item — Chosen character can't challenge during their next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        duration: "their-next-turn",
        restriction: "cant-challenge",
        target: "CHOSEN_CHARACTER",
        type: "restriction",
      },
      id: "1mv-1",
      name: "CLANG!",
      text: "CLANG! Banish this item — Chosen character can't challenge during their next turn.",
      type: "activated",
    },
  ],
};
