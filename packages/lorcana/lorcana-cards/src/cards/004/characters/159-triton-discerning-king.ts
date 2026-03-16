import type { CharacterCard } from "@tcg/lorcana-types";

export const tritonDiscerningKing: CharacterCard = {
  id: "nit",
  canonicalId: "ci_nit",
  reprints: ["set4-159"],
  cardType: "character",
  name: "Triton",
  version: "Discerning King",
  i18n: {
    en: {
      name: "Triton",
      version: "Discerning King",
      text: [
        {
          title: "CONSIGN TO THE DEPTHS",
          description: "{E}, Banish one of your items — Gain 3 lore.",
        },
      ],
    },
    de: {
      name: "Triton",
      version: "Anspruchsvoller König",
      text: [
        {
          title: "IN DIE TIEFE SCHICKEN,",
          description: "Verbanne einen deiner Gegenstände — Sammle 3 Legenden.",
        },
      ],
    },
    fr: {
      name: "Triton",
      version: "Roi clairvoyant",
      text: [
        {
          title: "RELÉGUÉ DANS LES PROFONDEURS,",
          description: "Bannissez l'un de vos objets — Gagnez 3 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Tritone",
      version: "Re Accorto",
      text: [
        {
          title: "CONSEGNARE ALL'ABISSO,",
          description: "esilia uno dei tuoi oggetti — Ottieni 3 leggenda.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 159,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a2ef85d2f5774b6d910349770f5db42e",
    tcgPlayer: 549621,
  },
  text: [
    {
      title: "CONSIGN TO THE DEPTHS",
      description: "{E}, Banish one of your items — Gain 3 lore.",
    },
  ],
  classifications: ["Storyborn", "King"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 3,
        type: "gain-lore",
      },
      id: "rj9-1",
      text: "CONSIGN TO THE DEPTHS {E}, Banish one of your items — Gain 3 lore.",
      type: "activated",
    },
  ],
};
