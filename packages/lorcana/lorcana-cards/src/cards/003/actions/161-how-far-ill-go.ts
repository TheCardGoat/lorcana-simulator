import type { ActionCard } from "@tcg/lorcana-types";

export const howFarIllGo: ActionCard = {
  id: "r73",
  canonicalId: "ci_r73",
  reprints: ["set3-161"],
  cardType: "action",
  name: "How Far I'll Go",
  i18n: {
    en: {
      name: "How Far I'll Go",
      text: "Look at the top 2 cards of your deck. Put one into your hand and the other into your inkwell facedown and exerted.",
    },
    de: {
      name: "Ich bin bereit",
      text: "Schaue dir die obersten 2 Karten deines Decks an. Nimm 1 davon auf deine Hand und lege die andere verdeckt und erschöpft in deinen Tintenvorrat.",
    },
    fr: {
      name: "Le bleu lumière",
      text: "Regardez les 2 premières cartes de votre pioche, ajoutez-en 1 à votre main et placez l'autre dans votre réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "Dov'è Che Andrò",
      text: "(Un personaggio con costo 4 o superiore può per giocare questa canzone gratis.) Guarda le prime 2 carte del tuo mazzo, aggiungine una alla tua mano e l'altra al tuo calamaio, a faccia in giù e impegnata.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "003",
  cardNumber: 161,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_b6996baaca9440328210eecc4afdc123",
    tcgPlayer: 539102,
  },
  text: "Look at the top 2 cards of your deck. Put one into your hand and the other into your inkwell facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        type: "scry",
        amount: 2,
        target: "CONTROLLER",
        destinations: [
          {
            zone: "hand",
            min: 1,
            max: 1,
          },
          {
            zone: "inkwell",
            min: 1,
            max: 1,
            exerted: true,
            facedown: true,
          },
        ],
      },
      type: "action",
    },
  ],
};
