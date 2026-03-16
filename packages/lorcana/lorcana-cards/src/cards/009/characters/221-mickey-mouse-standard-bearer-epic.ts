import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseStandardBearerEpic: CharacterCard = {
  id: "6JJ",
  canonicalId: "ci_7BU",
  reprints: ["set4-188", "set9-185"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Standard Bearer",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Standard Bearer",
      text: [
        {
          title: "STAND STRONG",
          description:
            "When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Standartenträger",
      text: [
        {
          title: "STARK BLEIBEN",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2).",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Porte-étendard",
      text: [
        {
          title: "SOIS FORT",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Offensif +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Standard-iere",
      text: [
        {
          title: "RIMANERE SALDO",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta ottiene Sfidante +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "009",
  cardNumber: 221,
  rarity: "common",
  specialRarity: "epic",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a78a6d864bae48dca06ed1dc25e75e3f",
    tcgPlayer: 650156,
  },
  text: [
    {
      title: "STAND STRONG",
      description:
        "When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
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
      id: "k4b-1",
      name: "STAND STRONG",
      text: "STAND STRONG When you play this character, chosen character gains Challenger +2 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
