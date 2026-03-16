import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinCrab: CharacterCard = {
  id: "mYZ",
  canonicalId: "ci_mYZ",
  reprints: ["set2-050"],
  cardType: "character",
  name: "Merlin",
  version: "Crab",
  i18n: {
    en: {
      name: "Merlin",
      version: "Crab",
      text: [
        {
          title: "READY OR NOT!",
          description:
            "When you play this character and when he leaves play, chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Krabbe",
      text: [
        {
          title: "NEHMT EUCH IN ACHT!",
          description:
            "Wenn du diesen Charakter ausspielst und wenn er das Spiel verlässt, erhält ein Charakter deiner Wahl in diesem Zug Herausfordern +3 (Während der Charakter herausfordert, erhält er +3).",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "En crabe",
      text: [
        {
          title: "J'ESPÈRE QUE VOUS ÊTES PRÊTE!",
          description:
            "Lorsque vous jouez ce personnage et lorsqu'il quitte la zone de jeu, choisissez un personnage qui gagne Offensif +3 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Merlin",
      version: "Crab",
      text: [
        {
          title: "READY OR NOT!",
          description:
            "When you play this character and when he leaves play, chosen character gains Challenger +3 this turn. (They get +3 while challenging.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 50,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ce53812441ff4a67bd0b987da44126c8",
    tcgPlayer: 522652,
  },
  text: [
    {
      title: "READY OR NOT!",
      description:
        "When you play this character and when he leaves play, chosen character gains Challenger +3 this turn. (They get +3 {S} while challenging.)",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "self",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "ready",
          },
          {
            duration: "this-turn",
            keyword: "Challenger",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "gain-keyword",
            value: 3,
          },
        ],
        type: "sequence",
      },
      id: "1ih-1",
      name: "READY OR NOT! When you play this character and",
      text: "READY OR NOT! When you play this character and when he leaves play, chosen character gains Challenger +3 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
