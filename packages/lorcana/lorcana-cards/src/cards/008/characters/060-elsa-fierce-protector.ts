import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaFierceProtector: CharacterCard = {
  id: "F8U",
  canonicalId: "ci_F8U",
  reprints: ["set8-060"],
  cardType: "character",
  name: "Elsa",
  version: "Fierce Protector",
  i18n: {
    en: {
      name: "Elsa",
      version: "Fierce Protector",
      text: [
        {
          title: "ICE OVER 1",
          description: "{I}, Choose and discard a card — Exert chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Stürmische Beschützerin",
      text: [
        {
          title: "VEREISEN 1,",
          description:
            "Wähle eine Karte aus deiner Hand und wirf sie ab — Erschöpfe einen gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Elsa",
      version: "Protectrice farouche",
      text: [
        {
          title: "GLACIATION 1,",
          description: "défaussez une carte — Choisissez un personnage adverse et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Elsa",
      version: "Protettrice Impetuosa",
      text: [
        {
          title: "GHIACCIARE 1,",
          description:
            "scegli e scarta una carta — Impegna un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 60,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a6a007b0f7ae4fa19480721bacd2b0b6",
    tcgPlayer: 631391,
  },
  text: [
    {
      title: "ICE OVER 1",
      description: "{I}, Choose and discard a card — Exert chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        chosen: true,
        target: "CONTROLLER",
        type: "discard",
      },
      id: "x49-1",
      text: "ICE OVER 1 {I} , Choose and discard a card — Exert chosen opposing character.",
      type: "activated",
    },
  ],
};
