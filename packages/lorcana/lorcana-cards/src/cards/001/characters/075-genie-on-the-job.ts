import type { CharacterCard } from "@tcg/lorcana-types";

export const genieOnTheJob: CharacterCard = {
  id: "Y8v",
  canonicalId: "ci_1oW",
  reprints: ["set1-075"],
  cardType: "character",
  name: "Genie",
  version: "On the Job",
  i18n: {
    en: {
      name: "Genie",
      version: "On the Job",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "DISAPPEAR",
          description:
            "When you play this character, you may return chosen character to their player's hand.",
        },
      ],
    },
    de: {
      name: "Dschinni",
      version: "Bei der Arbeit",
      text: "Wendig VERSCHWINDEN Wenn du diesen Charakter ausspielst, darfst du einen Charakter deiner Wahl zurück auf die zugehörige Hand schicken.",
    },
    fr: {
      name: "GÉNIE",
      version: "Fait le show",
      text: "Insaisissable TU DISPARAIS Lorsque vous jouez ce personnage, choisissez un personnage et renvoyez-le dans la main de son propriétaire.",
    },
    it: {
      name: "Genie",
      version: "On the Job",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) DISAPPEAR When you play this character, you may return chosen character to their player's hand.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 75,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_ae7e91462bfc4861bbf97e99ed53a1c1",
    tcgPlayer: 510155,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "DISAPPEAR",
      description:
        "When you play this character, you may return chosen character to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "n53-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "n53-2",
      name: "DISAPPEAR",
      text: "DISAPPEAR When you play this character, you may return chosen character to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
