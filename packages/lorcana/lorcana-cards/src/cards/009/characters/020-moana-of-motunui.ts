import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaOfMotunui: CharacterCard = {
  id: "lsO",
  canonicalId: "ci_Pdi",
  reprints: ["set1-014", "set9-020"],
  cardType: "character",
  name: "Moana",
  version: "Of Motunui",
  i18n: {
    en: {
      name: "Moana",
      version: "Of Motunui",
      text: [
        {
          title: "WE CAN FIX IT",
          description:
            "Whenever this character quests, you may ready your other exerted Princess characters. If you do, they can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Vaiana",
      version: "Von Motunui",
      text: [
        {
          title: "WIR KRIEGEN DAS HIN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du deine anderen Prinzessinnen bereit machen. Sie können in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "VAIANA",
      version: "de Motunui",
      text: [
        {
          title: "NOUS ALLONS LE RÉPARER",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, vous pouvez redresser vos autres personnages Princesse. Elles ne peuvent pas être envoyées à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Moana",
      version: "Of Motunui",
      text: [
        {
          title: "WE CAN FIX IT",
          description:
            "Whenever this character quests, you may ready your other Princess characters. They can't quest for the rest of this turn.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Moana",
  set: "009",
  cardNumber: 20,
  rarity: "rare",
  cost: 5,
  strength: 1,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_612c000e0f7047659edee1e275069811",
    tcgPlayer: 649968,
  },
  text: [
    {
      title: "WE CAN FIX IT",
      description:
        "Whenever this character quests, you may ready your other exerted Princess characters. If you do, they can't quest for the rest of this turn.",
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
                selector: "chosen",
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
      id: "n94-1",
      name: "WE CAN FIX IT",
      text: "WE CAN FIX IT Whenever this character quests, you may ready your other exerted Princess characters. If you do, they can't quest for the rest of this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
