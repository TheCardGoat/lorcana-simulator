import type { ActionCard } from "@tcg/lorcana-types";

export const keepTheAncientWays: ActionCard = {
  id: "Fn8",
  canonicalId: "ci_Fn8",
  reprints: ["set11-196"],
  cardType: "action",
  name: "Keep the Ancient Ways",
  i18n: {
    en: {
      name: "Keep the Ancient Ways",
      text: "Opponents can't play actions or items until the start of your next turn.",
    },
    de: {
      name: "Alte Sitten lass' besteh'n",
      text: "Gegnerische Mitspielende können bis zu Beginn deines nächsten Zuges keine Aktionen oder Gegenstände ausspielen.",
    },
    fr: {
      name: "Garde le feu millénaire",
      text: "Les adversaires ne peuvent pas jouer d'action ni d'objet jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Guidaci e Resta con Noi",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Gli avversari non possono giocare azioni o oggetti fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["steel"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 196,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_491b1cb4aadf4bf999230048abf2cf0b",
    tcgPlayer: 673432,
  },
  text: "Opponents can't play actions or items until the start of your next turn.",
  actionSubtype: "song",
  abilities: [
    {
      id: "8ke-1",
      type: "action",
      text: "Opponents can't play actions or items until the start of your next turn.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "restriction",
            restriction: "cant-play-actions",
            target: "OPPONENTS",
            duration: "until-start-of-next-turn",
          },
          {
            type: "restriction",
            restriction: "cant-play-items",
            target: "OPPONENTS",
            duration: "until-start-of-next-turn",
          },
        ],
      },
    },
  ],
};
