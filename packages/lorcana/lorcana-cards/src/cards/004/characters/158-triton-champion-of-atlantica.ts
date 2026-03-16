import type { CharacterCard } from "@tcg/lorcana-types";

export const tritonChampionOfAtlantica: CharacterCard = {
  id: "0J0",
  canonicalId: "ci_0J0",
  reprints: ["set4-158"],
  cardType: "character",
  name: "Triton",
  version: "Champion of Atlantica",
  i18n: {
    en: {
      name: "Triton",
      version: "Champion of Atlantica",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "IMPOSING PRESENCE",
          description: "Opposing characters get -1 {S} for each location you have in play.",
        },
      ],
    },
    de: {
      name: "Triton",
      version: "Herrscher von Atlantica",
      text: "Gestaltwandel 6 EINDRUCKSVOLLE ERSCHEINUNG Gegnerische Charaktere erhalten -1 für jeden Ort, den du im Spiel hast.",
    },
    fr: {
      name: "Triton",
      version: "Champion d'Atlantica",
      text: "Alter 6 PRÉSENCE IMPOSANTE Les personnages adverses subissent -1 pour chaque lieu que vous avez en jeu.",
    },
    it: {
      name: "Tritone",
      version: "Campione di Atlantica",
      text: "Trasformazione 6 PRESENZA IMPONENTE I personaggi avversari ricevono -1 per ogni luogo che hai in gioco.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 158,
  rarity: "legendary",
  cost: 9,
  strength: 7,
  willpower: 9,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_9ddadbe1950b402696855e6668e5cf8f",
    tcgPlayer: 550611,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "IMPOSING PRESENCE",
      description: "Opposing characters get -1 {S} for each location you have in play.",
    },
  ],
  classifications: ["Floodborn", "King"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "1vc-1",
      keyword: "Shift",
      text: "Shift 6",
      type: "keyword",
    },
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1vc-2",
      name: "IMPOSING PRESENCE Opposing",
      text: "IMPOSING PRESENCE Opposing characters get -1 {S} for each location you have in play.",
      type: "static",
    },
  ],
};
