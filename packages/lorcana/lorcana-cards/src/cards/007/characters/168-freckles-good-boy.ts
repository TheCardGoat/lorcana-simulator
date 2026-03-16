import type { CharacterCard } from "@tcg/lorcana-types";

export const frecklesGoodBoy: CharacterCard = {
  id: "64q",
  canonicalId: "ci_64q",
  reprints: ["set7-168"],
  cardType: "character",
  name: "Freckles",
  version: "Good Boy",
  i18n: {
    en: {
      name: "Freckles",
      version: "Good Boy",
      text: [
        {
          title: "JUST SO CUTE!",
          description:
            "When you play this character, chosen opposing character gets -1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Pünktchen",
      version: "Guter Junge",
      text: [
        {
          title: "EINFACH NIEDLICH!",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem gegnerischen Charakter deiner Wahl in diesem Zug -1.",
        },
      ],
    },
    fr: {
      name: "Biscotte",
      version: "Bon chien",
      text: [
        {
          title: "TELLEMENT MIGNON!",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Lentiggini",
      version: "Bravo Ragazzo",
      text: [
        {
          title: "COSÌ CARINO!",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 168,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_150d93e25ca744b69a232651dcd2caa3",
    tcgPlayer: 619502,
  },
  text: [
    {
      title: "JUST SO CUTE!",
      description: "When you play this character, chosen opposing character gets -1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: -1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1v6-1",
      name: "JUST SO CUTE!",
      text: "JUST SO CUTE! When you play this character, chosen opposing character gets -1 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
