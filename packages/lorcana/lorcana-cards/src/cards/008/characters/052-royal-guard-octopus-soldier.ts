import type { CharacterCard } from "@tcg/lorcana-types";

export const royalGuardOctopusSoldier: CharacterCard = {
  id: "z2N",
  canonicalId: "ci_z2N",
  reprints: ["set8-052"],
  cardType: "character",
  name: "Royal Guard",
  version: "Octopus Soldier",
  i18n: {
    en: {
      name: "Royal Guard",
      version: "Octopus Soldier",
      text: [
        {
          title: "HEAVILY ARMED",
          description:
            "Whenever you draw a card, this character gains Challenger +1 this turn. (They get +1 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Königsgarde",
      version: "Oktopus-Soldat",
      text: [
        {
          title: "SCHWER BEWAFFNET",
          description:
            "Jedes Mal, wenn du 1 Karte ziehst, erhält dieser Charakter in diesem Zug Herausfordern +1. (Während der Charakter herausfordert, erhält er +1.)",
        },
      ],
    },
    fr: {
      name: "Garde royal",
      version: "Soldat pieuvre",
      text: [
        {
          title: "LOURDEMENT ARMÉ",
          description:
            "Chaque fois que vous piochez une carte, ce personnage gagne Offensif +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Guardia Reale",
      version: "Soldato Piovra",
      text: [
        {
          title: "ARMATO PESANTEMENTE",
          description:
            "Ogni volta che peschi una carta, questo personaggio ottiene Sfidante +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Emperors New Groove",
  set: "008",
  cardNumber: 52,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5251999627264dabb73043f14e7b7b25",
    tcgPlayer: 631386,
  },
  text: [
    {
      title: "HEAVILY ARMED",
      description:
        "Whenever you draw a card, this character gains Challenger +1 this turn. (They get +1 {S} while challenging.)",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "9mz-1",
      name: "HEAVILY ARMED",
      text: "HEAVILY ARMED Whenever you draw a card, this character gains Challenger +1 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
