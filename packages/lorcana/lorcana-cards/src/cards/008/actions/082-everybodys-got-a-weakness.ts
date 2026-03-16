import type { ActionCard } from "@tcg/lorcana-types";

export const everybodysGotAWeakness: ActionCard = {
  id: "Gps",
  canonicalId: "ci_Gps",
  reprints: ["set8-082"],
  cardType: "action",
  name: "Everybody's Got a Weakness",
  i18n: {
    en: {
      name: "Everybody's Got a Weakness",
      text: "Move 1 damage counter from each damaged character you have in play to chosen opposing character. Draw a card for each damage counter moved this way.",
    },
    de: {
      name: "Jeder hat eine Schwäche",
      text: "Verschiebe je 1 Schadensmarker von jedem deiner beschädigten Charaktere zu einem gegnerischen Charakter deiner Wahl. Ziehe 1 Karte für jeden Schadensmarker, den du auf diese Weise verschoben hast.",
    },
    fr: {
      name: "Tout le monde a une faiblesse",
      text: "Déplacez 1 dommage de chacun de vos personnages sur un personnage adverse de votre choix. Piochez une carte pour chaque dommage déplacé de cette façon.",
    },
    it: {
      name: "Tutti al Mondo Hanno una Debolezza",
      text: "Sposta 1 segnalino danno da ogni personaggio danneggiato che hai in gioco a un personaggio avversario a tua scelta. Pesca una carta per ogni segnalino danno che hai spostato in questo modo.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "008",
  cardNumber: 82,
  rarity: "rare",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_af2675aaffe94ff2bf54e5635e2657d8",
    tcgPlayer: 631832,
  },
  text: "Move 1 damage counter from each damaged character you have in play to chosen opposing character. Draw a card for each damage counter moved this way.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "move-damage",
            amount: 1,
            distribution: "from-each-source",
            from: {
              selector: "all",
              count: "all",
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "status",
                  status: "damaged",
                },
              ],
            },
            to: "CHOSEN_OPPOSING_CHARACTER",
          },
          {
            type: "draw",
            amount: "DAMAGE_REMOVED",
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
