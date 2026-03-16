import type { CharacterCard } from "@tcg/lorcana-types";

export const webbyVanderquackMysteryEnthusiast: CharacterCard = {
  id: "jsz",
  canonicalId: "ci_Y0c",
  reprints: ["set10-073"],
  cardType: "character",
  name: "Webby Vanderquack",
  version: "Mystery Enthusiast",
  i18n: {
    en: {
      name: "Webby Vanderquack",
      version: "Mystery Enthusiast",
      text: [
        {
          title: "CONTAGIOUS ENERGY",
          description: "When you play this character, chosen character gets +1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Nicky Vanderquack",
      version: "Liebhaberin von Mysterien",
      text: [
        {
          title: "ANSTECKENDE ENERGIE",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Zaza",
      version: "Amatrice de mystères",
      text: [
        {
          title: "ÉNERGIE COMMUNICATIVE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Gaia Vanderquack",
      version: "Patita dei Misteri",
      text: [
        {
          title: "ENERGIA CONTAGIOSA",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 73,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_63194dcb766c473093e3802f309030e0",
    tcgPlayer: 660190,
  },
  text: [
    {
      title: "CONTAGIOUS ENERGY",
      description: "When you play this character, chosen character gets +1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
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
      id: "1kd-1",
      name: "CONTAGIOUS ENERGY",
      text: "CONTAGIOUS ENERGY When you play this character, chosen character gets +1 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
