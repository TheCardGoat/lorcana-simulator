import type { CharacterCard } from "@tcg/lorcana-types";

export const alanadaleRockinRooster: CharacterCard = {
  id: "Jj0",
  canonicalId: "ci_Jj0",
  reprints: ["set5-020"],
  cardType: "character",
  name: "Alan-a-Dale",
  version: "Rockin' Rooster",
  i18n: {
    en: {
      name: "Alan-a-Dale",
      version: "Rockin' Rooster",
      text: [
        {
          title: "FAN FAVORITE",
          description: "Whenever you play a song, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Allan von Dale",
      version: "Rockiger Hahn",
      text: [
        {
          title: "FAN-LIEBLING",
          description: "Jedes Mal, wenn du ein Lied ausspielst, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Adam de la Halle",
      version: "Coq 'n' Roll",
      text: [
        {
          title: "FAVORI DE LA FOULE",
          description: "Chaque fois que vous jouez une chanson, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Cantagallo",
      version: "Galletto Rock",
      text: [
        {
          title: "BENIAMINO DEI FAN",
          description: "Ogni volta che giochi una canzone, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 20,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d46b1371e56d486786fb471a1c043d3a",
    tcgPlayer: 560630,
  },
  text: [
    {
      title: "FAN FAVORITE",
      description: "Whenever you play a song, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "ow8-1",
      name: "FAN FAVORITE",
      text: "FAN FAVORITE Whenever you play a song, gain 1 lore.",
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
