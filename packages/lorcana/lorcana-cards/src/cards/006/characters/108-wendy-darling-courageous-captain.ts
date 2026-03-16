import type { CharacterCard } from "@tcg/lorcana-types";

export const wendyDarlingCourageousCaptain: CharacterCard = {
  id: "AYJ",
  canonicalId: "ci_AYJ",
  reprints: ["set6-108"],
  cardType: "character",
  name: "Wendy Darling",
  version: "Courageous Captain",
  i18n: {
    en: {
      name: "Wendy Darling",
      version: "Courageous Captain",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "LOOK LIVELY, CREW!",
          description:
            "While you have another Pirate character in play, this character gets +1 {S} and +1 {L}.",
        },
      ],
    },
    de: {
      name: "Wendy Darling",
      version: "Mutige Kapitänin",
      text: "Wendig MACHT SCHNELL, LEUTE! Solange du mindestens einen weiteren Piraten im Spiel hast, erhält dieser Charakter +1 und +1.",
    },
    fr: {
      name: "Wendy Darling",
      version: "Capitaine courageuse",
      text: "Insaisissable BOUGEZ-VOUS, MOUSSAILLONS! Tant que vous avez un autre personnage Pirate en jeu, ce personnage-ci gagne +1 et +1.",
    },
    it: {
      name: "Wendy Darling",
      version: "Capitana Coraggiosa",
      text: "Sfuggente DATEVI UNA MOSSA, CIURMA! Mentre hai in gioco un altro personaggio Pirata, questo personaggio riceve +1 e +1.",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 108,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_f0088a27ad794105a7a6858c5f32e3a8",
    tcgPlayer: 582540,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "LOOK LIVELY, CREW!",
      description:
        "While you have another Pirate character in play, this character gets +1 {S} and +1 {L}.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Pirate", "Captain"],
  abilities: [
    {
      id: "1dv-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1dv-2",
      text: "LOOK LIVELY, CREW! While you have another Pirate character in play, this character gets +1 {S} and +1 {L}.",
      type: "action",
    },
  ],
};
