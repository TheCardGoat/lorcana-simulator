import type { ItemCard } from "@tcg/lorcana-types";

export const fishboneQuill: ItemCard = {
  id: "UUs",
  canonicalId: "ci_UUs",
  reprints: ["set1-168"],
  cardType: "item",
  name: "Fishbone Quill",
  i18n: {
    en: {
      name: "Fishbone Quill",
      text: [
        {
          title: "GO AHEAD AND SIGN",
          description: "{E} — Put any card from your hand into your inkwell facedown.",
        },
      ],
    },
    de: {
      name: "Fischgrätenfeder",
      text: [
        {
          title: "UNTERSCHREIB DIE ROLLE, LOS!",
          description: "— Lege 1 beliebige Karte aus deiner Hand verdeckt in deinen Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "PLUME EN FORME D'ARÊTE",
      text: [
        {
          title: "SIGNE!",
          description: "— Placez une carte de votre main dans votre réserve d'encre, face cachée.",
        },
      ],
    },
    it: {
      name: "Fishbone Quill",
      text: [
        {
          title: "GO AHEAD AND SIGN",
          description: "— Put any card from your hand into your inkwell facedown.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 168,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_33db0577186a4483aa85190fd0496d90",
    tcgPlayer: 508830,
  },
  text: [
    {
      title: "GO AHEAD AND SIGN",
      description: "{E} — Put any card from your hand into your inkwell facedown.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        exerted: false,
        facedown: true,
        source: "hand",
        target: "CONTROLLER",
        type: "put-into-inkwell",
      },
      id: "k4a-1",
      text: "**GO AHEAD AND SIGN** {E} − Put any card from your hand into your inkwell facedown.",
      type: "activated",
    },
  ],
};
