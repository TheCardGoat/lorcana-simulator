import type { CharacterCard } from "@tcg/lorcana-types";

export const banzaiTauntingHyena: CharacterCard = {
  id: "xWf",
  canonicalId: "ci_xWf",
  reprints: ["set5-087"],
  cardType: "character",
  name: "Banzai",
  version: "Taunting Hyena",
  i18n: {
    en: {
      name: "Banzai",
      version: "Taunting Hyena",
      text: [
        {
          title: "HERE KITTY, KITTY, KITTY",
          description: "When you play this character, you may exert chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Banzai",
      version: "Verhöhnende Hyäne",
      text: [
        {
          title: "MIEZ, MIEZ, MIEZ",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen beschädigten Charakter deiner Wahl erschöpfen.",
        },
      ],
    },
    fr: {
      name: "Banzaï",
      version: "Hyène railleuse",
      text: [
        {
          title: "MINOU MINOU MINOU...",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage ayant au moins un dommage sur lui et l'épuiser.",
        },
      ],
    },
    it: {
      name: "Banzai",
      version: "Iena Sarcastica",
      text: [
        {
          title: "VIENI MICIO, MICIO, MICIO",
          description:
            "Quando giochi questo personaggio, puoi impegnare un personaggio danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 87,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2f8df927b41b4664aa7f6b810df6da4a",
    tcgPlayer: 561162,
  },
  text: [
    {
      title: "HERE KITTY, KITTY, KITTY",
      description: "When you play this character, you may exert chosen damaged character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Hyena"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "exert",
        },
        type: "optional",
      },
      id: "16q-1",
      text: "HERE KITTY, KITTY, KITTY When you play this character, you may exert chosen damaged character.",
      type: "action",
    },
  ],
};
