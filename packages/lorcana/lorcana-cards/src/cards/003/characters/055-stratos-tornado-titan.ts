import type { CharacterCard } from "@tcg/lorcana-types";

export const stratosTornadoTitan: CharacterCard = {
  id: "NxG",
  canonicalId: "ci_NxG",
  reprints: ["set3-055"],
  cardType: "character",
  name: "Stratos",
  version: "Tornado Titan",
  i18n: {
    en: {
      name: "Stratos",
      version: "Tornado Titan",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "CYCLONE",
          description: "{E} — Gain lore equal to the number of Titan characters you have in play.",
        },
      ],
    },
    de: {
      name: "Orkanos",
      version: "Tornado Titan",
      text: "Wendig WIRBELSTURM — Sammle so viele Legenden, wie die Anzahl deiner Titanen im Spiel beträgt.",
    },
    fr: {
      name: "Stratos",
      version: "Titan du vent",
      text: "Insaisissable CYCLONE — Gagnez un nombre d'éclats de Lore égal au nombre de personnages Titan que vous avez en jeu.",
    },
    it: {
      name: "Stratos",
      version: "Titano del Tornado",
      text: "Sfuggente CICLONE — Ottieni leggenda pari al numero di personaggi Titano che hai in gioco.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 55,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_a3263d84bb5645f3974b837b717d50f5",
    tcgPlayer: 539075,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "CYCLONE",
      description: "{E} — Gain lore equal to the number of Titan characters you have in play.",
    },
  ],
  classifications: ["Storyborn", "Titan"],
  missingImplementation: true,
  missingTests: true,
  abilities: [],
};
