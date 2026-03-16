import type { ActionCard } from "@tcg/lorcana-types";

export const lostInTheWoods: ActionCard = {
  id: "5np",
  canonicalId: "ci_HNA",
  reprints: ["set4-029", "set9-028"],
  cardType: "action",
  name: "Lost in the Woods",
  i18n: {
    en: {
      name: "Lost in the Woods",
      text: "All opposing characters get -2 {S} until the start of your next turn.",
    },
    de: {
      name: "Verlassen im Wald",
      text: "Gib allen gegnerischen Charakteren bis zu Beginn deines nächsten Zuges -2.",
    },
    fr: {
      name: "J'ai perdu le Nord",
      text: "Tous les personnages adverses subissent -2 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Perso Quaggiù",
      text: "(Un personaggio con costo 4 o superiore può per cantare questa canzone gratis.) Tutti i personaggi avversari ricevono -2 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Frozen",
  set: "009",
  cardNumber: 28,
  rarity: "common",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_fbdf8cd3fdd840c6b1a52b64d63e2fee",
    tcgPlayer: 649975,
  },
  text: "All opposing characters get -2 {S} until the start of your next turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "modify-stat",
        stat: "strength",
        modifier: -2,
        duration: "until-start-of-next-turn",
        target: "ALL_OPPOSING_CHARACTERS",
      },
    },
  ],
};
