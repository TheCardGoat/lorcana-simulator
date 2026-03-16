import type { CharacterCard } from "@tcg/lorcana-types";

export const theDodoOutlandishStoryteller: CharacterCard = {
  id: "Bfj",
  canonicalId: "ci_Bfj",
  reprints: ["set8-126"],
  cardType: "character",
  name: "The Dodo",
  version: "Outlandish Storyteller",
  i18n: {
    en: {
      name: "The Dodo",
      version: "Outlandish Storyteller",
      text: [
        {
          title: "EXTRAORDINARY SITUATION",
          description: "This character gets +1 {S} for each 1 damage on him.",
        },
      ],
    },
    de: {
      name: "Der Dodo",
      version: "Schräger Geschichtenerzähler",
      text: [
        {
          title: "EINE ÄUSSERST FATALE SITUATION",
          description: "Dieser Charakter erhält für jeden Schaden auf ihm +1.",
        },
      ],
    },
    fr: {
      name: "Dodo",
      version: "Conteur saugrenu",
      text: [
        {
          title: "C'EST UNE SITUATION EXTRAORDINAIRE",
          description: "Ce personnage a +1 pour chaque dommage sur lui.",
        },
      ],
    },
    it: {
      name: "Capitan Libeccio",
      version: "Narratore Stravagante",
      text: [
        {
          title: "STRAORDINARIA SITUAZIONE",
          description: "Questo personaggio riceve +1 per ogni singolo danno su di esso.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "008",
  cardNumber: 126,
  rarity: "common",
  cost: 3,
  strength: 0,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_98f834b45bba4455b572aa08bcfe8715",
    tcgPlayer: 631432,
  },
  text: [
    {
      title: "EXTRAORDINARY SITUATION",
      description: "This character gets +1 {S} for each 1 damage on him.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "dac-1",
      text: "EXTRAORDINARY SITUATION This character gets +1 {S} for each 1 damage on him.",
      type: "static",
    },
  ],
};
