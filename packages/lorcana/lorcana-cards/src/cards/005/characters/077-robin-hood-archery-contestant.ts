import type { CharacterCard } from "@tcg/lorcana-types";

export const robinHoodArcheryContestant: CharacterCard = {
  id: "pmt",
  canonicalId: "ci_pmt",
  reprints: ["set5-077"],
  cardType: "character",
  name: "Robin Hood",
  version: "Archery Contestant",
  i18n: {
    en: {
      name: "Robin Hood",
      version: "Archery Contestant",
      text: [
        {
          title: "TRICK SHOT",
          description:
            "When you play this character, if an opponent has a damaged character in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Robin Hood",
      version: "Teilnehmer am Wettbewerb im Bogenschießen",
      text: [
        {
          title: "TRICKSCHUSS",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine gegnerische Person einen beschädigten Charakter im Spiel hat, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Robin des Bois",
      version: "Concurrent au tir à l'arc",
      text: [
        {
          title: "FLÈCHE FOURBE",
          description:
            "Lorsque vous jouez ce personnage, si un adversaire a un personnage ayant au moins un dommage sur lui, gagnez un éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Robin Hood",
      version: "Concorrente di Tiro con l'Arco",
      text: [
        {
          title: "COLPO DA MAESTRO",
          description:
            "Quando giochi questo personaggio, se un avversario ha in gioco un personaggio danneggiato, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 77,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5d3eec99c8a746a5b8b774fb50cc5180",
    tcgPlayer: 561956,
  },
  text: [
    {
      title: "TRICK SHOT",
      description:
        "When you play this character, if an opponent has a damaged character in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "an opponent has a damaged character in play",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "t9f-1",
      name: "TRICK SHOT",
      text: "TRICK SHOT When you play this character, if an opponent has a damaged character in play, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
