import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellSnowflakeCollector: CharacterCard = {
  id: "AqR",
  canonicalId: "ci_AqR",
  reprints: ["set11-048"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Snowflake Collector",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Snowflake Collector",
      text: [
        {
          title: "FLURRY OF DELIGHT",
          description: "While you have 4 or more cards in your hand, this character gains Evasive.",
        },
        {
          title: "SPECTACULAR FIND",
          description: "While you have 7 or more cards in your hand, this character gets +3 {L}.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Schneeflockensammlerin",
      text: [
        {
          title: "WIRBELWIND DER FREUDE",
          description:
            "Solange du 4 oder mehr Karten auf deiner Hand hast, erhält dieser Charakter Wendig.",
        },
        {
          title: "SPEKTAKULÄRER FUND",
          description:
            "Solange du 7 oder mehr Karten auf deiner Hand hast, erhält dieser Charakter +3.",
        },
      ],
    },
    fr: {
      name: "La Fée Clochette",
      version: "Collectionneuse de flocons de neige",
      text: [
        {
          title: "AVALANCHE DE JOIE",
          description:
            "Tant que vous avez 4 cartes ou plus en main, ce personnage gagne Insaisissable.",
        },
        {
          title: "DÉCOUVERTE ÉPOUSTOUFLANTE",
          description: "Tant que vous avez 7 cartes ou plus en main, ce personnage gagne +3.",
        },
      ],
    },
    it: {
      name: "Trilli",
      version: "Collezionista di Fiocchi di Neve",
      text: [
        {
          title: "TURBINIO DI DELIZIA",
          description:
            "Mentre hai 4 o più carte in mano, questo personaggio ottiene Sfuggente. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
        {
          title: "RITROVAMENTO SPETTACOLARE",
          description: "Mentre hai 7 o più carte in mano, questo personaggio riceve +3.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "011",
  cardNumber: 48,
  rarity: "legendary",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_52cd7cdc36254654b13e484e2dbc989e",
    tcgPlayer: 673332,
  },
  text: [
    {
      title: "FLURRY OF DELIGHT",
      description: "While you have 4 or more cards in your hand, this character gains Evasive.",
    },
    {
      title: "SPECTACULAR FIND",
      description: "While you have 7 or more cards in your hand, this character gets +3 {L}.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Fairy"],
  abilities: [
    {
      id: "t9a-1",
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      type: "action",
      text: "FLURRY OF DELIGHT While you have 4 or more cards in your hand, this character gains Evasive.",
    },
    {
      id: "t9a-2",
      effect: {
        modifier: 3,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      type: "action",
      text: "SPECTACULAR FIND While you have 7 or more cards in your hand, this character gets +3 {L}.",
    },
  ],
};
