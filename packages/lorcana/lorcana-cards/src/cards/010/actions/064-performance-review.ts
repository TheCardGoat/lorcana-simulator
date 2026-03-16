import type { ActionCard } from "@tcg/lorcana-types";

export const performanceReview: ActionCard = {
  id: "Alh",
  canonicalId: "ci_Alh",
  reprints: ["set10-064"],
  cardType: "action",
  name: "Performance Review",
  i18n: {
    en: {
      name: "Performance Review",
      text: [
        {
          title: "{E}",
          description:
            "chosen ready character of yours to draw cards equal to that character's {L}.",
        },
      ],
    },
    de: {
      name: "Leistungsbewertung",
      text: "einen deiner bereiten Charaktere, um so viele Karten zu ziehen, wie dieser hat.",
    },
    fr: {
      name: "Bilan de performance",
      text: "Choisissez et l'un de vos personnages redressés pour piocher autant de cartes que son.",
    },
    it: {
      name: "Valutazione delle Prestazioni",
      text: "un tuo personaggio preparato a tua scelta per pescare carte pari al di quel personaggio.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 64,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_222374c54b4848939d442c144758404e",
    tcgPlayer: 660367,
  },
  text: [
    {
      title: "{E}",
      description: "chosen ready character of yours to draw cards equal to that character's {L}.",
    },
  ],
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "exert",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "ready",
                },
              ],
            },
          },
          {
            type: "draw",
            target: "CONTROLLER",
            amount: {
              type: "target-attribute",
              attribute: "lore",
            },
          },
        ],
      },
    },
  ],
};
