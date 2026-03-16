import type { ItemCard } from "@tcg/lorcana-types";

export const theSwordReleased: ItemCard = {
  id: "703",
  canonicalId: "ci_703",
  reprints: ["set5-133"],
  cardType: "item",
  name: "The Sword Released",
  i18n: {
    en: {
      name: "The Sword Released",
      text: [
        {
          title: "POWER APPOINTED",
          description:
            "At the start of your turn, if you have a character in play with more {S} than each opposing character in play, each opponent loses 1 lore and you gain lore equal to the lore lost.",
        },
      ],
    },
    de: {
      name: "Das befreite Schwert",
      text: [
        {
          title: "ERTEILTE MACHT",
          description:
            "Zu Beginn deines Zuges, wenn du einen Charakter mit einer höheren als die aller gegnerischen Charaktere im Spiel hast, verlieren alle gegnerischen Mitspielenden je 1 Legende und du sammlest, für jede so verlorene Legende, je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "L'Épée libérée",
      text: [
        {
          title: "LA PUISSANCE EST CONFÉRÉE",
          description:
            "Au début de votre tour, si vous avez un personnage en jeu avec une plus élevée que chaque personnage adverse, chaque adversaire perd 1 éclat de Lore. Vous gagnez autant d'éclats de Lore que vos adversaires en ont perdu.",
        },
      ],
    },
    it: {
      name: "La Spada Estratta",
      text: [
        {
          title: "DESIGNATO DAL POTERE",
          description:
            "All'inizio del tuo turno, se hai in gioco un personaggio con più di ogni personaggio avversario in gioco, ogni avversario perde 1 leggenda e tu ottieni leggenda pari alla leggenda persa.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 133,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_22989be17783417ea635d11b83b71252",
    tcgPlayer: 560544,
  },
  text: [
    {
      title: "POWER APPOINTED",
      description:
        "At the start of your turn, if you have a character in play with more {S} than each opposing character in play, each opponent loses 1 lore and you gain lore equal to the lore lost.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      id: "fy1-1",
      name: "POWER APPOINTED",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        type: "conditional",
        condition: {
          type: "target-aggregate-comparison",
          left: {
            query: {
              selector: "all",
              owner: "you",
              zones: ["play"],
              cardType: "character",
              filters: [],
            },
            attribute: "strength",
            aggregate: "max",
          },
          right: {
            query: {
              selector: "all",
              owner: "opponent",
              zones: ["play"],
              cardType: "character",
              filters: [],
            },
            attribute: "strength",
            aggregate: "max",
          },
          comparison: "gt",
          requireLeftNonEmpty: true,
          ifRightEmpty: "pass",
        },
        then: {
          type: "sequence",
          steps: [
            {
              amount: 1,
              target: "EACH_OPPONENT",
              type: "lose-lore",
            },
            {
              amount: {
                type: "lore-lost",
              },
              target: "CONTROLLER",
              type: "gain-lore",
            },
          ],
        },
      },
      text: "POWER APPOINTED At the start of your turn, if you have a character in play with more {S} than each opposing character in play, each opponent loses 1 lore and you gain lore equal to the lore lost.",
    },
  ],
};
