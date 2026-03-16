import type { ItemCard } from "@tcg/lorcana-types";

export const rlsLegacysCannon: ItemCard = {
  id: "gkg",
  canonicalId: "ci_gkg",
  reprints: ["set4-202"],
  cardType: "item",
  name: "RLS Legacy's Cannon",
  i18n: {
    en: {
      name: "RLS Legacy's Cannon",
      text: [
        {
          title: "BA-BOOM!",
          description:
            "{E}, 2 {I}, Discard a card — Deal 2 damage to chosen character or location.",
        },
      ],
    },
    de: {
      name: "Kanone der RLS Legacy",
      text: [
        {
          title: "BAA-BUMM!, 2,",
          description: "Wirf 1 Karte ab — Füge einem Charakter oder Ort deiner Wahl 2 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Canon du RLS Héritage",
      text: [
        {
          title: "BA-BOUM!, 2,",
          description:
            "Défaussez une carte — Choisissez un personnage ou un lieu et infligez-lui 2 dommages.",
        },
      ],
    },
    it: {
      name: "Cannone della RLS Legacy",
      text: [
        {
          title: "BA-BUM!, 2,",
          description:
            "scarta una carta — Infliggi 2 danni a un personaggio o a un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "004",
  cardNumber: 202,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_d12740d7854a4ff69d2921c943454bc8",
    tcgPlayer: 548537,
  },
  text: [
    {
      title: "BA-BOOM!",
      description: "{E}, 2 {I}, Discard a card — Deal 2 damage to chosen character or location.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
        discardCards: 1,
        discardChosen: true,
      },
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character", "location"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1rt-1",
      name: "BA-BOOM!",
      text: "BA-BOOM! {E}, 2 {I}, Discard a card — Deal 2 damage to chosen character or location.",
      type: "activated",
    },
  ],
};
