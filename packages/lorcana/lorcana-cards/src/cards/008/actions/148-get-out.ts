import type { ActionCard } from "@tcg/lorcana-types";

export const getOut: ActionCard = {
  id: "FWW",
  canonicalId: "ci_FWW",
  reprints: ["set8-148"],
  cardType: "action",
  name: "Get Out!",
  i18n: {
    en: {
      name: "Get Out!",
      text: "Banish chosen character, then return an item card from your discard to your hand.",
    },
    de: {
      name: "Verschwinde hier!",
      text: "Verbanne einen Charakter deiner Wahl. Nimm 1 Gegenstandskarte aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "Allez-vous-en !",
      text: "Choisissez un personnage et bannissez-le, puis renvoyez dans votre main une carte Objet de votre défausse.",
    },
    it: {
      name: "Vattene!",
      text: "Esilia un personaggio a tua scelta, poi riprendi in mano una carta oggetto dai tuoi scarti.",
    },
  },
  inkType: ["ruby", "sapphire"],
  franchise: "Beauty and the Beast",
  set: "008",
  cardNumber: 148,
  rarity: "uncommon",
  cost: 6,
  inkable: false,
  externalIds: {
    lorcast: "crd_f0f2c6f11556497abc5ada3ae5fabe5c",
    tcgPlayer: 631448,
  },
  text: "Banish chosen character, then return an item card from your discard to your hand.",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "banish",
          },
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["discard"],
              cardTypes: ["item"],
            },
            type: "return-to-hand",
          },
        ],
        type: "sequence",
      },
      id: "rmf-1",
      text: "Banish chosen character, then return an item card from your discard to your hand.",
      type: "action",
    },
  ],
};
