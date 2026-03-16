import type { CharacterCard } from "@tcg/lorcana-types";

export const galeWindSpirit: CharacterCard = {
  id: "Ds5",
  canonicalId: "ci_Ds5",
  reprints: ["set5-042"],
  cardType: "character",
  name: "Gale",
  version: "Wind Spirit",
  i18n: {
    en: {
      name: "Gale",
      version: "Wind Spirit",
      text: [
        {
          title: "RECURRING GUST",
          description:
            "When this character is banished in a challenge, return this card to your hand.",
        },
      ],
    },
    de: {
      name: "Gale",
      version: "Element des Windes",
      text: [
        {
          title: "WIEDERKEHRENDE BÖE",
          description:
            "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Courant d’Air",
      version: "Esprit du vent",
      text: [
        {
          title: "BOURRASQUES PERSISTANTES",
          description: "Lorsque ce personnage est banni via un défi, renvoyez-le dans votre main.",
        },
      ],
    },
    it: {
      name: "Zefiro",
      version: "Spirito del Vento",
      text: [
        {
          title: "BREZZA RICORRENTE",
          description:
            "Quando questo personaggio viene esiliato in una sfida, riprendi in mano questa carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 42,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a9888f3a8e1845588922ff69068e6f78",
    tcgPlayer: 561488,
  },
  text: [
    {
      title: "RECURRING GUST",
      description: "When this character is banished in a challenge, return this card to your hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        target: "SELF",
        type: "return-to-hand",
      },
      id: "1u4-1",
      name: "RECURRING GUST",
      text: "RECURRING GUST When this character is banished in a challenge, return this card to your hand.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
