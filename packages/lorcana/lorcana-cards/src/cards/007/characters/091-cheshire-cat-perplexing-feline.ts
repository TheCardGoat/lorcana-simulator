import type { CharacterCard } from "@tcg/lorcana-types";

export const cheshireCatPerplexingFeline: CharacterCard = {
  id: "u62",
  canonicalId: "ci_u62",
  reprints: ["set7-091"],
  cardType: "character",
  name: "Cheshire Cat",
  version: "Perplexing Feline",
  i18n: {
    en: {
      name: "Cheshire Cat",
      version: "Perplexing Feline",
      text: [
        {
          title: "MAD GRIN",
          description:
            "When you play this character, you may deal 2 damage to chosen damaged character.",
        },
      ],
    },
    de: {
      name: "Grinsekatze",
      version: "Verwirrende Katze",
      text: [
        {
          title: "VERRÜCKTES GRINSEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem beschädigten Charakter deiner Wahl 2 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Chat du Cheshire",
      version: "Félin déroutant",
      text: [
        {
          title: "SOURIRE DÉMENT",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage avec au moins un dommage et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "Stregatto",
      version: "Felino Sconcertante",
      text: [
        {
          title: "FOLLE GHIGNO",
          description:
            "Quando giochi questo personaggio, puoi infliggere 2 danni a un personaggio danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 91,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6bbaa412cc0d43d8a2c2913ccbf13c3c",
    tcgPlayer: 619454,
  },
  text: [
    {
      title: "MAD GRIN",
      description:
        "When you play this character, you may deal 2 damage to chosen damaged character.",
    },
  ],
  classifications: ["Storyborn"],
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
      id: "16n-1",
      name: "MAD GRIN",
      text: "MAD GRIN When you play this character, you may deal 2 damage to chosen damaged character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
