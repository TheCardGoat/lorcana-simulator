import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyEmeraldChampion: CharacterCard = {
  id: "ogQ",
  canonicalId: "ci_ogQ",
  reprints: ["set10-091"],
  cardType: "character",
  name: "Goofy",
  version: "Emerald Champion",
  i18n: {
    en: {
      name: "Goofy",
      version: "Emerald Champion",
      text: [
        {
          title: "EVEN THE SCORE",
          description:
            "Whenever one of your other Emerald characters is challenged and banished, banish the challenging character.",
        },
        {
          title: "PROVIDE COVER",
          description: "Your other Emerald characters gain Ward.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Emerald Champion",
      text: [
        {
          title: "EVEN THE SCORE",
          description:
            "Whenever one of your other Emerald characters is challenged and banished, banish the challenging character.",
        },
        {
          title: "PROVIDE COVER",
          description:
            "Your other Emerald characters gain Ward. (Opponents can't choose them except to challenge.)",
        },
      ],
    },
    fr: {
      name: "Goofy",
      version: "Emerald Champion",
      text: [
        {
          title: "EVEN THE SCORE",
          description:
            "Whenever one of your other Emerald characters is challenged and banished, banish the challenging character.",
        },
        {
          title: "PROVIDE COVER",
          description:
            "Your other Emerald characters gain Ward. (Opponents can't choose them except to challenge.)",
        },
      ],
    },
    it: {
      name: "Goofy",
      version: "Emerald Champion",
      text: [
        {
          title: "EVEN THE SCORE",
          description:
            "Whenever one of your other Emerald characters is challenged and banished, banish the challenging character.",
        },
        {
          title: "PROVIDE COVER",
          description:
            "Your other Emerald characters gain Ward. (Opponents can't choose them except to challenge.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "010",
  cardNumber: 91,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_eade7bfcfdcf4189a0cc13d7ca4bb7ae",
    tcgPlayer: 658463,
  },
  text: [
    {
      title: "EVEN THE SCORE",
      description:
        "Whenever one of your other Emerald characters is challenged and banished, banish the challenging character.",
    },
    {
      title: "PROVIDE COVER",
      description: "Your other Emerald characters gain Ward.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "bau-1",
      text: "EVEN THE SCORE Whenever one of your other Emerald characters is challenged and banished, banish the challenging character.",
      name: "EVEN THE SCORE",
      effect: {
        target: "challenging-character",
        type: "banish",
      },
      trigger: {
        challengeContext: {
          role: "defender",
        },
        event: "challenged-and-banished",
        on: {
          controller: "you",
          excludeSelf: true,
        },
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      id: "bau-2",
      text: "PROVIDE COVER Your other Emerald characters gain Ward.",
      name: "PROVIDE COVER",
      affects: {
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "you",
          selector: "all",
          zones: ["play"],
          excludeSelf: true,
        },
        type: "characters",
      },
      effect: {
        keyword: "Ward",
        type: "gain-keyword",
      },
      type: "static",
    },
  ],
};
