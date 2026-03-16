import type { CharacterCard } from "@tcg/lorcana-types";

export const crikeePartOfTheTeam: CharacterCard = {
  id: "2w3",
  canonicalId: "ci_2w3",
  reprints: ["set8-131"],
  cardType: "character",
  name: "Cri-Kee",
  version: "Part of the Team",
  i18n: {
    en: {
      name: "Cri-Kee",
      version: "Part of the Team",
      text: [
        {
          title: "AT HER SIDE",
          description:
            "While you have 2 or more other exerted characters in play, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Kriki",
      version: "Teil des Teams",
      text: [
        {
          title: "AN IHRER SEITE",
          description:
            "Solange du mindestens 2 andere erschöpfte Charaktere im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Cri-Kee",
      version: "Membre de l'équipe",
      text: [
        {
          title: "À SES CÔTÉS",
          description:
            "Tant que vous avez 2 autres personnages épuisés ou plus en jeu, ce personnage-ci gagne +2.",
        },
      ],
    },
    it: {
      name: "Cri-Cri",
      version: "Parte della Squadra",
      text: [
        {
          title: "AL SUO FIANCO",
          description:
            "Mentre hai in gioco 2 o più altri personaggi impegnati, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "008",
  cardNumber: 131,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_084eb569ca02425791bf38993a74f23f",
    tcgPlayer: 631436,
  },
  text: [
    {
      title: "AT HER SIDE",
      description:
        "While you have 2 or more other exerted characters in play, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "17k-1",
      text: "AT HER SIDE While you have 2 or more other exerted characters in play, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
