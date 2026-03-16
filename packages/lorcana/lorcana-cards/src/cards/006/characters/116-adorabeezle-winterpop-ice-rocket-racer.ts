import type { CharacterCard } from "@tcg/lorcana-types";

export const adorabeezleWinterpopIceRocketRacer: CharacterCard = {
  id: "cN0",
  canonicalId: "ci_cN0",
  reprints: ["set6-116"],
  cardType: "character",
  name: "Adorabeezle Winterpop",
  version: "Ice Rocket Racer",
  i18n: {
    en: {
      name: "Adorabeezle Winterpop",
      version: "Ice Rocket Racer",
      text: [
        {
          title: "KEEP DRIVING",
          description: "While this character has damage, she gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Adorabeezle Winterpop",
      version: "Eisraketen-Rennfahrerin",
      text: [
        {
          title: "FAHR WEITER",
          description: "Solange dieser Charakter beschädigt ist, erhält er +1.",
        },
      ],
    },
    fr: {
      name: "Barbara Pappas",
      version: "Fusée glacée",
      text: [
        {
          title: "RESTE DANS LA COURSE",
          description: "Tant que ce personnage a au moins 1 dommage sur lui, il gagne +1.",
        },
      ],
    },
    it: {
      name: "Adorabeezle Winterpop",
      version: "Pilota di Ghiaccioli",
      text: [
        {
          title: "CONTINUA A GUIDARE",
          description: "Mentre questo personaggio ha danno, riceve +1.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 116,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7873f8596eef4066bc23325ceeedcfd8",
    tcgPlayer: 583721,
  },
  text: [
    {
      title: "KEEP DRIVING",
      description: "While this character has damage, she gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Racer"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "zbp-1",
      text: "KEEP DRIVING While this character has damage, she gets +1 {L}.",
      type: "static",
    },
  ],
};
