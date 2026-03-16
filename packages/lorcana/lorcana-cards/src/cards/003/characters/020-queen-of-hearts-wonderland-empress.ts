import type { CharacterCard } from "@tcg/lorcana-types";

export const queenOfHeartsWonderlandEmpress: CharacterCard = {
  id: "VAS",
  canonicalId: "ci_0HZ",
  reprints: ["set3-020", "set9-023"],
  cardType: "character",
  name: "Queen of Hearts",
  version: "Wonderland Empress",
  i18n: {
    en: {
      name: "Queen of Hearts",
      version: "Wonderland Empress",
      text: [
        {
          title: "ALL WAYS HERE ARE MY WAYS",
          description:
            "Whenever this character quests, your other Villain characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Die Herzkönigin",
      version: "Kaiserliche Majestät des Wunderlands",
      text: [
        {
          title: "ALLE WEGE HIER SIND MEINE WEGE",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhalten deine anderen Schurkinnen und Schurken in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "La Reine de Cœur",
      version: "Impératrice du Pays des Merveilles",
      text: [
        {
          title: "TOUS LES MOYENS SONT À MOI",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vos autres personnages Méchant gagnent +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "La Regina di Cuori",
      version: "Imperatrice del Paese delle Meraviglie",
      text: [
        {
          title: "TUTTE LE STRADE QUI SONO MIE",
          description:
            "Ogni volta che questo personaggio va all'avventura, i tuoi altri personaggi Cattivo ricevono +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Alice in Wonderland",
  set: "003",
  cardNumber: 20,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8da184a94db34eee8c9b4cc378a58d11",
    tcgPlayer: 649971,
  },
  text: [
    {
      title: "ALL WAYS HERE ARE MY WAYS",
      description:
        "Whenever this character quests, your other Villain characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Queen"],
  missingTests: true,
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1gh-1",
      name: "ALL WAYS HERE ARE MY WAYS",
      text: "ALL WAYS HERE ARE MY WAYS Whenever this character quests, your other Villain characters get +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
