import type { ActionCard } from "@tcg/lorcana-types";

export const evilComesPrepared: ActionCard = {
  id: "Vin",
  canonicalId: "ci_Yvo",
  reprints: ["set5-128"],
  cardType: "action",
  name: "Evil Comes Prepared",
  i18n: {
    en: {
      name: "Evil Comes Prepared",
      text: "Ready chosen character of yours. They can't quest for the rest of this turn. If a Villain character is chosen, gain 1 lore.",
    },
    de: {
      name: "Das Böse kommt gewappnet",
      text: "Wähle einen deiner Charaktere und mache ihn bereit. Er kann in diesem Zug nicht mehr erkunden. Wählst du einen Schurken, sammelst du 1 Legende.",
    },
    fr: {
      name: "La fin est proche",
      text: "Choisissez l'un de vos personnages et redressez-le. Il ne peut pas partir à l'aventure pour le reste de ce tour. Si vous choisissez un personnage Méchant de cette manière, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Il Male È Sempre in Agguato",
      text: "Prepara un tuo personaggio a tua scelta. Non può andare all'avventura per il resto di questo turno. Se quel personaggio è un Cattivo, ottieni 1 leggenda.",
    },
  },
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 128,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_07fed6332fd14403b062bc4f1aed3e63",
    tcgPlayer: 561964,
  },
  text: "Ready chosen character of yours. They can't quest for the rest of this turn. If a Villain character is chosen, gain 1 lore.",
  abilities: [
    {
      effect: {
        steps: [
          {
            type: "ready",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
          {
            type: "restriction",
            duration: "this-turn",
            restriction: "cant-quest",
            target: {
              ref: "previous-target",
            },
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                reference: "selected-first",
                filters: [
                  {
                    type: "card-type",
                    value: "character",
                  },
                  {
                    type: "has-classification",
                    classification: "Villain",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              amount: 1,
              target: "CONTROLLER",
              type: "gain-lore",
            },
          },
        ],
        type: "sequence",
      },
      id: "1qd-1",
      text: "Ready chosen character of yours. They can't quest for the rest of this turn. If a Villain character is chosen, gain 1 lore.",
      type: "action",
    },
  ],
};
