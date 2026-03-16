import type { CharacterCard } from "@tcg/lorcana-types";

export const svenKeeneyedReindeer: CharacterCard = {
  id: "snv",
  canonicalId: "ci_snv",
  reprints: ["set7-065"],
  cardType: "character",
  name: "Sven",
  version: "Keen-Eyed Reindeer",
  i18n: {
    en: {
      name: "Sven",
      version: "Keen-Eyed Reindeer",
      text: [
        {
          title: "Rush",
        },
        {
          title: "FORMIDABLE GLARE",
          description: "When you play this character, chosen character gets -3 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Sven",
      version: "Scharfsichtiges Rentier",
      text: "Rasant AUSSERORDENTLICH SCHARFER BLICK Wenn du diesen Charakter ausspielst, gib einem Charakter deiner Wahl in diesem Zug -3.",
    },
    fr: {
      name: "Sven",
      version: "Renne aux aguets",
      text: "Charge REGARD REDOUTABLE Lorsque vous jouez ce personnage, choisissez un personnage qui subit -3 pour le reste de ce tour.",
    },
    it: {
      name: "Sven",
      version: "Renna dallo Sguardo Acuto",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) OCCHIATACCIA FORMIDABILE Quando giochi questo personaggio, un personaggio a tua scelta riceve -3 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 65,
  rarity: "uncommon",
  cost: 5,
  strength: 2,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7b2b13682a1c4b4198f7c27df73abc46",
    tcgPlayer: 618135,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "FORMIDABLE GLARE",
      description: "When you play this character, chosen character gets -3 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "dna-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: -3,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "dna-2",
      name: "FORMIDABLE GLARE",
      text: "FORMIDABLE GLARE When you play this character, chosen character gets -3 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
