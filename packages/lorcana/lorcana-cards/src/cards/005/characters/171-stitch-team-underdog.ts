import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchTeamUnderdog: CharacterCard = {
  id: "TzT",
  canonicalId: "ci_TzT",
  reprints: ["set5-171"],
  cardType: "character",
  name: "Stitch",
  version: "Team Underdog",
  i18n: {
    en: {
      name: "Stitch",
      version: "Team Underdog",
      text: [
        {
          title: "HEAVE HO!",
          description: "When you play this character, you may deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Team Außenseiter",
      text: [
        {
          title: "HAU RUCK!",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem Charakter deiner Wahl 2 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Stitch",
      version: "Outsider de l'équipe",
      text: [
        {
          title: "HO HISSE!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Sfavorito della Squadra",
      text: [
        {
          title: "OH ISSA!",
          description:
            "Quando giochi questo personaggio, puoi infliggere 2 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "005",
  cardNumber: 171,
  rarity: "uncommon",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_67fb41c26e2a4f10bfe027e81169daaf",
    tcgPlayer: 561999,
  },
  text: [
    {
      title: "HEAVE HO!",
      description: "When you play this character, you may deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "jmz-1",
      name: "HEAVE HO!",
      text: "HEAVE HO! When you play this character, you may deal 2 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
