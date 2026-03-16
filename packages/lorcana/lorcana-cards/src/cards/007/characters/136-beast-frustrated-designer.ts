import type { CharacterCard } from "@tcg/lorcana-types";

export const beastFrustratedDesigner: CharacterCard = {
  id: "RJq",
  canonicalId: "ci_RJq",
  reprints: ["set7-136"],
  cardType: "character",
  name: "Beast",
  version: "Frustrated Designer",
  i18n: {
    en: {
      name: "Beast",
      version: "Frustrated Designer",
      text: [
        {
          title: "I'VE HAD IT!",
          description: "{E}, 2 {I}, Banish 2 of your items — Deal 5 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Frustrierter Designer",
      text: [
        {
          title: "ICH HAB' GENUG!, 2,",
          description:
            "Verbanne 2 deiner Gegenstände — Füge einem Charakter deiner Wahl 5 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "La Bête",
      version: "Concepteur frustré",
      text: [
        {
          title: "J'EN AI ASSEZ!, 2,",
          description:
            "Bannissez 2 de vos objets — Choisissez un personnage et infligez-lui 5 dommages.",
        },
      ],
    },
    it: {
      name: "La Bestia",
      version: "Inventore Frustrato",
      text: [
        {
          title: "NE HO ABBASTANZA!, 2,",
          description: "esilia 2 tuoi oggetti — Infliggi 5 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["ruby", "sapphire"],
  franchise: "Beauty and the Beast",
  set: "007",
  cardNumber: 136,
  rarity: "rare",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_ddee28debf2d4fc7ade06acadd09d058",
    tcgPlayer: 618145,
  },
  text: [
    {
      title: "I'VE HAD IT!",
      description: "{E}, 2 {I}, Banish 2 of your items — Deal 5 damage to chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince", "Inventor"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 5,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1u2-1",
      text: "I'VE HAD IT! {E}, 2 {I}, Banish 2 of your items — Deal 5 damage to chosen character.",
      type: "activated",
    },
  ],
};
