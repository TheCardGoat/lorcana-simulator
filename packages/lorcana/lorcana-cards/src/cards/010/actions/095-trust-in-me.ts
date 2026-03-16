import type { ActionCard } from "@tcg/lorcana-types";

export const trustInMe: ActionCard = {
  id: "c7R",
  canonicalId: "ci_c7R",
  reprints: ["set10-095"],
  cardType: "action",
  name: "Trust In Me",
  i18n: {
    en: {
      name: "Trust In Me",
      text: "Choose one:\n- Each opposing character gets -1 until the start of your next turn.\n- Each opponent chooses and discards 2 cards.",
    },
    de: {
      name: "Hör auf mich",
      text: "Wähle eine Möglichkeit aus: • Gib allen gegnerischen Charakteren bis zu Beginn deines nächsten Zuges -1. • Alle gegnerischen Mitspielenden wählen je 2 Karten aus ihrer Hand und werfen sie ab.",
    },
    fr: {
      name: "Aie confiance",
      text: "Choisissez entre: • Chaque personnage adverse subit -1 jusqu'au début de votre prochain tour. • Chaque adversaire défausse 2 cartes.",
    },
    it: {
      name: "Spera in Me",
      text: "(Un personaggio con costo 6 o superiore può per cantare questa canzone gratis.) Scegli uno: • Ogni personaggio avversario riceve -1 fino all'inizio del tuo prossimo turno. • Ogni avversario sceglie e scarta 2 carte.",
    },
  },
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 95,
  rarity: "rare",
  cost: 6,
  inkable: false,
  externalIds: {
    lorcast: "crd_a8554e2076074a8599f09e171436ac14",
    tcgPlayer: 658461,
  },
  text: "Choose one:\n- Each opposing character gets -1 until the start of your next turn.\n- Each opponent chooses and discards 2 cards.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "choice",
        options: [
          {
            type: "modify-stat",
            stat: "lore",
            modifier: -1,
            duration: "until-start-of-next-turn",
            target: {
              selector: "all",
              count: "all",
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
          {
            type: "discard",
            amount: 2,
            chosen: true,
            from: "hand",
            target: "EACH_OPPONENT",
          },
        ],
      },
    },
  ],
};
