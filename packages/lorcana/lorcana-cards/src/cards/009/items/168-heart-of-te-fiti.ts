import type { ItemCard } from "@tcg/lorcana-types";

export const heartOfTeFiti: ItemCard = {
  id: "u0k",
  canonicalId: "ci_bK7",
  reprints: ["set3-164", "set9-168"],
  cardType: "item",
  name: "Heart of Te Fiti",
  i18n: {
    en: {
      name: "Heart of Te Fiti",
      text: [
        {
          title: "CREATE LIFE",
          description:
            "{E}, 2 {I} — Put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Herz von Te Fiti",
      text: [
        {
          title: "LEBEN ERSCHAFFEN, 2",
          description:
            "— Lege die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Le cœur de Te Fiti",
      text: [
        {
          title: "ENGENDRER LA VIE, 2",
          description:
            "— Placez la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Cuore di Te Fiti",
      text: [
        {
          title: "CREARE LA VITA, 2",
          description:
            "— Aggiungi la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "009",
  cardNumber: 168,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_81cea9b9222c496a8de13d5eb3215ab2",
    tcgPlayer: 650102,
  },
  text: [
    {
      title: "CREATE LIFE",
      description:
        "{E}, 2 {I} — Put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        exerted: true,
        facedown: true,
        source: "top-of-deck",
        target: "CONTROLLER",
        type: "put-into-inkwell",
      },
      id: "1vi-1",
      name: "CREATE LIFE",
      text: "CREATE LIFE {E}, 2 {I} — Put the top card of your deck into your inkwell facedown and exerted.",
      type: "activated",
    },
  ],
};
