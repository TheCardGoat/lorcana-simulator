import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinOnTheEdgeOfAdventure: CharacterCard = {
  id: "RwC",
  canonicalId: "ci_ioY",
  reprints: ["set11-081"],
  cardType: "character",
  name: "Aladdin",
  version: "On the Edge of Adventure",
  i18n: {
    en: {
      name: "Aladdin",
      version: "On the Edge of Adventure",
      text: [
        {
          title: "QUICK ON HIS FEET",
          description:
            "Whenever you play an action, this character gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Aladdin",
      version: "Am Rande des Abenteuers",
      text: [
        {
          title: "FLINK AUF DEN BEINEN",
          description:
            "Jedes Mal, wenn du eine Aktion ausspielst, erhält dieser Charakter bis zu Beginn deines nächsten Zuges Wendig.",
        },
      ],
    },
    fr: {
      name: "Aladdin",
      version: "Au seuil de l’aventure",
      text: [
        {
          title: "PRÊT À RÉAGIR",
          description:
            "Chaque fois que vous jouez une action, ce personnage gagne Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Aladdin",
      version: "Sull'Orlo dell'Avventura",
      text: [
        {
          title: "SVELTO",
          description:
            "Ogni volta che giochi un'azione, questo personaggio ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "011",
  cardNumber: 81,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_629d577b144c424286035635ec968b4a",
    tcgPlayer: 677146,
  },
  text: [
    {
      title: "QUICK ON HIS FEET",
      description:
        "Whenever you play an action, this character gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "11s-1",
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      name: "QUICK ON HIS FEET",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
      text: "QUICK ON HIS FEET Whenever you play an action, this character gains Evasive until the start of your next turn.",
    },
  ],
};
