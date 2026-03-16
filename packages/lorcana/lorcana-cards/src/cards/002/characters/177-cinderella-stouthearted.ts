import type { CharacterCard } from "@tcg/lorcana-types";

export const cinderellaStouthearted: CharacterCard = {
  id: "T3C",
  canonicalId: "ci_T3C",
  reprints: ["set2-177"],
  cardType: "character",
  name: "Cinderella",
  version: "Stouthearted",
  i18n: {
    en: {
      name: "Cinderella",
      version: "Stouthearted",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "Resist +2",
        },
        {
          title: "THE SINGING SWORD",
          description:
            "Whenever you play a song, this character may challenge ready characters this turn.",
        },
      ],
    },
    de: {
      name: "Cinderella",
      version: "Stouthearted",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 to play this on top of one of your characters named Cinderella.) Resist +2 (Damage dealt to this character is reduced by 2.) THE SINGING SWORD Whenever you play a song, this character may challenge ready characters this turn.",
        },
      ],
    },
    fr: {
      name: "Cinderella",
      version: "Stouthearted",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 to play this on top of one of your characters named Cinderella.) Resist +2 (Damage dealt to this character is reduced by 2.) THE SINGING SWORD Whenever you play a song, this character may challenge ready characters this turn.",
        },
      ],
    },
    it: {
      name: "Cinderella",
      version: "Stouthearted",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 to play this on top of one of your characters named Cinderella.) Resist +2 (Damage dealt to this character is reduced by 2.) THE SINGING SWORD Whenever you play a song, this character may challenge ready characters this turn.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 177,
  rarity: "common",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_8de3ae21bca6455bb44da9803af19ea8",
    tcgPlayer: 559533,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "Resist +2",
    },
    {
      title: "THE SINGING SWORD",
      description:
        "Whenever you play a song, this character may challenge ready characters this turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Knight"],
  abilities: [
    {
      id: "172-1",
      keyword: "Shift",
      type: "keyword",
      cost: {
        ink: 5,
      },
      text: "Shift 5",
    },
    {
      id: "172-2",
      keyword: "Resist",
      type: "keyword",
      value: 2,
      text: "Resist +2",
    },
    {
      id: "172-3",
      name: "THE SINGING SWORD",
      text: "THE SINGING SWORD Whenever you play a song, this character may challenge ready characters this turn.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "song",
          controller: "you",
        },
        timing: "whenever",
      },
      effect: {
        ability: "can-challenge-ready",
        duration: "this-turn",
        target: "SELF",
        type: "grant-ability",
      },
    },
  ],
};
