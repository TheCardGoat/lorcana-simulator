import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaSelftaughtSailor: CharacterCard = {
  id: "DbC",
  canonicalId: "ci_DbC",
  reprints: ["set6-117"],
  cardType: "character",
  name: "Moana",
  version: "Self-Taught Sailor",
  i18n: {
    en: {
      name: "Moana",
      version: "Self-Taught Sailor",
      text: [
        {
          title: "LEARNING THE ROPES",
          description:
            "This character can't challenge unless you have a Captain character in play.",
        },
      ],
    },
    de: {
      name: "Vaiana",
      version: "Autodidaktische Seglerin",
      text: [
        {
          title: "ARBEITET SICH EIN",
          description:
            "Dieser Charakter kann nicht herausfordern, außer du hast mindestens einen Kapitän im Spiel.",
        },
      ],
    },
    fr: {
      name: "Vaiana",
      version: "Navigatrice autodidacte",
      text: [
        {
          title: "APPRENDRE LES FICELLES DU MÉTIER",
          description:
            "Ce personnage ne peut pas défier à moins que vous n'ayez un personnage Capitaine en jeu.",
        },
      ],
    },
    it: {
      name: "Vaiana",
      version: "Marinaia Autodidatta",
      text: [
        {
          title: "IMPARARE LE BASI",
          description:
            "Questo personaggio non può sfidare a meno che tu non abbia in gioco un personaggio Capitano.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 117,
  rarity: "common",
  cost: 1,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_772912bd2bb0469890adfcc1b3eedd61",
    tcgPlayer: 591990,
  },
  text: [
    {
      title: "LEARNING THE ROPES",
      description: "This character can't challenge unless you have a Captain character in play.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess", "Pirate"],
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "13o-1",
      name: "LEARNING THE ROPES",
      text: "LEARNING THE ROPES This character can't challenge unless you have a Captain character in play.",
      type: "static",
    },
  ],
};
