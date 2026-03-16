import type { CharacterCard } from "@tcg/lorcana-types";

export const edLaughingHyena: CharacterCard = {
  id: "BdA",
  canonicalId: "ci_BdA",
  reprints: ["set5-074"],
  cardType: "character",
  name: "Ed",
  version: "Laughing Hyena",
  i18n: {
    en: {
      name: "Ed",
      version: "Laughing Hyena",
      text: [
        {
          title: "CAUSE A PANIC",
          description:
            "When you play this character, you may deal 2 damage to chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Ed",
      version: "Lachende Hyäne",
      text: [
        {
          title: "PANIK AUSLÖSEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem beschädigten Charakter deiner Wahl 2 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Ed",
      version: "Hyène rieuse",
      text: [
        {
          title: "VAGUE DE PEUR",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage ayant au moins un dommage sur lui et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "Ed",
      version: "Iena Ridens",
      text: [
        {
          title: "SCATENARE IL PANICO",
          description:
            "Quando giochi questo personaggio, puoi infliggere 2 danni a un personaggio danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 74,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_83352cb5f0a94843857df13731c502be",
    tcgPlayer: 561160,
  },
  text: [
    {
      title: "CAUSE A PANIC",
      description:
        "When you play this character, you may deal 2 damage to chosen damaged character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Hyena"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "1ez-1",
      name: "CAUSE A PANIC",
      text: "CAUSE A PANIC When you play this character, you may deal 2 damage to chosen damaged character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
