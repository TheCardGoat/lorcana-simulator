import type { CharacterCard } from "@tcg/lorcana-types";

export const fairyGodmotherPureHeart: CharacterCard = {
  id: "4li",
  canonicalId: "ci_4li",
  reprints: ["set2-042"],
  cardType: "character",
  name: "Fairy Godmother",
  version: "Pure Heart",
  i18n: {
    en: {
      name: "Fairy Godmother",
      version: "Pure Heart",
      text: [
        {
          title: "JUST LEAVE IT TO ME",
          description:
            "Whenever you play a character named Cinderella, you may exert chosen character.",
        },
      ],
    },
    de: {
      name: "Gute Fee",
      version: "Reinen Herzens",
      text: [
        {
          title: "VERLASS DICH GANZ AUF MICH!",
          description:
            "Jedes Mal, wenn du einen Cinderella-Charakter ausspielst, darfst du einen Charakter deiner Wahl erschöpfen.",
        },
      ],
    },
    fr: {
      name: "La Bonne Fée",
      version: "Au cœur pur",
      text: [
        {
          title: "ÇA Y EST, JE CROIS QUE J'Y SUIS",
          description:
            "Lorsque vous jouez un personnage Cendrillon, vous pouvez choisir un personnage et l'épuiser.",
        },
      ],
    },
    it: {
      name: "Fairy Godmother",
      version: "Pure Heart",
      text: [
        {
          title: "JUST LEAVE IT TO ME",
          description:
            "Whenever you play a character named Cinderella, you may exert chosen character.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 42,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c35b1525a65d4eb28169ad5d88a0bc27",
    tcgPlayer: 527735,
  },
  text: [
    {
      title: "JUST LEAVE IT TO ME",
      description:
        "Whenever you play a character named Cinderella, you may exert chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "exert",
        },
        type: "optional",
      },
      id: "109-1",
      name: "JUST LEAVE IT TO ME",
      text: "JUST LEAVE IT TO ME Whenever you play a character named Cinderella, you may exert chosen character.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
