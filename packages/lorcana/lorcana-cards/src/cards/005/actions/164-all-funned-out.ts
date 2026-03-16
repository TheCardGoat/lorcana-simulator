import type { ActionCard } from "@tcg/lorcana-types";

export const allFunnedOut: ActionCard = {
  id: "uyQ",
  canonicalId: "ci_uyQ",
  reprints: ["set5-164"],
  cardType: "action",
  name: "All Funned Out",
  i18n: {
    en: {
      name: "All Funned Out",
      text: "Put chosen character of yours into your inkwell facedown and exerted.",
    },
    de: {
      name: "Ich würd' jetzt am liebsten aussteigen",
      text: "Wähle einen deiner Charaktere und lege ihn verdeckt und erschöpft in deinen Tintenvorrat.",
    },
    fr: {
      name: "Je ne m'amuse plus du tout",
      text: "Choisissez l'un de vos personnages et placez-le dans votre réserve d'encre, face cachée et épuisé.",
    },
    it: {
      name: "Mi Sto Divertendo Anche Troppo",
      text: "Aggiungi un tuo personaggio a tua scelta al tuo calamaio, a faccia in giù e impegnato.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 164,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_22015e39f7a8462688822b423e11f891",
    tcgPlayer: 561971,
  },
  text: "Put chosen character of yours into your inkwell facedown and exerted.",
  abilities: [
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "chosen-card-in-play",
        target: {
          selector: "chosen",
          count: 1,
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
        },
        type: "put-into-inkwell",
      },
      id: "1mz-1",
      text: "Put chosen character of yours into your inkwell facedown and exerted.",
      type: "action",
    },
  ],
};
