import type { CharacterCard } from "@tcg/lorcana-types";

export const beastForbiddingRecluse: CharacterCard = {
  id: "LxQ",
  canonicalId: "ci_LxQ",
  reprints: ["set2-171"],
  cardType: "character",
  name: "Beast",
  version: "Forbidding Recluse",
  i18n: {
    en: {
      name: "Beast",
      version: "Forbidding Recluse",
      text: [
        {
          title: "YOU'RE NOT WELCOME HERE",
          description: "When you play this character, you may deal 1 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Furchteinflößender Einsiedler",
      text: [
        {
          title: "DU BIST HIER NICHT WILLKOMMEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem Charakter deiner Wahl 1 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "La Bête",
      version: "Reclus inhospitalier",
      text: [
        {
          title: "VOTRE PRÉSENCE M'EST INTOLÉRABLE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui infliger 1 dommage.",
        },
      ],
    },
    it: {
      name: "Beast",
      version: "Forbidding Recluse",
      text: [
        {
          title: "YOU'RE NOT WELCOME HERE",
          description: "When you play this character, you may deal 1 damage to chosen character.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 171,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_eb28d5bab74d4784a6a59b2c5cfae6bc",
    tcgPlayer: 527533,
  },
  text: [
    {
      title: "YOU'RE NOT WELCOME HERE",
      description: "When you play this character, you may deal 1 damage to chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
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
      id: "682-1",
      name: "YOU'RE NOT WELCOME HERE",
      text: "YOU'RE NOT WELCOME HERE When you play this character, you may deal 1 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
