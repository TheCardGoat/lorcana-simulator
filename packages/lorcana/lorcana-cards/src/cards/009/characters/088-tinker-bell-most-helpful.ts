import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellMostHelpful: CharacterCard = {
  id: "hsu",
  canonicalId: "ci_yDh",
  reprints: ["set1-093", "set9-088"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Most Helpful",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Most Helpful",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "PIXIE DUST",
          description: "When you play this character, chosen character gains Evasive this turn.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Stets hilfsbereit",
      text: "Wendig FEENGLANZ Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Wendig.",
    },
    fr: {
      name: "LA FÉE CLOCHETTE",
      version: "La plus serviable",
      text: "Insaisissable POUSSIÈRE DE FÉE Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Insaisissable pour le reste de ce tour.",
    },
    it: {
      name: "Tinker Bell",
      version: "Most Helpful",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) PIXIE DUST When you play this character, chosen character gains Evasive this turn.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 88,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2cb6f3824afc43249a7d4dfcdcacbd53",
    tcgPlayer: 650028,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "PIXIE DUST",
      description: "When you play this character, chosen character gains Evasive this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy"],
  abilities: [
    {
      id: "ysx-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "ysx-2",
      name: "PIXIE DUST",
      text: "PIXIE DUST When you play this character, chosen character gains Evasive this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
