import type { CharacterCard } from "@tcg/lorcana-types";

export const mulanImperialSoldier: CharacterCard = {
  id: "4Na",
  canonicalId: "ci_4Na",
  reprints: ["set1-118"],
  cardType: "character",
  name: "Mulan",
  version: "Imperial Soldier",
  i18n: {
    en: {
      name: "Mulan",
      version: "Imperial Soldier",
      text: [
        {
          title: "LEAD BY EXAMPLE",
          description:
            "During your turn, whenever this character banishes another character in a challenge, your other characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Mulan",
      version: "Kaiserliche Soldatin",
      text: [
        {
          title: "MIT GUTEM BEISPIEL VORANGEHEN",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, erhalten deine anderen Charaktere in diesem Zug je +1.",
        },
      ],
    },
    fr: {
      name: "MULAN",
      version: "Soldat impérial",
      text: [
        {
          title: "UN EXEMPLE",
          description:
            "Lorsque ce personnage en bannit un autre via un défi durant votre tour, tous vos autres personnages gagnent +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Mulan",
      version: "Imperial Soldier",
      text: [
        {
          title: "LEAD BY EXAMPLE",
          description:
            "During your turn, whenever this character banishes another character in a challenge, your other characters get +1 this turn.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "001",
  cardNumber: 118,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_45037644be034dad9ec46ffdabcde550",
    tcgPlayer: 485365,
  },
  text: [
    {
      title: "LEAD BY EXAMPLE",
      description:
        "During your turn, whenever this character banishes another character in a challenge, your other characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "YOUR_OTHER_CHARACTERS",
        type: "modify-stat",
      },
      trigger: {
        event: "banish-in-challenge",
        on: "SELF",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
