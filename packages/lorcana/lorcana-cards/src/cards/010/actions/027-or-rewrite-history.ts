import type { ActionCard } from "@tcg/lorcana-types";

export const orRewriteHistory: ActionCard = {
  id: "ZSz",
  canonicalId: "ci_ZSz",
  reprints: ["set10-027"],
  cardType: "action",
  name: "Or Rewrite History!",
  i18n: {
    en: {
      name: "Or Rewrite History!",
      text: "Return a character card from your discard to your hand.",
    },
    de: {
      name: "An allen Plätzen",
      text: "Nimm 1 Charakterkarte aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "Nous entrerons dans la bande",
      text: "Renvoyez dans votre main une carte Personnage de votre défausse.",
    },
    it: {
      name: "Ma Che Bei Paperi!",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Riprendi in mano una carta personaggio dai tuoi scarti.",
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 27,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_a6fe0f1466334c1abc4a7cda49a6db08",
    tcgPlayer: 659463,
  },
  text: "Return a character card from your discard to your hand.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        cardType: "character",
        destination: "hand",
        target: "CONTROLLER",
        type: "return-from-discard",
      },
      type: "action",
    },
  ],
};
