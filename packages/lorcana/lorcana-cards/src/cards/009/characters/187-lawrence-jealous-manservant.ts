import type { CharacterCard } from "@tcg/lorcana-types";

export const lawrenceJealousManservant: CharacterCard = {
  id: "BUx",
  canonicalId: "ci_HIY",
  reprints: ["set2-186", "set9-187"],
  cardType: "character",
  name: "Lawrence",
  version: "Jealous Manservant",
  i18n: {
    en: {
      name: "Lawrence",
      version: "Jealous Manservant",
      text: [
        {
          title: "PAYBACK",
          description: "While this character has no damage, he gets +4 {S}.",
        },
      ],
    },
    de: {
      name: "Lawrence",
      version: "Neidischer Hausdiener",
      text: [
        {
          title: "VERGELTUNG",
          description: "Solange dieser Charakter unbeschädigt ist, erhält er +4.",
        },
      ],
    },
    fr: {
      name: "Lawrence",
      version: "Valet jaloux",
      text: [
        {
          title: "REVANCHE",
          description: "Tant que ce personnage n'a aucun jeton Dommage sur lui, il gagne +4.",
        },
      ],
    },
    it: {
      name: "Lawrence",
      version: "Jealous Manservant",
      text: [
        {
          title: "PAYBACK",
          description: "While this character has no damage, he gets +4.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Princess and the Frog",
  set: "009",
  cardNumber: 187,
  rarity: "uncommon",
  cost: 3,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9cba34a84bf04721aefd09dc1e87cb3a",
    tcgPlayer: 650120,
  },
  text: [
    {
      title: "PAYBACK",
      description: "While this character has no damage, he gets +4 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 4,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1rx-1",
      text: "PAYBACK While this character has no damage, he gets +4 {S}.",
      type: "static",
    },
  ],
};
