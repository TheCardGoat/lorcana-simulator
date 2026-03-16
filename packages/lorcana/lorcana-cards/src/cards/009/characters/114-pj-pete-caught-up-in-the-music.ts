import type { CharacterCard } from "@tcg/lorcana-types";

export const pjPeteCaughtUpInTheMusic: CharacterCard = {
  id: "Z6l",
  canonicalId: "ci_Z6l",
  reprints: ["set9-114"],
  cardType: "character",
  name: "P.J. Pete",
  version: "Caught Up in the Music",
  i18n: {
    en: {
      name: "P.J. Pete",
      version: "Caught Up in the Music",
      text: [
        {
          title: "SHOUT OUT LOUD!",
          description: "Whenever you play a song, this character gets +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "K.J. Karlo",
      version: "In der Musik versunken",
      text: [
        {
          title: "LAUT MITSINGEN!",
          description:
            "Jedes Mal, wenn du ein Lied ausspielst, erhält dieser Charakter in diesem Zug +2.",
        },
      ],
    },
    fr: {
      name: "Pat Junior",
      version: "Absorbé par la musique",
      text: [
        {
          title: "SHOUT OUT LOUD!",
          description:
            "Chaque fois que vous jouez une chanson, ce personnage gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "P.J. Gambadilegno",
      version: "Rapito dalla Musica",
      text: [
        {
          title: "SHOUT OUT LOUD!",
          description:
            "Ogni volta che giochi una canzone, questo personaggio riceve +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 114,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6ce1cd22f2bb44b18d3c31ffb9c8251c",
    tcgPlayer: 650050,
  },
  text: [
    {
      title: "SHOUT OUT LOUD!",
      description: "Whenever you play a song, this character gets +2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "a30-1",
      name: "SHOUT OUT LOUD!",
      text: "SHOUT OUT LOUD! Whenever you play a song, this character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
