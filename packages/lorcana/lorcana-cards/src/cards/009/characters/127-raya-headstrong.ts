import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaHeadstrong: CharacterCard = {
  id: "k7Z",
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
            "During your turn, whenever this character banishes another character in a challenge, you may ready this character. If you do, she can't quest for the rest of this turn.",
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
  set: "009",
  cardNumber: 127,
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
        "During your turn, whenever this character banishes another character in a challenge, you may ready this character. If you do, she can't quest for the rest of this turn.",
    },
  ],
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
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "1jb-1",
      text: "NOTE TO SELF, DON'T DIE During your turn, whenever this character banishes another character in a challenge, you may ready this character. If you do, she can't quest for the rest of this turn.",
      type: "action",
    },
  ],
};
