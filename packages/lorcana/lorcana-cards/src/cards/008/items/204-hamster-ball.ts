import type { ItemCard } from "@tcg/lorcana-types";

export const hamsterBall: ItemCard = {
  id: "ohB",
  canonicalId: "ci_ohB",
  reprints: ["set8-204"],
  cardType: "item",
  name: "Hamster Ball",
  i18n: {
    en: {
      name: "Hamster Ball",
      text: [
        {
          title: "ROLL WITH THE PUNCHES",
          description:
            "{E}, 1 {I} — Chosen character with no damage gains Resist +2 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Hamsterball",
      text: [
        {
          title: "FÄNGT JEDEN SCHLAG AB,",
          description:
            "1 — Ein unbeschädigter Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.)",
        },
      ],
    },
    fr: {
      name: "Boule de hamster",
      text: [
        {
          title: "FAIRE FACE AUX COUPS, 1",
          description:
            "— Choisissez un personnage sans dommage sur lui. Il gagne Résistance +2 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Palla per Criceti",
      text: [
        {
          title: "RESISTENZA SFERICA, 1",
          description:
            "— Un personaggio a tua scelta senza danno ottiene Resistere +2 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 204,
  rarity: "common",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_38ec8cb24ad14a0cb16620ec01a89b88",
    tcgPlayer: 631485,
  },
  text: [
    {
      title: "ROLL WITH THE PUNCHES",
      description:
        "{E}, 1 {I} — Chosen character with no damage gains Resist +2 until the start of your next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
          filter: [
            {
              type: "undamaged",
            },
          ],
        },
        type: "gain-keyword",
        value: 2,
      },
      id: "1s0-1",
      name: "ROLL WITH THE PUNCHES",
      text: "ROLL WITH THE PUNCHES {E}, 1 {I} — Chosen character with no damage gains Resist +2 until the start of your next turn.",
      type: "activated",
    },
  ],
};
