import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaConcernedSisterEpic: CharacterCard = {
  id: "x57",
  canonicalId: "ci_YF2",
  reprints: ["set11-125"],
  cardType: "character",
  name: "Elsa",
  version: "Concerned Sister",
  i18n: {
    en: {
      name: "Elsa",
      version: "Concerned Sister",
      text: [
        {
          title: "CLEAR THE WAY",
          description:
            "When you play this character, you pay 2 {I} less for the next location you play this turn.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Besorgte Schwester",
      text: [
        {
          title: "MACHT DEN WEG FREI",
          description:
            "Wenn du diesen Charakter ausspielst, zahlst du 2 weniger für den nächsten Ort, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Elsa",
      version: "Sœur soucieuse",
      text: [
        {
          title: "OUVRIR LA VOIE",
          description:
            "Lorsque vous jouez ce personnage, le prochain lieu que vous jouez ce tour-ci vous coûte 2 de moins.",
        },
      ],
    },
    it: {
      name: "Elsa",
      version: "Sorella Preoccupata",
      text: [
        {
          title: "APRIRE LA STRADA",
          description:
            "Quando giochi questo personaggio, paga 2 in meno per giocare il tuo prossimo luogo per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 215,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d66016477d454f19abf12684a50221ef",
    tcgPlayer: 677150,
  },
  text: [
    {
      title: "CLEAR THE WAY",
      description:
        "When you play this character, you pay 2 {I} less for the next location you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "1tp-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      name: "CLEAR THE WAY",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CLEAR THE WAY When you play this character, you pay 2 {I} less for the next location you play this turn.",
    },
  ],
};
