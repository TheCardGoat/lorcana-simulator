import type { ActionCard } from "@tcg/lorcana-types";

export const letItGo: ActionCard = {
  id: "t9V",
  canonicalId: "ci_r2S",
  reprints: ["set1-163", "set11-163"],
  cardType: "action",
  name: "Let It Go",
  i18n: {
    en: {
      name: "Let It Go",
      text: "Put chosen character into their player's inkwell facedown and exerted.",
    },
    de: {
      name: "Let It Go",
      text: [
        {
          title: "(A",
          description:
            "character with cost 5 or more can to sing this song for free.) Put chosen character into their player's inkwell facedown and exerted.",
        },
      ],
    },
    fr: {
      name: "Let It Go",
      text: [
        {
          title: "(A",
          description:
            "character with cost 5 or more can to sing this song for free.) Put chosen character into their player's inkwell facedown and exerted.",
        },
      ],
    },
    it: {
      name: "Let It Go",
      text: "Put chosen character into their player's inkwell facedown and exerted.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "001",
  cardNumber: 163,
  rarity: "rare",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_7e294ae586f24eddae3b7d1263c73ee7",
    tcgPlayer: 674692,
  },
  text: "Put chosen character into their player's inkwell facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "put-into-inkwell",
        source: "chosen-character",
        target: "CHOSEN_CHARACTER",
        facedown: true,
        exerted: true,
      },
    },
  ],
};
