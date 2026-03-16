import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaStormChaser: CharacterCard = {
  id: "pQC",
  canonicalId: "ci_pQC",
  reprints: ["set4-042"],
  cardType: "character",
  name: "Elsa",
  version: "Storm Chaser",
  i18n: {
    en: {
      name: "Elsa",
      version: "Storm Chaser",
      text: [
        {
          title: "TEMPEST",
          description:
            "{E} — Chosen character gains Challenger +2 and Rush this turn. (They get +2 {S} while challenging. They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Sturmjägerin",
      text: [
        {
          title: "STÜRMISCHE ZEITEN",
          description:
            "— Ein Charakter deiner Wahl erhält in diesem Zug Herausfordern +2 und Rasant. (Während der Charakter herausfordert, erhält er +2. Er kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
        },
      ],
    },
    fr: {
      name: "Elsa",
      version: "Chasseuse d'orage",
      text: [
        {
          title: "TEMPÊTE",
          description:
            "— Choisissez un personnage qui gagne Offensif +2 et Charge pour le reste de ce tour. (Lorsqu'il défie, ce personnage gagne +2. Ce personnage peut défier le tour où il est joué.)",
        },
      ],
    },
    it: {
      name: "Elsa",
      version: "Cacciatrice di Tempeste",
      text: [
        {
          title: "TEMPESTA",
          description:
            "— Un personaggio a tua scelta ottiene Sfidante +2 e Lesto per questo turno. (Riceve +2 mentre sta sfidando. Può sfidare nel turno in cui viene giocato.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 42,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_178373b0fe2f483b90202bfeb6014e0a",
    tcgPlayer: 547847,
  },
  text: [
    {
      title: "TEMPEST",
      description:
        "{E} — Chosen character gains Challenger +2 and Rush this turn. (They get +2 {S} while challenging. They can challenge the turn they're played.)",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 2,
      },
      id: "ih5-1",
      text: "TEMPEST {E} — Chosen character gains Challenger +2 and Rush this turn.",
      type: "activated",
    },
  ],
};
