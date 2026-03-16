import type { ItemCard } from "@tcg/lorcana-types";

export const darkwingsGasDevice: ItemCard = {
  id: "15l",
  canonicalId: "ci_15l",
  reprints: ["set11-169"],
  cardType: "item",
  name: "Darkwing's Gas Device",
  i18n: {
    en: {
      name: "Darkwing's Gas Device",
      text: [
        {
          title: "BLINDING CLOUD",
          description:
            "{E}, 1 {I} — Chosen character gets -1 {S} this turn. If you have a character named Darkwing Duck in play, chosen character gets -2 {S} this turn instead.",
        },
      ],
    },
    de: {
      name: "Darkwings Gaspistole",
      text: [
        {
          title: "BLENDENDE WOLKE, 1",
          description:
            "— Ein Charakter deiner Wahl erhält in diesem Zug -1. Falls du einen Darkwing-Duck-Charakter im Spiel hast, erhält der Charakter in diesem Zug stattdessen -2.",
        },
      ],
    },
    fr: {
      name: "Appareil à gaz de Myster Mask",
      text: [
        {
          title: "NUAGE AVEUGLANT, 1",
          description:
            "— Choisissez un personnage qui subit -1 pour le reste de ce tour. Si vous avez un personnage Myster Mask en jeu, le personnage choisi subit -2 à la place.",
        },
      ],
    },
    it: {
      name: "Apparecchio a Gas di Darkwing",
      text: [
        {
          title: "NUVOLA ACCECANTE, 1",
          description:
            "— Un personaggio a tua scelta riceve -1 per questo turno. Se hai in gioco un personaggio chiamato Darkwing Duck, un personaggio a tua scelta riceve invece -2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 169,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_51455b45e452420caabc777bd7bd1ee5",
    tcgPlayer: 676233,
  },
  text: [
    {
      title: "BLINDING CLOUD",
      description:
        "{E}, 1 {I} — Chosen character gets -1 {S} this turn. If you have a character named Darkwing Duck in play, chosen character gets -2 {S} this turn instead.",
    },
  ],
  abilities: [
    {
      id: "1uv-1",
      name: "BLINDING CLOUD",
      type: "activated",
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        condition: {
          type: "has-named-character",
          controller: "you",
          name: "Darkwing Duck",
        },
        then: {
          modifier: -2,
          stat: "strength",
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "modify-stat",
          duration: "this-turn",
        },
        else: {
          modifier: -1,
          stat: "strength",
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "modify-stat",
          duration: "this-turn",
        },
        type: "conditional",
      },
      text: "BLINDING CLOUD {E}, 1 {I} — Chosen character gets -1 {S} this turn. If you have a character named Darkwing Duck in play, chosen character gets -2 {S} this turn instead.",
    },
  ],
};
