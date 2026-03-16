import type { CharacterCard } from "@tcg/lorcana-types";

export const maleficentSorceress: CharacterCard = {
  id: "H9N",
  canonicalId: "ci_H9N",
  reprints: ["set1-049"],
  cardType: "character",
  name: "Maleficent",
  version: "Sorceress",
  i18n: {
    en: {
      name: "Maleficent",
      version: "Sorceress",
      text: [
        {
          title: "CAST MY SPELL!",
          description: "When you play this character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Malefiz",
      version: "Hexerin",
      text: [
        {
          title: "WIRKE MEINEN ZAUBER!",
          description: "Wenn du diesen Charakter ausspielst, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "MALÉFIQUE",
      version: "Sorcière",
      text: [
        {
          title: "SORTILÈGE",
          description: "Lorsque vous jouez ce personnage, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Malefica",
      version: "Incantatrice",
      text: [
        {
          title: "OSCURA FORZA",
          description: "Quando giochi questo personaggio, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "001",
  cardNumber: 49,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_ff8bf99d2bd84183bcc4b5d7a18360f0",
    tcgPlayer: 494103,
  },
  text: [
    {
      title: "CAST MY SPELL!",
      description: "When you play this character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "1la-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "CAST MY SPELL!",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CAST MY SPELL! When you play this character, you may draw a card.",
    },
  ],
};
