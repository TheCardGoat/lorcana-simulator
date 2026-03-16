import type { ActionCard } from "@tcg/lorcana-types";

export const intoTheUnknown: ActionCard = {
  id: "8Sv",
  canonicalId: "ci_TcE",
  reprints: ["set8-081"],
  cardType: "action",
  name: "Into the Unknown",
  i18n: {
    en: {
      name: "Into the Unknown",
      text: "Put chosen exerted character into their player's inkwell facedown and exerted.",
    },
    de: {
      name: "Wo noch niemand war",
      text: "Lege einen erschöpften Charakter deiner Wahl verdeckt und erschöpft in den zugehörigen Tintenvorrat.",
    },
    fr: {
      name: "Dans un autre monde",
      text: "Choisissez un personnage épuisé et placez-le dans la réserve d'encre de son propriétaire, face cachée et épuisé.",
    },
    it: {
      name: "Quello Che non So",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Aggiungi un personaggio impegnato a tua scelta al calamaio del suo giocatore, a faccia in giù e impegnato.",
    },
  },
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 81,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_1f6ec070467643d195c82c92cf93c955",
    tcgPlayer: 632720,
  },
  text: "Put chosen exerted character into their player's inkwell facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      id: "8Sv-1",
      text: "Put chosen exerted character into their player's inkwell facedown and exerted.",
      effect: {
        exerted: true,
        facedown: true,
        source: "chosen-character",
        target: "CHOSEN_CHARACTER",
        filter: [
          {
            type: "exerted",
          },
        ],
        type: "put-into-inkwell",
      },
      type: "action",
    },
  ],
};
