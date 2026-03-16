import type { ActionCard } from "@tcg/lorcana-types";

export const fourDozenEggs: ActionCard = {
  id: "wvC",
  canonicalId: "ci_Y4g",
  reprints: ["set2-163", "set9-164"],
  cardType: "action",
  name: "Four Dozen Eggs",
  i18n: {
    en: {
      name: "Four Dozen Eggs",
      text: "Your characters gain Resist +2 until the start of your next turn.",
    },
    de: {
      name: "Four Dozen Eggs",
      text: [
        {
          title: "(A",
          description:
            "character with cost 4 or more can to sing this song for free.) Your characters gain Resist +2 until the start of your next turn. (Damage dealt to them is reduced by 2.)",
        },
      ],
    },
    fr: {
      name: "Four Dozen Eggs",
      text: [
        {
          title: "(A",
          description:
            "character with cost 4 or more can to sing this song for free.) Your characters gain Resist +2 until the start of your next turn. (Damage dealt to them is reduced by 2.)",
        },
      ],
    },
    it: {
      name: "Four Dozen Eggs",
      text: "Your characters gain Resist +2 until the start of your next turn. (Damage dealt to them is reduced by 2.)",
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 164,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_afa9023a2aeb4569bad0116e638821fa",
    tcgPlayer: 650098,
  },
  text: "Your characters gain Resist +2 until the start of your next turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "gain-keyword",
        keyword: "Resist",
        value: 2,
        duration: "until-start-of-next-turn",
        target: "YOUR_CHARACTERS",
      },
    },
  ],
};
