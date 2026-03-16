import type { CharacterCard } from "@tcg/lorcana-types";

export const copperChampionOfTheForest: CharacterCard = {
  id: "dzM",
  canonicalId: "ci_dzM",
  reprints: ["set11-084"],
  cardType: "character",
  name: "Copper",
  version: "Champion of the Forest",
  i18n: {
    en: {
      name: "Copper",
      version: "Champion of the Forest",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "MORE TO EXPLORE",
          description:
            "Whenever this character quests, your characters with Evasive get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Capper",
      version: "Held des Waldes",
      text: "Gestaltwandel 3 MEHR ZU ERFORSCHEN Jedes Mal, wenn dieser Charakter erkundet, erhalten deine Charaktere mit Wendig in diesem Zug +1.",
    },
    fr: {
      name: "Rouky",
      version: "Champion de la forêt",
      text: "Alter 3 DAVANTAGE À EXPLORER Chaque fois que ce personnage est envoyé à l'aventure, vos personnages avec Insaisissable gagnent +1 pour le reste de ce tour.",
    },
    it: {
      name: "Toby",
      version: "Campione del Bosco",
      text: "Trasformazione 3 PIÙ COSE DA ESPLORARE Ogni volta che questo personaggio va all'avventura, i tuoi personaggi con Sfuggente ricevono +1 per questo turno.",
    },
  },
  inkType: ["emerald"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 84,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1828e2a9c3c547abbcd95f8c4fdc211f",
    tcgPlayer: 676202,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "MORE TO EXPLORE",
      description:
        "Whenever this character quests, your characters with Evasive get +1 {L} this turn.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "11t-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3 {I}",
    },
    {
      id: "11t-2",
      effect: {
        modifier: 1,
        stat: "lore",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
        duration: "this-turn",
      },
      name: "MORE TO EXPLORE",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "MORE TO EXPLORE Whenever this character quests, your characters with Evasive get +1 {L} this turn.",
    },
  ],
};
