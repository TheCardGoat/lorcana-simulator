import type { CharacterCard } from "@tcg/lorcana-types";

export const brunoMadrigalUndetectedUncle: CharacterCard = {
  id: "Hx7",
  canonicalId: "ci_1KP",
  reprints: ["set4-039", "set9-000"],
  cardType: "character",
  name: "Bruno Madrigal",
  version: "Undetected Uncle",
  i18n: {
    en: {
      name: "Bruno Madrigal",
      version: "Undetected Uncle",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "YOU JUST HAVE TO SEE IT",
          description:
            "{E} — Name a card, then reveal the top card of your deck. If it's the named card, put that card into your hand and gain 3 lore. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Bruno Madrigal",
      version: "Undetected Uncle",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) YOU JUST HAVE TO SEE IT — Name a card, then reveal the top card of your deck. If it's the named card, put that card into your hand and gain 3 lore. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    fr: {
      name: "Bruno Madrigal",
      version: "Undetected Uncle",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) YOU JUST HAVE TO SEE IT — Name a card, then reveal the top card of your deck. If it's the named card, put that card into your hand and gain 3 lore. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    it: {
      name: "Bruno Madrigal",
      version: "Undetected Uncle",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) YOU JUST HAVE TO SEE IT — Name a card, then reveal the top card of your deck. If it's the named card, put that card into your hand and gain 3 lore. Otherwise, put it on the top of your deck.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 39,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2cbda843e29c4e6392ccddd6858eeb7d",
    tcgPlayer: 651127,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "YOU JUST HAVE TO SEE IT",
      description:
        "{E} — Name a card, then reveal the top card of your deck. If it's the named card, put that card into your hand and gain 3 lore. Otherwise, put it on the top of your deck.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      id: "13f-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        condition: {
          expression: "it's the named card",
          type: "if",
        },
        then: {
          amount: 3,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "13f-2",
      text: "YOU JUST HAVE TO SEE IT {E} — Name a card, then reveal the top card of your deck. If it's the named card, put it into your hand and gain 3 lore. Otherwise, put it on the top of your deck.",
      type: "activated",
    },
  ],
};
