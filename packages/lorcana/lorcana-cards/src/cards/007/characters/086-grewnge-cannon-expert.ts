import type { CharacterCard } from "@tcg/lorcana-types";

export const grewngeCannonExpert: CharacterCard = {
  id: "QhC",
  canonicalId: "ci_QhC",
  reprints: ["set7-086"],
  cardType: "character",
  name: "Grewnge",
  version: "Cannon Expert",
  i18n: {
    en: {
      name: "Grewnge",
      version: "Cannon Expert",
      text: [
        {
          title: "RAPID FIRE",
          description:
            "Whenever this character quests, you pay 1 {I} less for the next action you play this turn.",
        },
      ],
    },
    de: {
      name: "Grewnge",
      version: "Kanonenspezialist",
      text: [
        {
          title: "SCHNELLFEUER",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 1 weniger für die nächste Aktion, die du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Grewnge",
      version: "Expert en canon",
      text: [
        {
          title: "FEU NOURRI",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, la prochaine action que vous jouez ce tour-ci vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Grewnge",
      version: "Esperto di Cannoni",
      text: [
        {
          title: "FUOCO RAPIDO",
          description:
            "Ogni volta che questo personaggio va all'avventura, paga 1 in meno per giocare la tua prossima azione per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Treasure Planet",
  set: "007",
  cardNumber: 86,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_95d2688246294e40900308cbc135856b",
    tcgPlayer: 618259,
  },
  text: [
    {
      title: "RAPID FIRE",
      description:
        "Whenever this character quests, you pay 1 {I} less for the next action you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "15e-1",
      name: "RAPID FIRE",
      text: "RAPID FIRE Whenever this character quests, you pay 1 {I} less for the next action you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
