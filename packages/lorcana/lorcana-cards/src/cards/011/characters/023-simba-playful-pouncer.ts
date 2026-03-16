import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaPlayfulPouncer: CharacterCard = {
  id: "ymd",
  canonicalId: "ci_ymd",
  reprints: ["set11-023"],
  cardType: "character",
  name: "Simba",
  version: "Playful Pouncer",
  i18n: {
    en: {
      name: "Simba",
      version: "Playful Pouncer",
      text: [
        {
          title: "YOU DON'T STAND A CHANCE",
          description:
            "When you play this character, chosen opposing character gets -2 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Verspielter Fänger",
      text: [
        {
          title: "DU HAST KEINE CHANCE",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -2.",
        },
      ],
    },
    fr: {
      name: "Simba",
      version: "Bondisseur espiègle",
      text: [
        {
          title: "TU N'AS AUCUNE CHANCE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -2 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Predatore Giocherellone",
      text: [
        {
          title: "NON HAI SCAMPO",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -2 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "011",
  cardNumber: 23,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9a221a16584b472c8bdec14c1b4ae5b8",
    tcgPlayer: 674317,
  },
  text: [
    {
      title: "YOU DON'T STAND A CHANCE",
      description:
        "When you play this character, chosen opposing character gets -2 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "11n-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      type: "action",
      text: "YOU DON’T STAND A CHANCE When you play this character, chosen opposing character gets -2 {} until the start of your next turn.",
    },
  ],
};
