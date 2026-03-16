import type { CharacterCard } from "@tcg/lorcana-types";

export const pachaEmperorsGuide: CharacterCard = {
  id: "sLG",
  canonicalId: "ci_sLG",
  reprints: ["set5-143"],
  cardType: "character",
  name: "Pacha",
  version: "Emperor's Guide",
  i18n: {
    en: {
      name: "Pacha",
      version: "Emperor's Guide",
      text: [
        {
          title: "HELPFUL SUPPLIES",
          description: "At the start of your turn, if you have an item in play, gain 1 lore.",
        },
        {
          title: "PERFECT DIRECTIONS",
          description: "At the start of your turn, if you have a location in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Patcha",
      version: "Reiseführer des Königs",
      text: [
        {
          title: "NÜTZLICHE HINWEISE",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Gegenstand im Spiel hast, sammelst du 1 Legende.",
        },
        {
          title: "PERFEKTE WEGBESCHREIBUNG",
          description:
            "Zu Beginn deines Zuges, wenn du mindestens einen Ort im Spiel hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Pacha",
      version: "Guide de l'Empereur",
      text: [
        {
          title: "MATÉRIEL PRATIQUE",
          description:
            "Au début de votre tour, si vous avez un objet en jeu, gagnez 1 éclat de Lore.",
        },
        {
          title: "INDICATIONS PARFAITES",
          description:
            "Au début de votre tour, si vous avez un lieu en jeu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Pacha",
      version: "Guida dell'Imperatore",
      text: [
        {
          title: "UTILI PROVVISTE",
          description: "All'inizio del tuo turno, se hai in gioco un oggetto, ottieni 1 leggenda.",
        },
        {
          title: "INDICAZIONI IMPECCABILI",
          description: "All'inizio del tuo turno, se hai in gioco un luogo, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 143,
  rarity: "uncommon",
  cost: 3,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_761315af205f480fae3ecf8c5018db46",
    tcgPlayer: 561471,
  },
  text: [
    {
      title: "HELPFUL SUPPLIES",
      description: "At the start of your turn, if you have an item in play, gain 1 lore.",
    },
    {
      title: "PERFECT DIRECTIONS",
      description: "At the start of your turn, if you have a location in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "jdl-1",
      text: "HELPFUL SUPPLIES At the start of your turn, if you have an item in play, gain 1 lore.",
      name: "HELPFUL SUPPLIES",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      condition: {
        comparison: "greater-or-equal",
        controller: "you",
        count: 1,
        type: "has-item-count",
      },
    },
    {
      id: "jdl-2",
      text: "PERFECT DIRECTIONS At the start of your turn, if you have a location in play, gain 1 lore.",
      name: "PERFECT DIRECTIONS",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      condition: {
        comparison: "greater-or-equal",
        controller: "you",
        count: 1,
        type: "has-location-count",
      },
    },
  ],
};
