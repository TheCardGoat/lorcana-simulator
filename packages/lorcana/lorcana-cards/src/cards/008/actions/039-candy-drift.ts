import type { ActionCard } from "@tcg/lorcana-types";

export const candyDrift: ActionCard = {
  id: "Zzh",
  canonicalId: "ci_Zzh",
  reprints: ["set8-039"],
  cardType: "action",
  name: "Candy Drift",
  i18n: {
    en: {
      name: "Candy Drift",
      text: "Draw a card. Chosen character of yours gets +5 {S} this turn. At the end of your turn, banish them.",
    },
    de: {
      name: "Zucker-Drift",
      text: "Ziehe 1 Karte. Wähle einen deiner Charaktere und gib ihm in diesem Zug +5. Verbanne ihn am Ende deines Zuges.",
    },
    fr: {
      name: "Dérapage sucré",
      text: "Piochez une carte. Choisissez l'un de vos personnages qui gagne +5 pour le reste de ce tour. Bannissez-le à la fin de ce tour.",
    },
    it: {
      name: "Drift Candito",
      text: "Pesca una carta. Un tuo personaggio a tua scelta riceve +5 per questo turno. Alla fine del tuo turno, esilialo.",
    },
  },
  inkType: ["amber", "ruby"],
  franchise: "Wreck It Ralph",
  set: "008",
  cardNumber: 39,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_25e476ae1e6545bc87787d0705f87364",
    tcgPlayer: 631377,
  },
  text: "Draw a card. Chosen character of yours gets +5 {S} this turn. At the end of your turn, banish them.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            duration: "this-turn",
            modifier: 5,
            stat: "strength",
            target: "CHOSEN_CHARACTER_OF_YOURS",
            type: "modify-stat",
          },
          {
            type: "create-triggered-ability",
            lifecycle: {
              kind: "delayed",
              timing: "end-of-turn",
            },
            ability: {
              trigger: {
                event: "end-turn",
                on: "CONTROLLER",
                timing: "at",
              },
              effect: {
                target: {
                  ref: "previous-target",
                },
                type: "banish",
              },
            },
          },
        ],
      },
      id: "18h-1",
      text: "Draw a card. Chosen character of yours gets +5 {S} this turn. At the end of your turn, banish them.",
      type: "action",
    },
  ],
};
