import type { CharacterCard } from "@tcg/lorcana-types";

export const oswaldTheLuckyRabbit: CharacterCard = {
  id: "Wrn",
  canonicalId: "ci_Wrn",
  reprints: ["set6-142"],
  cardType: "character",
  name: "Oswald",
  version: "The Lucky Rabbit",
  i18n: {
    en: {
      name: "Oswald",
      version: "The Lucky Rabbit",
      text: [
        {
          title: "FAVORABLE CHANCE",
          description:
            "During your turn, whenever a card is put into your inkwell, you may reveal the top card of your deck. If it's an item card, you may play that item for free and it enters play exerted. Otherwise, put it on the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Oswald",
      version: "The Lucky Rabbit",
      text: [
        {
          title: "[FAVORABLE CHANCE]",
          description:
            "During your turn, whenever a card is put into your inkwell, reveal the top card of your deck. If it's an item card you may play it for free, exerted. Otherwise, put it on the bottom of your deck.",
        },
      ],
    },
    fr: {
      name: "Oswald",
      version: "The Lucky Rabbit",
      text: [
        {
          title: "[FAVORABLE CHANCE]",
          description:
            "During your turn, whenever a card is put into your inkwell, reveal the top card of your deck. If it's an item card you may play it for free, exerted. Otherwise, put it on the bottom of your deck.",
        },
      ],
    },
    it: {
      name: "Oswald",
      version: "The Lucky Rabbit",
      text: [
        {
          title: "[FAVORABLE CHANCE]",
          description:
            "During your turn, whenever a card is put into your inkwell, reveal the top card of your deck. If it's an item card you may play it for free, exerted. Otherwise, put it on the bottom of your deck.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  set: "006",
  cardNumber: 142,
  rarity: "legendary",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5fe66ed6c5c842ac9e0ea2eba5ca3a4f",
    tcgPlayer: 579933,
  },
  text: [
    {
      title: "FAVORABLE CHANCE",
      description:
        "During your turn, whenever a card is put into your inkwell, you may reveal the top card of your deck. If it's an item card, you may play that item for free and it enters play exerted. Otherwise, put it on the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "it’s an item card",
          type: "if",
        },
        then: {
          restriction: "enters-play-exerted",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "tu2-1",
      name: "FAVORABLE CHANCE",
      text: "FAVORABLE CHANCE During your turn, whenever a card is put into your inkwell, you may reveal the top card of your deck. If it’s an item card, you may play that item for free and it enters play exerted. Otherwise, put it on the bottom of your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
