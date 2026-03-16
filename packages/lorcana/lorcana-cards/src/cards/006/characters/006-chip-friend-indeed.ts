import type { CharacterCard } from "@tcg/lorcana-types";

export const chipFriendIndeed: CharacterCard = {
  id: "CN5",
  canonicalId: "ci_CN5",
  reprints: ["set6-006"],
  cardType: "character",
  name: "Chip",
  version: "Friend Indeed",
  i18n: {
    en: {
      name: "Chip",
      version: "Friend Indeed",
      text: [
        {
          title: "DALE'S PARTNER",
          description: "When you play this character, chosen character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Chip",
      version: "Freund in der Tat",
      text: [
        {
          title: "CHAPS PARTNER",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Tic",
      version: "Ami dont on a besoin",
      text: [
        {
          title: "PARTENAIRE DE TAC",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Cip",
      version: "Amico al Bisogno",
      text: [
        {
          title: "PARTNER DI CIOP",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 6,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a3462450711a4425947830aa8a6039bf",
    tcgPlayer: 578167,
  },
  text: [
    {
      title: "DALE'S PARTNER",
      description: "When you play this character, chosen character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1x3-1",
      name: "DALE'S PARTNER",
      text: "DALE'S PARTNER When you play this character, chosen character gets +1 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
