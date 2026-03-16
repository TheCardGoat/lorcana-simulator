import type { ActionCard } from "@tcg/lorcana-types";

export const hideAway: ActionCard = {
  id: "QYp",
  canonicalId: "ci_QYp",
  reprints: ["set5-163"],
  cardType: "action",
  name: "Hide Away",
  i18n: {
    en: {
      name: "Hide Away",
      text: "Put chosen item or location into its player's inkwell facedown and exerted.",
    },
    de: {
      name: "Verstecken",
      text: "Lege einen Ort oder Gegenstand deiner Wahl verdeckt und erschöpft in den zugehörigen Tintenvorrat.",
    },
    fr: {
      name: "Cachez-vous",
      text: "Choisissez un objet ou un lieu et placez-le dans la réserve d'encre de son propriétaire, face cachée et épuisé.",
    },
    it: {
      name: "Nascondere",
      text: "Aggiungi un oggetto o un luogo a tua scelta al calamaio del suo giocatore, a faccia in giù e impegnato.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleeping Beauty",
  set: "005",
  cardNumber: 163,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_46aa903866b2477f8601a1cb5a8f56b9",
    tcgPlayer: 561653,
  },
  text: "Put chosen item or location into its player's inkwell facedown and exerted.",
  abilities: [
    {
      type: "action",
      text: "Put chosen item or location into its player's inkwell facedown and exerted.",
      effect: {
        type: "put-into-inkwell",
        source: "chosen-card-in-play",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["item", "location"],
        },
        facedown: true,
        exerted: true,
      },
    },
  ],
};
