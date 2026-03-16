import type { ItemCard } from "@tcg/lorcana-types";

export const spaghettiDinner: ItemCard = {
  id: "4Q1",
  canonicalId: "ci_4Q1",
  reprints: ["set7-042"],
  cardType: "item",
  name: "Spaghetti Dinner",
  i18n: {
    en: {
      name: "Spaghetti Dinner",
      text: [
        {
          title: "FINE DINING",
          description: "{E}, 1 {I} — If you have 2 or more characters in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Spaghetti-Dinner",
      text: [
        {
          title: "GEHOBENE",
          description:
            "KÜCHE, 1 — Wenn du mindestens 2 Charaktere im Spiel hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Plat de spaghetti",
      text: [
        {
          title: "CUISINE",
          description:
            "RAFFINÉE, 1 — Si vous avez au moins 2 personnages en jeu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Cena di Spaghetti",
      text: [
        {
          title: "CUCINA RAFFINATA, 1",
          description: "— Se hai in gioco 2 o più personaggi, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 42,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_568855977d47447e9b2977c859dc31c7",
    tcgPlayer: 618164,
  },
  text: [
    {
      title: "FINE DINING",
      description: "{E}, 1 {I} — If you have 2 or more characters in play, gain 1 lore.",
    },
  ],
  abilities: [
    {
      name: "FINE DINING",
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        condition: {
          type: "has-character-count",
          controller: "you",
          comparison: "greater-or-equal",
          count: 2,
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "1bi-1",
      text: "FINE DINING {E}, 1 {I} — If you have 2 or more characters in play, gain 1 lore.",
      type: "activated",
    },
  ],
};
