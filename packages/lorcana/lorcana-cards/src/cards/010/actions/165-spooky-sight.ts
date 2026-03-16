import type { ActionCard } from "@tcg/lorcana-types";

export const spookySight: ActionCard = {
  id: "b2t",
  canonicalId: "ci_5Hw",
  reprints: ["set10-165"],
  cardType: "action",
  name: "Spooky Sight",
  i18n: {
    en: {
      name: "Spooky Sight",
      text: "Put all characters with cost 3 or less into their players' inkwells facedown and exerted.",
    },
    de: {
      name: "Schauriger Anblick",
      text: "Lege alle Charaktere mit Kosten von 3 oder weniger verdeckt und erschöpft in die zugehörigen Tintenvorräte.",
    },
    fr: {
      name: "Apparition effrayante",
      text: "Placez tous les personnages coûtant 3 ou moins dans la réserve d'encre de leur propriétaire, face cachée et épuisés.",
    },
    it: {
      name: "Visione Inquietante",
      text: "Aggiungi tutti i personaggi con costo 3 o inferiore ai calamai dei loro giocatori, a faccia in giù e impegnati.",
    },
  },
  inkType: ["sapphire"],
  set: "010",
  cardNumber: 165,
  rarity: "rare",
  cost: 6,
  inkable: false,
  externalIds: {
    lorcast: "crd_9a1fff8a9426484ebc7fae9cb8605572",
    tcgPlayer: 660011,
  },
  text: "Put all characters with cost 3 or less into their players' inkwells facedown and exerted.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "put-into-inkwell",
        source: "chosen-character",
        target: {
          selector: "all",
          count: "all",
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "cost-comparison",
              comparison: "less-or-equal",
              value: 3,
            },
          ],
        },
        facedown: true,
        exerted: true,
      },
    },
  ],
};
