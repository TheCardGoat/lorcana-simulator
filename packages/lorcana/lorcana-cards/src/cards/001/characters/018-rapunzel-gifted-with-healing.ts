import type { CharacterCard } from "@tcg/lorcana-types";

export const rapunzelGiftedWithHealing: CharacterCard = {
  id: "mTY",
  canonicalId: "ci_mTY",
  reprints: ["set1-018"],
  cardType: "character",
  name: "Rapunzel",
  version: "Gifted with Healing",
  i18n: {
    en: {
      name: "Rapunzel",
      version: "Gifted with Healing",
      text: [
        {
          title: "GLEAM AND GLOW",
          description:
            "When you play this character, remove up to 3 damage from one of your characters. Draw a card for each 1 damage removed this way.",
        },
      ],
    },
    de: {
      name: "Rapunzel",
      version: "Gifted with Healing",
      text: [
        {
          title: "GLEAM AND GLOW",
          description:
            "When you play this character, remove up to 3 damage from one of your characters. Draw a card for each 1 damage removed this way.",
        },
      ],
    },
    fr: {
      name: "Rapunzel",
      version: "Gifted with Healing",
      text: [
        {
          title: "GLEAM AND GLOW",
          description:
            "When you play this character, remove up to 3 damage from one of your characters. Draw a card for each 1 damage removed this way.",
        },
      ],
    },
    it: {
      name: "Rapunzel",
      version: "Gifted with Healing",
      text: [
        {
          title: "GLEAM AND GLOW",
          description:
            "When you play this character, remove up to 3 damage from one of your characters. Draw a card for each 1 damage removed this way.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 18,
  rarity: "legendary",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea580b2aaa374dff847750dee360b51b",
    tcgPlayer: 544503,
  },
  text: [
    {
      title: "GLEAM AND GLOW",
      description:
        "When you play this character, remove up to 3 damage from one of your characters. Draw a card for each 1 damage removed this way.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 3,
            target: "YOUR_CHOSEN_CHARACTER",
            type: "remove-damage",
            upTo: true,
          },
          {
            amount: "DAMAGE_REMOVED",
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "kro-1",
      name: "GLEAM AND GLOW",
      text: "GLEAM AND GLOW When you play this character, remove up to 3 damage from one of your characters. Draw a card for each 1 damage removed this way.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
