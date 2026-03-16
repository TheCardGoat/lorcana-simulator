import type { CharacterCard } from "@tcg/lorcana-types";

export const sneezyVeryAllergic: CharacterCard = {
  id: "hWr",
  canonicalId: "ci_hWr",
  reprints: ["set2-022"],
  cardType: "character",
  name: "Sneezy",
  version: "Very Allergic",
  i18n: {
    en: {
      name: "Sneezy",
      version: "Very Allergic",
      text: [
        {
          title: "AH-CHOO!",
          description:
            "Whenever you play this character or another Seven Dwarfs character, you may give chosen character -1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Hatschi",
      version: "Äußerst allergisch",
      text: [
        {
          title: "HATSCHI!",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn du einen anderen der Sieben Zwerge ausspielst, darfst du einem Charakter deiner Wahl in diesem Zug -1 geben.",
        },
      ],
    },
    fr: {
      name: "Atchoum",
      version: "Très allergique",
      text: [
        {
          title: "AAA...TCHOUM!",
          description:
            "Lorsque vous jouez ce personnage ou un autre personnage Sept Nains, choisissez un personnage qui subit -1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Sneezy",
      version: "Very Allergic",
      text: "Ah-choo!\\ Whenever you play this character or another Seven Dwarfs character, you may give chosen character -1 this turn.",
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 22,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e7b04611dd234fc7a07b0e48c2811fd2",
    tcgPlayer: 526375,
  },
  text: [
    {
      title: "AH-CHOO!",
      description:
        "Whenever you play this character or another Seven Dwarfs character, you may give chosen character -1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Seven Dwarfs"],
  abilities: [
    {
      effect: {
        type: "optional",
        effect: {
          type: "modify-stat",
          stat: "strength",
          modifier: -1,
          target: "CHOSEN_CHARACTER",
          duration: "this-turn",
        },
      },
      id: "1g9-1",
      name: "AH-CHOO!",
      text: "AH-CHOO! Whenever you play this character or another Seven Dwarfs character, you may give chosen character -1 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          controller: "you",
          cardType: "character",
          classification: "Seven Dwarfs",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
