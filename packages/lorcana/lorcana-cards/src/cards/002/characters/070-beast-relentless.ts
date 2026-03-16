import type { CharacterCard } from "@tcg/lorcana-types";

export const beastRelentless: CharacterCard = {
  id: "6Zf",
  canonicalId: "ci_oX9",
  reprints: ["set2-070"],
  cardType: "character",
  name: "Beast",
  version: "Relentless",
  i18n: {
    en: {
      name: "Beast",
      version: "Relentless",
      text: [
        {
          title: "SECOND WIND",
          description: "Whenever an opposing character is damaged, you may ready this character.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Unerbittlich",
      text: [
        {
          title: "NEUER AUFSCHWUNG",
          description:
            "Jedes Mal, wenn ein gegnerischer Charakter Schaden erhält, darfst du diesen Charakter bereit machen.",
        },
      ],
    },
    fr: {
      name: "La Bête",
      version: "Implacable",
      text: [
        {
          title: "SECOND SOUFFLE",
          description:
            "Chaque fois que des dommages sont infligés à un personnage adverse, vous pouvez redresser ce personnage.",
        },
      ],
    },
    it: {
      name: "Beast",
      version: "Relentless",
      text: [
        {
          title: "SECOND WIND",
          description: "Whenever an opposing character is damaged, you may ready this character.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 70,
  rarity: "legendary",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_458325805fc445799aabfe4c4046f89b",
    tcgPlayer: 527800,
  },
  text: [
    {
      title: "SECOND WIND",
      description: "Whenever an opposing character is damaged, you may ready this character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
