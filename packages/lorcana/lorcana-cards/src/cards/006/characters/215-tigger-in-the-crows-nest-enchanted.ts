import type { CharacterCard } from "@tcg/lorcana-types";

export const tiggerInTheCrowsNestEnchanted: CharacterCard = {
  id: "xKa",
  canonicalId: "ci_yVQ",
  reprints: ["set6-126"],
  cardType: "character",
  name: "Tigger",
  version: "In the Crow's Nest",
  i18n: {
    en: {
      name: "Tigger",
      version: "In the Crow's Nest",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "SWASH YOUR BUCKLES",
          description:
            "Whenever you play an action, this character gets +1 {S} and +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Tigger",
      version: "Im Krähennest",
      text: "Wendig SCHWINGT EURE SCHNALLEN Jedes Mal, wenn du eine Aktion ausspielst, erhält dieser Charakter in diesem Zug +1 und +1.",
    },
    fr: {
      name: "Tigrou",
      version: "Dans le nid-de-pie",
      text: "Insaisissable FANFARON Chaque fois que vous jouez une action, ce personnage gagne +1 et +1 pour le reste de ce tour.",
    },
    it: {
      name: "Tigro",
      version: "Nella Coffa",
      text: "Sfuggente MOZZO, STAI ATTENTO Ogni volta che giochi un'azione, questo personaggio riceve +1 e +1 per questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 215,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_865641f3cac34a65a36bb2404f4e39dd",
    tcgPlayer: 592037,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "SWASH YOUR BUCKLES",
      description: "Whenever you play an action, this character gets +1 {S} and +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Tigger", "Pirate"],
  abilities: [
    {
      id: "1q4-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1q4-2",
      name: "SWASH YOUR BUCKLES",
      text: "SWASH YOUR BUCKLES Whenever you play an action, this character gets +1 {S} and +1 {L} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
