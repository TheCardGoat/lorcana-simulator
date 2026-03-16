import type { CharacterCard } from "@tcg/lorcana-types";

export const auroraHoldingCourt: CharacterCard = {
  id: "udr",
  canonicalId: "ci_qjl",
  reprints: ["set9-006"],
  cardType: "character",
  name: "Aurora",
  version: "Holding Court",
  i18n: {
    en: {
      name: "Aurora",
      version: "Holding Court",
      text: [
        {
          title: "ROYAL WELCOME",
          description:
            "Whenever this character quests, you pay 1 {I} less for the next Princess or Queen character you play this turn.",
        },
      ],
    },
    de: {
      name: "Aurora",
      version: "Hält Hof",
      text: [
        {
          title: "KÖNIGLICHER EMPFANG",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 1 weniger für die nächste Prinzessin oder Königin, die du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Aurore",
      version: "Tient audiance",
      text: [
        {
          title: "ACCUEIL ROYAL",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, le prochain personnage Reine ou Princesse que vous jouez ce tour-ci vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Aurora",
      version: "In Ricevimento a Corte",
      text: [
        {
          title: "BENVENUTO REALE",
          description:
            "Ogni volta che questo personaggio va all'avventura, paga 1 in meno per giocare il tuo prossimo personaggio Principessa o Regina per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Sleeping Beauty",
  set: "009",
  cardNumber: 6,
  rarity: "uncommon",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d292fcaa144d4f739bda2c14948da2ce",
    tcgPlayer: 650142,
  },
  text: [
    {
      title: "ROYAL WELCOME",
      description:
        "Whenever this character quests, you pay 1 {I} less for the next Princess or Queen character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1dm-1",
      name: "ROYAL WELCOME",
      text: "ROYAL WELCOME Whenever this character quests, you pay 1 {I} less for the next Princess or Queen character you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
