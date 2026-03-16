import type { ItemCard } from "@tcg/lorcana-types";

export const swordInTheStone: ItemCard = {
  id: "zL0",
  canonicalId: "ci_zL0",
  reprints: ["set2-136"],
  cardType: "item",
  name: "Sword in the Stone",
  i18n: {
    en: {
      name: "Sword in the Stone",
      text: [
        {
          title: "{E},",
          description: "2 {I} — Chosen character gets +1 {S} this turn for each 1 damage on them.",
        },
      ],
    },
    de: {
      name: "Das Schwert in dem Stein",
      text: ", 2 — Gib einem Charakter deiner Wahl in diesem Zug +1 für jeden Schaden auf ihm.",
    },
    fr: {
      name: "L'épée dans l'enclume",
      text: ", 2 — Choisissez un personnage, il gagne +1 pour chaque jeton Dommage sur lui, pour le reste de ce tour.",
    },
    it: {
      name: "Sword in the Stone",
      text: ", 2 — Chosen character gets +1 this turn for each 1 damage on them.",
    },
  },
  inkType: ["ruby"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 136,
  rarity: "uncommon",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_24945449688b42f699bff7a47b3f282b",
    tcgPlayer: 525105,
  },
  text: [
    {
      title: "{E},",
      description: "2 {I} — Chosen character gets +1 {S} this turn for each 1 damage on them.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        duration: "this-turn",
        modifier: {
          type: "damage-on-target",
        },
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "pw4-1",
      name: "SWORD IN THE STONE",
      text: "{E}, 2 {I} — Chosen character gets +1 {S} this turn for each 1 damage on them.",
      type: "activated",
    },
  ],
};
