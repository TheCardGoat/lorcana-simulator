import type { ItemCard } from "@tcg/lorcana-types";

export const poisonedApple: ItemCard = {
  id: "NVz",
  canonicalId: "ci_NVz",
  reprints: ["set1-134"],
  cardType: "item",
  name: "Poisoned Apple",
  i18n: {
    en: {
      name: "Poisoned Apple",
      text: [
        {
          title: "TAKE A BITE... 1",
          description:
            "{I}, Banish this item — Exert chosen character. If a Princess character is chosen, banish her instead.",
        },
      ],
    },
    de: {
      name: "Vergifteter Apfel",
      text: [
        {
          title: "BEISS MAL AB... 1,",
          description:
            "Verbanne diesen Gegenstand — erschöpfe einen Charakter deiner Wahl. Wenn du eine Prinzessin wählst, verbanne sie stattdessen.",
        },
      ],
    },
    fr: {
      name: "POMME EMPOISONNÉE",
      text: [
        {
          title: "CROQUE... 1,",
          description:
            "Bannissez cet objet — Choisissez un personnage et épuisez-le. Si c'est une Princesse, bannissez-la à la place.",
        },
      ],
    },
    it: {
      name: "Poisoned Apple",
      text: [
        {
          title: "TAKE A BITE... 1,",
          description:
            "Banish this item — Exert chosen character. If a Princess character is chosen, banish her instead.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Snow White",
  set: "001",
  cardNumber: 134,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_3c0355d3cc2d409e9b10876744aa534a",
    tcgPlayer: 507862,
  },
  text: [
    {
      title: "TAKE A BITE... 1",
      description:
        "{I}, Banish this item — Exert chosen character. If a Princess character is chosen, banish her instead.",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
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
                classification: "Princess",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          target: "CHOSEN_CHARACTER",
          type: "banish",
        },
        else: {
          target: "CHOSEN_CHARACTER",
          type: "exert",
        },
      },
      id: "1mn-1",
      name: "TAKE A BITE... 1",
      text: "TAKE A BITE... 1 {I}, Banish this item — Exert chosen character. If a Princess character is chosen, banish her instead.",
      type: "activated",
    },
  ],
};
