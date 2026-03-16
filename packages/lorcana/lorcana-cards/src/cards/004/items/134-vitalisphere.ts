import type { ItemCard } from "@tcg/lorcana-types";

export const vitalisphere: ItemCard = {
  id: "WDs",
  canonicalId: "ci_WDs",
  reprints: ["set4-134"],
  cardType: "item",
  name: "Vitalisphere",
  i18n: {
    en: {
      name: "Vitalisphere",
      text: [
        {
          title: "EXTRACT OF RUBY 1",
          description:
            "{I}, Banish this item — Chosen character gains Rush and gets +2 {S} this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Vitalisphäre",
      text: [
        {
          title: "EXTRAKT AUS RUBIN 1,",
          description:
            "Verbanne diesen Gegenstand — Ein Charakter deiner Wahl erhält in diesem Zug +2 und Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
        },
      ],
    },
    fr: {
      name: "Sphère de Vitalité",
      text: [
        {
          title: "EXTRAIT DE RUBIS 1,",
          description:
            "Bannissez cet objet — Choisissez un personnage qui gagne Charge et +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Vitalisfera",
      text: [
        {
          title: "ESTRATTO DI RUBINO 1,",
          description:
            "esilia questo oggetto — Un personaggio a tua scelta ottiene Lesto e riceve +2 per questo turno. (Può sfidare nel turno in cui viene giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lorcana",
  set: "004",
  cardNumber: 134,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0377cc62eb6044bc808843bbcd39eb48",
    tcgPlayer: 548393,
  },
  text: [
    {
      title: "EXTRACT OF RUBY 1",
      description:
        "{I}, Banish this item — Chosen character gains Rush and gets +2 {S} this turn. (They can challenge the turn they're played.)",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        steps: [
          {
            keyword: "Rush",
            duration: "this-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
          },
          {
            duration: "this-turn",
            modifier: 2,
            stat: "strength",
            target: {
              ref: "previous-target",
            },
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      id: "fzw-1",
      name: "EXTRACT OF RUBY",
      text: "EXTRACT OF RUBY 1 {I}, Banish this item — Chosen character gains Rush and gets +2 {S} this turn.",
      type: "activated",
    },
  ],
};
