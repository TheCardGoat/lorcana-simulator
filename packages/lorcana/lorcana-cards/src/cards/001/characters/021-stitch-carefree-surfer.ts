import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchCarefreeSurfer: CharacterCard = {
  id: "bms",
  canonicalId: "ci_44h",
  reprints: ["set1-021", "set9-024"],
  cardType: "character",
  name: "Stitch",
  version: "Carefree Surfer",
  i18n: {
    en: {
      name: "Stitch",
      version: "Carefree Surfer",
      text: [
        {
          title: "OHANA",
          description:
            "When you play this character, if you have 2 or more other characters in play, you may draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Sorgloser Surfer",
      text: [
        {
          title: "OHANA",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens 2 weitere Charaktere im Spiel hast, darfst du 2 Karten ziehen.",
        },
      ],
    },
    fr: {
      name: "STITCH",
      version: "Surfer insouciant",
      text: [
        {
          title: "OHANA",
          description:
            "Si vous avez au moins 2 autres personnages en jeu lorsque vous jouez ce personnage, vous pouvez piocher 2 cartes.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Carefree Surfer",
      text: [
        {
          title: "OHANA",
          description:
            "When you play this character, if you have 2 or more other characters in play, you may draw 2 cards.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "001",
  cardNumber: 21,
  rarity: "legendary",
  cost: 7,
  strength: 4,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fdaea5bd7f31497a8284771dd57894cf",
    tcgPlayer: 649972,
  },
  text: [
    {
      title: "OHANA",
      description:
        "When you play this character, if you have 2 or more other characters in play, you may draw 2 cards.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Alien"],
  abilities: [
    {
      id: "bms-1",
      name: "OHANA",
      text: "OHANA When you play this character, if you have 2 or more other characters in play, you may draw 2 cards.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "conditional",
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            excludeSelf: true,
          },
          comparison: {
            operator: "gte",
            value: 2,
          },
        },
        then: {
          type: "optional",
          chooser: "CONTROLLER",
          effect: {
            amount: 2,
            target: "CONTROLLER",
            type: "draw",
          },
        },
      },
    },
  ],
};
