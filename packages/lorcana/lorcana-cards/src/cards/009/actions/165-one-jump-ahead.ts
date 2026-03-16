import type { ActionCard } from "@tcg/lorcana-types";

export const oneJumpAhead: ActionCard = {
  id: "GXc",
  canonicalId: "ci_0Iz",
  reprints: ["set1-164", "set9-165"],
  cardType: "action",
  name: "One Jump Ahead",
  i18n: {
    en: {
      name: "One Jump Ahead",
      text: "Put the top card of your deck into your inkwell facedown and exerted.",
    },
    de: {
      name: "Schnell weg!",
      text: "Lege die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat.",
    },
    fr: {
      name: "JE VOLE",
      text: "Placez la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "One Jump Ahead",
      text: "Put the top card of your deck into your inkwell facedown and exerted.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Aladdin",
  set: "009",
  cardNumber: 165,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5bc8b5538ba94d59979d7ebb574c0bd2",
    tcgPlayer: 650099,
  },
  text: "Put the top card of your deck into your inkwell facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "put-into-inkwell",
        source: "top-of-deck",
        facedown: true,
        exerted: true,
      },
    },
  ],
};
