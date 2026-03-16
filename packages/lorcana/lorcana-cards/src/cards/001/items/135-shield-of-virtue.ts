import type { ItemCard } from "@tcg/lorcana-types";

export const shieldOfVirtue: ItemCard = {
  id: "lec",
  canonicalId: "ci_lec",
  reprints: ["set1-135"],
  cardType: "item",
  name: "Shield of Virtue",
  i18n: {
    en: {
      name: "Shield of Virtue",
      text: [
        {
          title: "FIREPROOF",
          description:
            "{E}, 3 {I} — Ready chosen character. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Schild der Tugend",
      text: [
        {
          title: "FEUERFEST, 3",
          description:
            "— Mache einen Charakter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "BOUCLIER DE VERTU",
      text: [
        {
          title: "À L'ÉPREUVE DU FEU,",
          description:
            "3 — Choisissez un personnage et redressez-le. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Scudo di Virtù",
      text: [
        {
          title: "IGNIFUGO, 3",
          description:
            "— Prepara un personaggio a tua scelta. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Sleeping Beauty",
  set: "001",
  cardNumber: 135,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_81867e9c25c44f33aa150e70b57bb4dd",
    tcgPlayer: 508789,
  },
  text: [
    {
      title: "FIREPROOF",
      description:
        "{E}, 3 {I} — Ready chosen character. They can't quest for the rest of this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 3,
      },
      effect: {
        steps: [
          {
            target: "CHOSEN_CHARACTER",
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: {
              ref: "previous-target",
            },
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "f35-1",
      name: "FIREPROOF",
      text: "FIREPROOF {E}, 3 {I} — Ready chosen character. They can't quest for the rest of this turn.",
      type: "activated",
    },
  ],
};
