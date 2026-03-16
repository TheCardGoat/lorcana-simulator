import type { ActionCard } from "@tcg/lorcana-types";

export const weCouldBeImmortalsEnchanted: ActionCard = {
  id: "uxV",
  canonicalId: "ci_ABG",
  reprints: ["set6-162"],
  cardType: "action",
  name: "We Could Be Immortals",
  i18n: {
    en: {
      name: "We Could Be Immortals",
      text: "Your Inventor characters gain Resist +6 this turn. Then, put this card into your inkwell facedown and exerted.",
    },
    de: {
      name: "We Could Be Immortals",
      text: "Deine Erfinder erhalten in diesem Zug Robust +6. Danach lege diese Karte verdeckt und erschöpft in deinen Tintenvorrat. (Reduziere jeglichen Schaden, der den Charakteren zugefügt wird, um 6.)",
    },
    fr: {
      name: "We Could Be Immortals",
      text: "Vos personnages Inventeur gagnent Résistance +6 pour le reste de ce tour. Ensuite, placez cette carte dans votre réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "Saremo Immortali",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) I tuoi personaggi Inventore ottengono Resistere +6 per questo turno. Poi aggiungi questa carta al tuo calamaio, a faccia in giù e impegnata.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 219,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_c75fe9ce070a454696dd8d42c6931c68",
    tcgPlayer: 592012,
  },
  text: "Your Inventor characters gain Resist +6 this turn. Then, put this card into your inkwell facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "this-turn",
            keyword: "Resist",
            target: {
              selector: "all",
              count: "all",
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-classification",
                  classification: "Inventor",
                },
              ],
            },
            type: "gain-keyword",
            value: 6,
          },
          {
            exerted: true,
            facedown: true,
            source: "this-card",
            target: "CONTROLLER",
            type: "put-into-inkwell",
          },
        ],
        type: "sequence",
      },
      id: "ulc-1",
      name: "Your Inventor",
      text: "Your Inventor characters gain Resist +6 this turn. Then, put this card into your inkwell facedown and exerted.",
      type: "action",
    },
  ],
};
