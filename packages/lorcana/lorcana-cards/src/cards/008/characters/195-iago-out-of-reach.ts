import type { CharacterCard } from "@tcg/lorcana-types";

export const iagoOutOfReach: CharacterCard = {
  id: "d1f",
  canonicalId: "ci_d1f",
  reprints: ["set8-195"],
  cardType: "character",
  name: "Iago",
  version: "Out of Reach",
  i18n: {
    en: {
      name: "Iago",
      version: "Out of Reach",
      text: [
        {
          title: "SELF-PRESERVATION",
          description:
            "While you have another exerted character in play, this character can't be challenged.",
        },
      ],
    },
    de: {
      name: "Iago",
      version: "Out of Reach",
      text: [
        {
          title: "SELF-PRESERVATION",
          description:
            "While you have another exerted character in play, this character can't be challenged.",
        },
      ],
    },
    fr: {
      name: "Iago",
      version: "Out of Reach",
      text: [
        {
          title: "SELF-PRESERVATION",
          description:
            "While you have another exerted character in play, this character can't be challenged.",
        },
      ],
    },
    it: {
      name: "Iago",
      version: "Out of Reach",
      text: [
        {
          title: "SELF-PRESERVATION",
          description:
            "While you have another exerted character in play, this character can't be challenged.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 195,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_14cf336ace334aa4bb012d3a932242bf",
    tcgPlayer: 631480,
  },
  text: [
    {
      title: "SELF-PRESERVATION",
      description:
        "While you have another exerted character in play, this character can't be challenged.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "9cu-1",
      text: "SELF-PRESERVATION While you have another exerted character in play, this character can't be challenged.",
      type: "action",
    },
  ],
};
