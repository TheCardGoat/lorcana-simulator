import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinShapeshifter: CharacterCard = {
  id: "ijy",
  canonicalId: "ci_ijy",
  reprints: ["set2-053"],
  cardType: "character",
  name: "Merlin",
  version: "Shapeshifter",
  i18n: {
    en: {
      name: "Merlin",
      version: "Shapeshifter",
      text: [
        {
          title: "BATTLE OF WITS",
          description:
            "Whenever one of your other characters is returned to your hand from play, this character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Formwandler",
      text: [
        {
          title: "KAMPF DER GEISTER",
          description:
            "Dieser Charakter erhält jedes Mal, wenn einer deiner anderen Charaktere aus dem Spiel auf deine Hand zurückkehrt, in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "Métamorphe",
      text: [
        {
          title: "BATAILLE D'ESPRITS",
          description:
            "Chaque fois que vous renvoyez l'un de vos autres personnages dans votre main, ce personnage gagne +1 pour le reste du tour.",
        },
      ],
    },
    it: {
      name: "Merlin",
      version: "Shapeshifter",
      text: [
        {
          title: "BATTLE OF WITS",
          description:
            "Whenever one of your other characters is returned to your hand from play, this character gets +1 this turn.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 53,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_05560bab5aba45cd8cd838e0d3597cce",
    tcgPlayer: 516329,
  },
  text: [
    {
      title: "BATTLE OF WITS",
      description:
        "Whenever one of your other characters is returned to your hand from play, this character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "fck-1",
      name: "BATTLE OF WITS",
      text: "BATTLE OF WITS Whenever one of your other characters is returned to your hand from play, this character gets +1 {L} this turn.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
