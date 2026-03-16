import type { ItemCard } from "@tcg/lorcana-types";

export const potionOfMight: ItemCard = {
  id: "k9I",
  canonicalId: "ci_k9I",
  reprints: ["set5-132"],
  cardType: "item",
  name: "Potion of Might",
  i18n: {
    en: {
      name: "Potion of Might",
      text: [
        {
          title: "VILE CONCOCTION 1",
          description:
            "{I}, Banish this item — Chosen character gets +3 {S} this turn. If a Villain character is chosen, they get +4 {S} instead.",
        },
      ],
    },
    de: {
      name: "Trank der Macht",
      text: [
        {
          title: "ABSCHEULICHES",
          description:
            "GEBRÄU 1, Verbanne diesen Gegenstand — Gib einem Charakter deiner Wahl in diesem Zug +3. Wählst du einen Schurken, dann gib dem Charakter stattdessen +4.",
        },
      ],
    },
    fr: {
      name: "Potion de puissance",
      text: [
        {
          title: "DÉCOCTION ABJECTE",
          description:
            "1, bannissez cet objet — Choisissez un personnage qui gagne +3 pour le reste de ce tour. Si ce personnage est un Méchant, il gagne +4 à la place.",
        },
      ],
    },
    it: {
      name: "Pozione della Forza",
      text: [
        {
          title: "INTRUGLIO DISGUSTOSO 1,",
          description:
            "esilia questo oggetto — Un personaggio a tua scelta riceve +3 per questo turno. Se quel personaggio è un Cattivo, riceve invece +4.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 132,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_96709c5ceb00448ab2b8e4b039319183",
    tcgPlayer: 561965,
  },
  text: [
    {
      title: "VILE CONCOCTION 1",
      description:
        "{I}, Banish this item — Chosen character gets +3 {S} this turn. If a Villain character is chosen, they get +4 {S} instead.",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "selected-first",
            filters: [
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
          duration: "this-turn",
          modifier: 4,
          stat: "strength",
          target: "CHOSEN_CHARACTER",
          type: "modify-stat",
        },
        else: {
          duration: "this-turn",
          modifier: 3,
          stat: "strength",
          target: "CHOSEN_CHARACTER",
          type: "modify-stat",
        },
        type: "conditional",
      },
      id: "6dr-1",
      name: "VILE CONCOCTION 1",
      text: "VILE CONCOCTION 1 {I}, Banish this item — Chosen character gets +3 {S} this turn. If a Villain character is chosen, they get +4 {S} instead.",
      type: "activated",
    },
  ],
};
