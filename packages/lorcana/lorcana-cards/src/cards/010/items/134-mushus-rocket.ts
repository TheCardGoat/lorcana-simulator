import type { ItemCard } from "@tcg/lorcana-types";

export const mushusRocket: ItemCard = {
  id: "Atf",
  canonicalId: "ci_Atf",
  reprints: ["set10-134"],
  cardType: "item",
  name: "Mushu's Rocket",
  i18n: {
    en: {
      name: "Mushu's Rocket",
      text: [
        {
          title: "I NEED FIREPOWER",
          description:
            "When you play this item, chosen character gains Rush this turn. (They can challenge the turn they're played.)",
        },
        {
          title: "HITCH A RIDE 2",
          description: "{I}, Banish this item — Chosen character gains Rush this turn.",
        },
      ],
    },
    de: {
      name: "Mushus Rakete",
      text: [
        {
          title: "KÖNNT IHR MIR MAL FEUER GEBEN?",
          description:
            "Wenn du diesen Gegenstand ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.) MITFAHREN 2, Verbanne diesen Gegenstand — Ein Charakter deiner Wahl erhält in diesem Zug Rasant.",
        },
      ],
    },
    fr: {
      name: "Fusée de Mushu",
      text: [
        {
          title: "VOUS N'AURIEZ PAS DU FEU?",
          description:
            "Lorsque vous jouez cet objet, choisissez un personnage qui gagne Charge pour le reste de ce tour. MONTURE DE FORTUNE 2, Bannissez cet objet — Choisissez un personnage qui gagne Charge pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Razzo di Mushu",
      text: [
        {
          title: "VOGLIO LA POTENZA DEL FUOCO",
          description:
            "Quando giochi questo oggetto, un personaggio a tua scelta ottiene Lesto per questo turno. (Può sfidare nel turno in cui viene giocato.) SCROCCARE UN PASSAGGIO 2, esilia questo oggetto — Un personaggio a tua scelta ottiene Lesto per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "010",
  cardNumber: 134,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_26b89746756b40979ee1a9885c8e3f5b",
    tcgPlayer: 659423,
  },
  text: [
    {
      title: "I NEED FIREPOWER",
      description:
        "When you play this item, chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
    {
      title: "HITCH A RIDE 2",
      description: "{I}, Banish this item — Chosen character gains Rush this turn.",
    },
  ],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "u0o-1",
      name: "I NEED FIREPOWER",
      text: "I NEED FIREPOWER When you play this item, chosen character gains Rush this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "u0o-2",
      name: "HITCH A RIDE 2",
      text: "HITCH A RIDE 2 {I}, Banish this item — Chosen character gains Rush this turn.",
      type: "activated",
    },
  ],
};
