import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellQueenOfTheAzuriteFairies: CharacterCard = {
  id: "yE4",
  canonicalId: "ci_yE4",
  reprints: ["set6-048"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Queen of the Azurite Fairies",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Queen of the Azurite Fairies",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "Evasive",
        },
        {
          title: "SHINING EXAMPLE",
          description:
            "Whenever this character quests, your other Fairy characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Königin der Azurblauen Feen",
      text: "Gestaltwandel 5 Wendig GLÄNZENDES BEISPIEL Jedes Mal, wenn dieser Charakter erkundet, erhalten deine anderen Feen in diesem Zug +1.",
    },
    fr: {
      name: "La Fée Clochette",
      version: "Reine des fées d’Azurite",
      text: "Alter 5 Insaisissable MODÈLE RAYONNANT Chaque fois que ce personnage est envoyé à l'aventure, vos autres personnages Fée gagnent +1 pour le reste de ce tour.",
    },
    it: {
      name: "Trilli",
      version: "Regina delle Fate di Azzurrite",
      text: "Trasformazione 5 Sfuggente FULGIDO ESEMPIO Ogni volta che questo personaggio va all'avventura, i tuoi altri personaggi Fata ricevono +1 per questo turno.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 48,
  rarity: "uncommon",
  cost: 7,
  strength: 5,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_99ced91e0cc94c6cb0be7bf655372dfd",
    tcgPlayer: 584614,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "Evasive",
    },
    {
      title: "SHINING EXAMPLE",
      description:
        "Whenever this character quests, your other Fairy characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Queen", "Fairy", "Captain"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "18r-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      id: "18r-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "18r-3",
      name: "SHINING EXAMPLE",
      text: "SHINING EXAMPLE Whenever this character quests, your other Fairy characters get +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
