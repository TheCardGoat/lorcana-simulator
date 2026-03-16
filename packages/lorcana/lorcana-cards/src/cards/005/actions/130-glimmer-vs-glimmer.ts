import type { ActionCard } from "@tcg/lorcana-types";

export const glimmerVsGlimmer: ActionCard = {
  id: "xCq",
  canonicalId: "ci_xCq",
  reprints: ["set5-130"],
  cardType: "action",
  name: "Glimmer vs Glimmer",
  i18n: {
    en: {
      name: "Glimmer vs Glimmer",
      text: "Banish chosen character of yours to banish chosen character.",
    },
    de: {
      name: "Glimmer gegen Glimmer",
      text: "Wähle und verbanne einen deiner Charaktere, um einen Charakter deiner Wahl zu verbannen.",
    },
    fr: {
      name: "Glimmer contre Glimmer",
      text: "Choisissez et bannissez l'un de vos personnages pour choisir et bannir un autre personnage.",
    },
    it: {
      name: "Glimmer contro Glimmer",
      text: "Esilia un tuo personaggio a tua scelta per esiliare un personaggio a tua scelta.",
    },
  },
  inkType: ["ruby"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 130,
  rarity: "uncommon",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_00e4569178e847649514f979474839fe",
    tcgPlayer: 560548,
  },
  text: "Banish chosen character of yours to banish chosen character.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            type: "banish",
            target: {
              cardTypes: ["character"],
              count: 1,
              owner: "you",
              selector: "chosen",
              zones: ["play"],
            },
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            then: {
              type: "banish",
              target: {
                cardTypes: ["character"],
                count: 1,
                owner: "any",
                selector: "chosen",
                zones: ["play"],
                requireDifferentTargets: true,
              },
            },
          },
        ],
      },
      id: "e3r-1",
      text: "Banish chosen character of yours to banish chosen character.",
      type: "action",
    },
  ],
};
