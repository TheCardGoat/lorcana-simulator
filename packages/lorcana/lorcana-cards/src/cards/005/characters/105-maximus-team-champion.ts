import type { CharacterCard } from "@tcg/lorcana-types";

export const maximusTeamChampion: CharacterCard = {
  id: "kDj",
  canonicalId: "ci_kDj",
  reprints: ["set5-105"],
  cardType: "character",
  name: "Maximus",
  version: "Team Champion",
  i18n: {
    en: {
      name: "Maximus",
      version: "Team Champion",
      text: [
        {
          title: "ROYALLY BIG REWARDS",
          description:
            "At the end of your turn, if you have any characters in play with 5 {S} or more, gain 2 lore. If you have any in play with 10 {S} or more, gain 5 lore instead.",
        },
      ],
    },
    de: {
      name: "Maximus",
      version: "Team Champion",
      text: [
        {
          title: "KÖNIGLICHE BELOHNUNGEN",
          description:
            "Am Ende deines Zuges, wenn du mindestens einen Charakter mit 5 oder mehr im Spiel hast, sammelst du 2 Legenden. Wenn er sogar 10 oder mehr hat, sammelst du stattdessen 5 Legenden.",
        },
      ],
    },
    fr: {
      name: "Maximus",
      version: "Champion de l'équipe",
      text: [
        {
          title: "UNE RÉCOMPENSE DIGNE D'UN ROI À",
          description:
            "la fin de votre tour, si l'un de vos personnages a 5 ou plus, gagnez 2 éclats de Lore. S'il a 10 ou plus, gagnez 5 éclats de Lore à la place.",
        },
      ],
    },
    it: {
      name: "Maximus",
      version: "Campione della Squadra",
      text: [
        {
          title: "RICOMPENSE DEGNE DI UN RE",
          description:
            "Alla fine del tuo turno, se hai in gioco un qualsiasi personaggio con 5 o superiore, ottieni 2 leggenda. Se hai in gioco un qualsiasi personaggio con 10 o superiore, ottieni invece 5 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "005",
  cardNumber: 105,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a583e1fe8f2144a7bbc320e966734055",
    tcgPlayer: 561961,
  },
  text: [
    {
      title: "ROYALLY BIG REWARDS",
      description:
        "At the end of your turn, if you have any characters in play with 5 {S} or more, gain 2 lore. If you have any in play with 10 {S} or more, gain 5 lore instead.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        optionLabels: [
          "if you have any characters in play with 5 {S}",
          "more, gain 2 lore. If you have any in play with 10 {S}",
          "more, gain 5 lore instead.",
        ],
        options: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            amount: 2,
            type: "gain-lore",
          },
          {
            amount: 5,
            type: "gain-lore",
          },
        ],
        type: "choice",
      },
      id: "p5e-1",
      text: "ROYALLY BIG REWARDS At the end of your turn, if you have any characters in play with 5 {S} or more, gain 2 lore. If you have any in play with 10 {S} or more, gain 5 lore instead.",
      type: "action",
    },
  ],
};
