import type { ActionCard } from "@tcg/lorcana-types";

export const soMuchToGive: ActionCard = {
  id: "Q7m",
  canonicalId: "ci_Q7m",
  reprints: ["set7-038"],
  cardType: "action",
  name: "So Much to Give",
  i18n: {
    en: {
      name: "So Much to Give",
      text: "Draw a card. Chosen character gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
    },
    de: {
      name: "So neu für mich",
      text: "Ziehe 1 Karte. Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Beschützen. (Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "La vie nous a réunis",
      text: "Piochez une carte. Choisissez un personnage qui gagne Rempart jusqu'au début de votre prochain tour. (Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
    },
    it: {
      name: "La Vita Appartiene a Me",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Pesca una carta. Un personaggio a tua scelta ottiene Guardiano fino all'inizio del tuo prossimo turno. (Un personaggio avversario che sfida uno dei tuoi personaggi deve sceglierne uno con Guardiano, se possibile.)",
    },
  },
  inkType: ["amber"],
  franchise: "Bolt",
  set: "007",
  cardNumber: 38,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1420be51e8504e689e1166dfb5bd2790",
    tcgPlayer: 618720,
  },
  text: "Draw a card. Chosen character gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            duration: "until-start-of-next-turn",
            keyword: "Bodyguard",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "jyr-1",
      text: "Draw a card. Chosen character gains Bodyguard until the start of your next turn.",
      type: "action",
    },
  ],
};
