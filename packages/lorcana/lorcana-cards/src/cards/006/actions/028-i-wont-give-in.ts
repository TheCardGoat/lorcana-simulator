import type { ActionCard } from "@tcg/lorcana-types";

export const iWontGiveIn: ActionCard = {
  id: "j2a",
  canonicalId: "ci_j2a",
  reprints: ["set6-028"],
  cardType: "action",
  name: "I Won't Give In",
  i18n: {
    en: {
      name: "I Won't Give In",
      text: "Return a character card with cost 2 or less from your discard to your hand.",
    },
    de: {
      name: "I Won't Give In",
      text: "Nimm eine Charakterkarte mit Kosten von 2 oder weniger aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "I Won't Give In",
      text: "Renvoyez une carte Personnage ayant un coût de 2 ou moins de votre défausse dans votre main.",
    },
    it: {
      name: "I Won't Give In",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Riprendi in mano una carta personaggio con costo 2 o inferiore dai tuoi scarti.",
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 28,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_128b29d2aef043efb62b2fb63189c4ca",
    tcgPlayer: 588087,
  },
  text: "Return a character card with cost 2 or less from your discard to your hand.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        type: "return-from-discard",
        target: "CONTROLLER",
        destination: "hand",
        filter: {
          cardType: "character",
          maxCost: 2,
        },
      },
      id: "v73-1",
      text: "Return a character card with cost 2 or less from your discard to your hand.",
      type: "action",
    },
  ],
};
