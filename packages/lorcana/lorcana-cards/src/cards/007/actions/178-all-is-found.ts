import type { ActionCard } from "@tcg/lorcana-types";

export const allIsFound: ActionCard = {
  id: "OTu",
  canonicalId: "ci_Qon",
  reprints: ["set7-178"],
  cardType: "action",
  name: "All Is Found",
  i18n: {
    en: {
      name: "All Is Found",
      text: "Put up to 2 cards from your discard into your inkwell, facedown and exerted.",
    },
    de: {
      name: "Es kommt zu dir",
      text: "Lege bis zu 2 Karten aus deinem Ablagestapel verdeckt und erschöpft in deinen Tintenvorrat.",
    },
    fr: {
      name: "La berceuse d'Ahtohallan",
      text: "Placez jusqu'à 2 cartes de votre défausse dans votre réserve d'encre, face cachée et épuisées.",
    },
    it: {
      name: "Un Rifugio Ha Trovato",
      text: "(Un personaggio con costo 5 o superiore può per cantare questa canzone gratis.) Aggiungi fino a 2 carte dai tuoi scarti al tuo calamaio, a faccia in giù e impegnate.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 178,
  rarity: "rare",
  cost: 5,
  inkable: true,
  externalIds: {
    lorcast: "crd_0fa2b60dcf3d46fbb5e61428e33d7d7d",
    tcgPlayer: 619748,
  },
  text: "Put up to 2 cards from your discard into your inkwell, facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "discard",
        target: {
          selector: "chosen",
          count: {
            upTo: 2,
          },
          owner: "you",
          zones: ["discard"],
        },
        type: "put-into-inkwell",
      },
      id: "138-1",
      text: "Put up to 2 cards from your discard into your inkwell, facedown and exerted.",
      type: "action",
    },
  ],
};
