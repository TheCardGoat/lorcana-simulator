import type { CharacterCard } from "@tcg/lorcana-types";

export const yelanaNorthuldraLeader: CharacterCard = {
  id: "umw",
  canonicalId: "ci_umw",
  reprints: ["set8-055"],
  cardType: "character",
  name: "Yelana",
  version: "Northuldra Leader",
  i18n: {
    en: {
      name: "Yelana",
      version: "Northuldra Leader",
      text: [
        {
          title: "WE ONLY TRUST NATURE",
          description:
            "When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Yelena",
      version: "Anführerin der Northuldra",
      text: [
        {
          title: "WIR VERTRAUEN NUR AUF DIE NATUR",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2).",
        },
      ],
    },
    fr: {
      name: "Yelena",
      version: "Cheffe des Northuldra",
      text: [
        {
          title: "NOUS N'AVONS CONFIANCE QU'EN LA NATURE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Offensif +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Yelena",
      version: "Capo dei Northuldri",
      text: [
        {
          title: "CI FIDIAMO SOLO DELLA NATURA",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta ottiene Sfidante +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 55,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f5703e0094dd406ba95d5bb9dc6e195c",
    tcgPlayer: 631388,
  },
  text: [
    {
      title: "WE ONLY TRUST NATURE",
      description:
        "When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
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
      id: "17l-1",
      name: "WE ONLY TRUST NATURE",
      text: "WE ONLY TRUST NATURE When you play this character, chosen character gains Challenger +2 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
