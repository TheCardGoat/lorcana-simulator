import type { ActionCard } from "@tcg/lorcana-types";

export const revive: ActionCard = {
  id: "079",
  canonicalId: "ci_s1g",
  reprints: ["set5-027"],
  cardType: "action",
  name: "Revive",
  i18n: {
    en: {
      name: "Revive",
      text: "Play a character card with cost 5 or less from your discard for free.",
    },
    de: {
      name: "Wiedererwachen",
      text: "Spiele eine Charakterkarte, die 5 oder weniger kostet, kostenlos aus deinem Ablagestapel aus.",
    },
    fr: {
      name: "Ranimer",
      text: "Jouez gratuitement une carte Personnage de votre défausse ayant un coût de 5 ou moins.",
    },
    it: {
      name: "Rivitalizzare",
      text: "Gioca una carta personaggio con costo 5 o inferiore dai tuoi scarti, gratis.",
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "005",
  cardNumber: 27,
  rarity: "rare",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_d7a644695e604c958aee5d0ba8fa8415",
    tcgPlayer: 561979,
  },
  text: "Play a character card with cost 5 or less from your discard for free.",
  abilities: [
    {
      effect: {
        cardType: "character",
        cost: "free",
        filter: {
          cardType: "character",
          maxCost: 5,
        },
        from: "discard",
        type: "play-card",
      },
      id: "16b-1",
      text: "Play a character card with cost 5 or less from your discard for free.",
      type: "action",
    },
  ],
};
