import type { CharacterCard } from "@tcg/lorcana-types";

export const olafHappyPassenger: CharacterCard = {
  id: "MEQ",
  canonicalId: "ci_8YL",
  reprints: ["set5-050"],
  cardType: "character",
  name: "Olaf",
  version: "Happy Passenger",
  i18n: {
    en: {
      name: "Olaf",
      version: "Happy Passenger",
      text: [
        {
          title: "CLEAR THE PATH",
          description:
            "For each exerted character opponents have in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "Evasive",
        },
      ],
    },
    de: {
      name: "Olaf",
      version: "Fröhlicher Passagier",
      text: [
        {
          title: "DEN WEG FREI RÄUMEN",
          description:
            "Für jeden gegnerischen erschöpften Charakter im Spiel, zahlst du 1 weniger, um diesen Charakter auszuspielen. Wendig",
        },
      ],
    },
    fr: {
      name: "Olaf",
      version: "Passager heureux",
      text: [
        {
          title: "DÉGAGER LE CHEMIN",
          description:
            "Jouer ce personnage vous coûte 1 de moins par personnage adverse épuisé. Insaisissable",
        },
      ],
    },
    it: {
      name: "Olaf",
      version: "Passeggero Felice",
      text: [
        {
          title: "SPIANARE LA STRADA",
          description:
            "Per ogni personaggio impegnato che gli avversari hanno in gioco, paga 1 in meno per giocare questo personaggio. Sfuggente",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 50,
  rarity: "rare",
  cost: 9,
  strength: 6,
  willpower: 6,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_19b1f802f23a4673aac60e04df0fb2ba",
    tcgPlayer: 561994,
  },
  text: [
    {
      title: "CLEAR THE PATH",
      description:
        "For each exerted character opponents have in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "Evasive",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "trf-1",
      text: "CLEAR THE PATH For each exerted character opponents have in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
    {
      id: "trf-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
  ],
};
