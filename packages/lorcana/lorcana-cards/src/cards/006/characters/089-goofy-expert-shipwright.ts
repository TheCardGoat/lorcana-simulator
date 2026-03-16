import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyExpertShipwright: CharacterCard = {
  id: "T9c",
  canonicalId: "ci_T9c",
  reprints: ["set6-089"],
  cardType: "character",
  name: "Goofy",
  version: "Expert Shipwright",
  i18n: {
    en: {
      name: "Goofy",
      version: "Expert Shipwright",
      text: [
        {
          title: "Ward",
        },
        {
          title: "CLEVER DESIGN",
          description:
            "Whenever this character quests, chosen character gains Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Expert Shipwright",
      text: [
        {
          title: "Ward",
          description:
            "(Opponents can't choose this character except to challenge.) CLEVER DESIGN Whenever this character quests, chosen character gains Ward until the start of your next turn.",
        },
      ],
    },
    fr: {
      name: "Goofy",
      version: "Expert Shipwright",
      text: [
        {
          title: "Ward",
          description:
            "(Opponents can't choose this character except to challenge.) CLEVER DESIGN Whenever this character quests, chosen character gains Ward until the start of your next turn.",
        },
      ],
    },
    it: {
      name: "Goofy",
      version: "Expert Shipwright",
      text: [
        {
          title: "Ward",
          description:
            "(Opponents can't choose this character except to challenge.) CLEVER DESIGN Whenever this character quests, chosen character gains Ward until the start of your next turn.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "006",
  cardNumber: 89,
  rarity: "rare",
  cost: 5,
  strength: 1,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_228ea83f82c34ee6a0df937dd8efe3f4",
    tcgPlayer: 591119,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "CLEVER DESIGN",
      description:
        "Whenever this character quests, chosen character gains Ward until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Inventor"],
  abilities: [
    {
      id: "gjx-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Ward",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "gjx-2",
      name: "CLEVER DESIGN",
      text: "CLEVER DESIGN Whenever this character quests, chosen character gains Ward until the start of your next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
