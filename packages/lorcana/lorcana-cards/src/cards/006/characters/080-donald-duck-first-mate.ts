import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckFirstMate: CharacterCard = {
  id: "LAI",
  canonicalId: "ci_LAI",
  reprints: ["set6-080"],
  cardType: "character",
  name: "Donald Duck",
  version: "First Mate",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "First Mate",
      text: [
        {
          title: "CAPTAIN ON DECK",
          description: "While you have a Captain character in play, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Erster Maat",
      text: [
        {
          title: "KAPITÄN AN DECK",
          description:
            "Solange du mindestens einen Kapitän im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Second",
      text: [
        {
          title: "CAPITAINE SUR LE PONT",
          description:
            "Tant que vous avez un personnage Capitaine en jeu, ce personnage-ci gagne +2.",
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Primo Ufficiale",
      text: [
        {
          title: "CAPITANO SUL PONTE",
          description: "Mentre hai in gioco un personaggio Capitano, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "006",
  cardNumber: 80,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_466a67ed11c64db5962523365e633f0d",
    tcgPlayer: 593002,
  },
  text: [
    {
      title: "CAPTAIN ON DECK",
      description: "While you have a Captain character in play, this character gets +2 {L}.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Pirate"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1rl-1",
      text: "CAPTAIN ON DECK While you have a Captain character in play, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
