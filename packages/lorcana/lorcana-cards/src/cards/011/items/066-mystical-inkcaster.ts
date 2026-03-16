import type { ItemCard } from "@tcg/lorcana-types";

export const mysticalInkcaster: ItemCard = {
  id: "YMG",
  canonicalId: "ci_YMG",
  reprints: ["set11-066"],
  cardType: "item",
  name: "Mystical Inkcaster",
  i18n: {
    en: {
      name: "Mystical Inkcaster",
      text: [
        {
          title: "SPECIAL SUMMONS",
          description:
            "{E}, 3 {I} — Play a character with cost 5 or less for free. They gain Rush. At the end of your turn, banish them. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Mystischer Tintenformer",
      text: [
        {
          title: "BESONDERE",
          description:
            "BESCHWÖRUNGEN, 3 — Spiele einen Charakter, der 5 oder weniger kostet, kostenlos aus. Er erhält Rasant. Verbanne ihn am Ende deines Zuges. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
        },
      ],
    },
    fr: {
      name: "Invocateur d’encre mystique",
      text: [
        {
          title: "INVOCATION",
          description:
            "SPÉCIALE, 3 — Jouez gratuitement un personnage coûtant 5 ou moins. Il gagne Charge. À la fin de votre tour, bannissez-le.",
        },
      ],
    },
    it: {
      name: "Inchiostratore Mistico",
      text: [
        {
          title: "EVOCAZIONI SPECIALI, 3",
          description:
            "— Gioca un personaggio con costo 5 o inferiore gratis. Ottiene Lesto. Alla fine del tuo turno, esilialo. (Può sfidare nel turno in cui viene giocato.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lorcana",
  set: "011",
  cardNumber: 66,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_3d8ed3e3edf846c7b5dc9cc034436b8e",
    tcgPlayer: 675301,
  },
  text: [
    {
      title: "SPECIAL SUMMONS",
      description:
        "{E}, 3 {I} — Play a character with cost 5 or less for free. They gain Rush. At the end of your turn, banish them. (They can challenge the turn they're played.)",
    },
  ],
  abilities: [
    {
      id: "1ah-1",
      name: "SPECIAL SUMMONS",
      type: "activated",
      cost: {
        exert: true,
        ink: 3,
      },
      effect: {
        type: "play-card",
        from: "hand",
        cardType: "character",
        cost: "free",
        filter: {
          maxCost: 5,
        },
        grantsRush: true,
        banishAtEndOfTurn: true,
      },
      text: "SPECIAL SUMMONS {E}, 3 {I} — Play a character with cost 5 or less for free. They gain Rush. At the end of your turn, banish them.",
    },
  ],
};
