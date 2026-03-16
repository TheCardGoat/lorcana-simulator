import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyDecisiveDogEnchanted: CharacterCard = {
  id: "PkF",
  canonicalId: "ci_Jim",
  reprints: ["set8-033"],
  cardType: "character",
  name: "Lady",
  version: "Decisive Dog",
  i18n: {
    en: {
      name: "Lady",
      version: "Decisive Dog",
      text: [
        {
          title: "PACK OF HER OWN",
          description: "Whenever you play a character, this character gets +1 {S} this turn.",
        },
        {
          title: "TAKE THE LEAD",
          description: "While this character has 3 {S} or more, she gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Susi",
      version: "Entschlossene Hundedame",
      text: [
        {
          title: "IHR EIGENES RUDEL",
          description:
            "Jedes Mal, wenn du einen Charakter ausspielst, erhält dieser Charakter in diesem Zug +1.",
        },
        {
          title: "DIE FÜHRUNG ÜBERNEHMEN",
          description: "Solange dieser Charakter 3 oder mehr hat, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Lady",
      version: "Chienne décidée",
      text: [
        {
          title: "SA MEUTE À ELLE",
          description:
            "Chaque fois que vous jouez un personnage, ce personnage-ci gagne +1 pour le reste de ce tour.",
        },
        {
          title: "PRENDRE L'INITIATIVE",
          description: "Tant que ce personnage a 3 ou plus, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Lilli",
      version: "Cagnolina Risoluta",
      text: [
        {
          title: "UN BRANCO TUTTO SUO",
          description:
            "Ogni volta che giochi un personaggio, questo personaggio riceve +1 per questo turno.",
        },
        {
          title: "PRENDERE IL COMANDO",
          description: "Mentre questo personaggio ha 3 o superiore, riceve +2.",
        },
      ],
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Lady and the Tramp",
  set: "008",
  cardNumber: 205,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 1,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d5c56759b4164f8d98eac7c93c8514b2",
    tcgPlayer: 633053,
  },
  text: [
    {
      title: "PACK OF HER OWN",
      description: "Whenever you play a character, this character gets +1 {S} this turn.",
    },
    {
      title: "TAKE THE LEAD",
      description: "While this character has 3 {S} or more, she gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "4k5-1",
      name: "PACK OF HER OWN",
      text: "PACK OF HER OWN Whenever you play a character, this character gets +1 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "4k5-2",
      text: "TAKE THE LEAD While this character has 3 {S} or more, she gets +2 {L}.",
      type: "static",
    },
  ],
};
