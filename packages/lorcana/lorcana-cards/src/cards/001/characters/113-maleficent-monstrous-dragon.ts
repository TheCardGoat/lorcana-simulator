import type { CharacterCard } from "@tcg/lorcana-types";

export const maleficentMonstrousDragon: CharacterCard = {
  id: "MEd",
  canonicalId: "ci_C6t",
  reprints: ["set1-113", "set9-108"],
  cardType: "character",
  name: "Maleficent",
  version: "Monstrous Dragon",
  i18n: {
    en: {
      name: "Maleficent",
      version: "Monstrous Dragon",
      text: [
        {
          title: "DRAGON FIRE",
          description: "When you play this character, you may banish chosen character.",
        },
      ],
    },
    de: {
      name: "Maleficent",
      version: "Monstrous Dragon",
      text: [
        {
          title: "DRAGON FIRE",
          description: "When you play this character, you may banish chosen character.",
        },
      ],
    },
    fr: {
      name: "Maleficent",
      version: "Monstrous Dragon",
      text: [
        {
          title: "DRAGON FIRE",
          description: "When you play this character, you may banish chosen character.",
        },
      ],
    },
    it: {
      name: "Maleficent",
      version: "Monstrous Dragon",
      text: [
        {
          title: "DRAGON FIRE",
          description: "When you play this character, you may banish chosen character.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Sleeping Beauty",
  set: "001",
  cardNumber: 113,
  rarity: "legendary",
  cost: 9,
  strength: 7,
  willpower: 5,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_331c3ce2f2a74490acc4b2bec16a0ad9",
    tcgPlayer: 650046,
  },
  text: [
    {
      title: "DRAGON FIRE",
      description: "When you play this character, you may banish chosen character.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Dragon"],
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
          type: "banish",
        },
        type: "optional",
      },
      id: "19f-1",
      name: "DRAGON FIRE",
      text: "DRAGON FIRE When you play this character, you may banish chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
