import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaHeadstrong: CharacterCard = {
  id: "8Xm",
  canonicalId: "ci_DLC",
  reprints: ["set2-122", "set9-127"],
  cardType: "character",
  name: "Raya",
  version: "Headstrong",
  i18n: {
    en: {
      name: "Raya",
      version: "Headstrong",
      text: [
        {
          title: "NOTE TO SELF, DON'T DIE",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may ready this character. She can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Raya",
      version: "Eigensinnig",
      text: [
        {
          title: "DAS ALLERWICHTIGSTE: NICHT STERBEN",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du ihn bereit machen. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Raya",
      version: "Obstinée",
      text: [
        {
          title: "OBJECTIF: NE PAS MOURIR",
          description:
            "Lorsque ce personnage en bannit un autre via un défi durant votre tour, vous pouvez le redresser. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Raya",
      version: "Headstrong",
      text: [
        {
          title: "NOTE TO SELF, DON'T DIE",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may ready this character. She can't quest for the rest of this turn.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 122,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f658a42763fe4f4bbd7e0605d2fb1e2f",
    tcgPlayer: 650062,
  },
  text: [
    {
      title: "NOTE TO SELF, DON'T DIE",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may ready this character. She can't quest for the rest of this turn.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              type: "ready",
              target: {
                selector: "self",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            type: "optional",
          },
          {
            condition: {
              type: "if-you-do",
            },
            then: {
              duration: "this-turn",
              restriction: "cant-quest",
              target: "SELF",
              type: "restriction",
            },
            type: "conditional",
          },
        ],
        type: "sequence",
      },
      id: "1jb-1",
      name: "NOTE TO SELF, DON'T DIE",
      text: "NOTE TO SELF, DON'T DIE During your turn, whenever this character banishes another character in a challenge, you may ready this character. She can't quest for the rest of this turn.",
      type: "triggered",
      trigger: {
        event: "banish-in-challenge",
        on: "SELF",
        timing: "whenever",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
      },
    },
  ],
};
