import type { ItemCard } from "@tcg/lorcana-types";

export const greatStoneDragon: ItemCard = {
  id: "BvX",
  canonicalId: "ci_BvX",
  reprints: ["set4-167"],
  cardType: "item",
  name: "Great Stone Dragon",
  i18n: {
    en: {
      name: "Great Stone Dragon",
      text: [
        {
          title: "ASLEEP",
          description: "This item enters play exerted.",
        },
        {
          title: "AWAKEN",
          description:
            "{E} — Put a character card from your discard into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Großer Stein-Drache",
      text: [
        {
          title: "SCHLAFEND",
          description:
            "Dieser Gegenstand kommt erschöpft ins Spiel. ERWECKEN — Lege 1 Charakterkarte aus deinem Ablagestapel verdeckt und erschöpft in deinen Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Grand Dragon de Pierre",
      text: [
        {
          title: "ENDORMI",
          description:
            "Cet objet entre en jeu épuisé. RÉVEILLÉ — Choisissez une carte Personnage de votre défausse et placez-la dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Grande Drago di Pietra",
      text: [
        {
          title: "DORMIENTE",
          description:
            "Questo oggetto entra in gioco impegnato. RIDESTARSI — Aggiungi una carta personaggio dai tuoi scarti al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 167,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_11587e02677148c28e30eeaa164a2569",
    tcgPlayer: 549341,
  },
  text: [
    {
      title: "ASLEEP",
      description: "This item enters play exerted.",
    },
    {
      title: "AWAKEN",
      description:
        "{E} — Put a character card from your discard into your inkwell facedown and exerted.",
    },
  ],
  abilities: [
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "19h-1",
      name: "ASLEEP",
      text: "ASLEEP This item enters play exerted.",
      type: "static",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        exerted: true,
        facedown: true,
        source: {
          selector: "chosen",
          count: 1,
          owner: "you",
          zones: ["discard"],
          cardTypes: ["character"],
        },
        target: "CONTROLLER",
        type: "put-into-inkwell",
      },
      id: "19h-2",
      name: "AWAKEN",
      text: "AWAKEN {E} — Put a character card from your discard into your inkwell facedown and exerted.",
      type: "activated",
    },
  ],
};
