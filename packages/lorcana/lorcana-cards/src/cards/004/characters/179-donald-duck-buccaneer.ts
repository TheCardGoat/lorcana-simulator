import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckBuccaneer: CharacterCard = {
  id: "LVd",
  canonicalId: "ci_LVd",
  reprints: ["set4-179"],
  cardType: "character",
  name: "Donald Duck",
  version: "Buccaneer",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Buccaneer",
      text: [
        {
          title: "BOARDING PARTY",
          description:
            "During your turn, whenever this character banishes a character in a challenge, your other characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Buccaneer",
      text: [
        {
          title: "BOARDING PARTY",
          description:
            "During your turn, whenever this character banishes a character in a challenge, your other characters get +1 this turn.",
        },
      ],
    },
    fr: {
      name: "Donald Duck",
      version: "Buccaneer",
      text: [
        {
          title: "BOARDING PARTY",
          description:
            "During your turn, whenever this character banishes a character in a challenge, your other characters get +1 this turn.",
        },
      ],
    },
    it: {
      name: "Donald Duck",
      version: "Buccaneer",
      text: [
        {
          title: "BOARDING PARTY",
          description:
            "During your turn, whenever this character banishes a character in a challenge, your other characters get +1 this turn.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "004",
  cardNumber: 179,
  rarity: "legendary",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_da097130ff544f99b4ff980b404c053e",
    tcgPlayer: 549457,
  },
  text: [
    {
      title: "BOARDING PARTY",
      description:
        "During your turn, whenever this character banishes a character in a challenge, your other characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "va5-1",
      name: "BOARDING PARTY",
      text: "BOARDING PARTY During your turn, whenever this character banishes a character in a challenge, your other characters get +1 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
