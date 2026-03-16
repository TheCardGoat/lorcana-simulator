import type { CharacterCard } from "@tcg/lorcana-types";

export const scroogeMcduckOnTheRightTrack: CharacterCard = {
  id: "NQo",
  canonicalId: "ci_NQo",
  reprints: ["set10-008"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "On the Right Track",
  i18n: {
    en: {
      name: "Scrooge McDuck",
      version: "On the Right Track",
      text: [
        {
          title: "FABULOUS WEALTH",
          description:
            "When you play this character, chosen character with a card under them gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Dagobert Duck",
      version: "Auf dem richtigen Weg",
      text: [
        {
          title: "SAGENHAFTER REICHTUM",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen Charakter, der eine Karte unter sich hat. Jener erhält in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Balthazar Picsou",
      version: "Sur la bonne piste",
      text: [
        {
          title: "FABULEUSE FORTUNE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage avec une carte sous lui qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Paperon de' Paperoni",
      version: "Sulla Strada Giusta",
      text: [
        {
          title: "INCREDIBILE RICCHEZZA",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta con una carta sotto di sé riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 8,
  rarity: "uncommon",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c44b5e749e584c13a821007c6dce1cec",
    tcgPlayer: 660032,
  },
  text: [
    {
      title: "FABULOUS WEALTH",
      description:
        "When you play this character, chosen character with a card under them gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "ut8-1",
      name: "FABULOUS WEALTH",
      text: "FABULOUS WEALTH When you play this character, chosen character with a card under them gets +1 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
