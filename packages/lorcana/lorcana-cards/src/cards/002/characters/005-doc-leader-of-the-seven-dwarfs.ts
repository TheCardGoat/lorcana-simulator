import type { CharacterCard } from "@tcg/lorcana-types";

export const docLeaderOfTheSevenDwarfs: CharacterCard = {
  id: "bgG",
  canonicalId: "ci_bgG",
  reprints: ["set2-005"],
  cardType: "character",
  name: "Doc",
  version: "Leader of the Seven Dwarfs",
  i18n: {
    en: {
      name: "Doc",
      version: "Leader of the Seven Dwarfs",
      text: [
        {
          title: "SHARE AND SHARE ALIKE",
          description:
            "Whenever this character quests, you pay 1 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Chef",
      version: "Anführer der Sieben Zwerge",
      text: [
        {
          title: "MITEINANDER TEILEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 1 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Prof",
      version: "Chef des Sept Nains",
      text: [
        {
          title: "À CHACUN SA PART",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, le prochain personnage que vous jouez durant ce tour vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Doc",
      version: "Leader of the Seven Dwarfs",
      text: [
        {
          title: "SHARE AND SHARE ALIKE",
          description:
            "Whenever this character quests, you pay 1 less for the next character you play this turn.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 5,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2fec41cf370c44e4a11f2024d8375c4c",
    tcgPlayer: 526602,
  },
  text: [
    {
      title: "SHARE AND SHARE ALIKE",
      description:
        "Whenever this character quests, you pay 1 {I} less for the next character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Seven Dwarfs"],
  missingTests: false,
  abilities: [
    {
      effect: {
        amount: 1,
        cardType: "character",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
