import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellInsistentFairy: CharacterCard = {
  id: "01E",
  canonicalId: "ci_01E",
  reprints: ["set8-136"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Insistent Fairy",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Insistent Fairy",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "PAY ATTENTION",
          description:
            "Whenever you play a character with 5 {S} or more, you may exert them to gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Hartnäckige Fee",
      text: "Wendig GEBT ACHT Jedes Mal, wenn du einen Charakter mit 5 oder mehr ausspielst, darfst du jenen erschöpfen, um 2 Legenden zu sammeln.",
    },
    fr: {
      name: "La Fée Clochette",
      version: "Fée insistante",
      text: "Insaisissable SOYEZ ATTENTIFS Chaque fois que vous jouez un personnage ayant 5 ou plus, vous pouvez l'épuiser pour gagner 2 éclats de Lore.",
    },
    it: {
      name: "Trilli",
      version: "Fata Insistente",
      text: "Sfuggente DAMMI RETTA Ogni volta che giochi un personaggio con 5 o superiore, puoi impegnarlo per ottenere 2 leggenda.",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "008",
  cardNumber: 136,
  rarity: "legendary",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b2fee16bc7bb46119501e583d0e97980",
    tcgPlayer: 631842,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "PAY ATTENTION",
      description:
        "Whenever you play a character with 5 {S} or more, you may exert them to gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy"],
  abilities: [
    {
      id: "ay2-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "ay2-2",
      name: "PAY ATTENTION",
      text: "PAY ATTENTION Whenever you play a character with 5 {S} or more, you may exert them to gain 2 lore.",
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
