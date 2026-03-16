import type { CharacterCard } from "@tcg/lorcana-types";

export const goliathGuardianOfCastleWyvern: CharacterCard = {
  id: "5GE",
  canonicalId: "ci_5GE",
  reprints: ["set10-119"],
  cardType: "character",
  name: "Goliath",
  version: "Guardian of Castle Wyvern",
  i18n: {
    en: {
      name: "Goliath",
      version: "Guardian of Castle Wyvern",
      text: [
        {
          title: "BE CAREFUL, ALL OF YOU",
          description:
            "Whenever one of your Gargoyle characters challenges another character, gain 1 lore.",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Goliath",
      version: "Wächter von Burg Wyvern",
      text: [
        {
          title: "ICH BITTE EUCH, SEID VORSICHTIG",
          description:
            "Jedes Mal, wenn einer deiner Gargoyles einen anderen Charakter herausfordert, sammelst du 1 Legende.",
        },
        {
          title: "AM TAGE AUS STEIN",
          description:
            "Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
        },
      ],
    },
    fr: {
      name: "Goliath",
      version: "Gardien du château de Wyvern",
      text: [
        {
          title: "SOYEZ PRUDENTS, TOUS",
          description:
            "Chaque fois que l'un de vos personnages Gargouille défie un autre personnage, gagnez 1 éclat de Lore.",
        },
        {
          title: "STATUE LE JOUR",
          description:
            "Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
        },
      ],
    },
    it: {
      name: "Golia",
      version: "Guardiano di Castello Wyvern",
      text: [
        {
          title: "STATE ATTENTI, TUTTI QUANTI",
          description:
            "Ogni volta che uno dei tuoi personaggi Gargoyle sfida un altro personaggio, ottieni 1 leggenda.",
        },
        {
          title: "STATUE DI GIORNO",
          description: "Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 119,
  rarity: "uncommon",
  cost: 4,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5cf26c9115a64c96a22f5151714cbc61",
    tcgPlayer: 658295,
  },
  text: [
    {
      title: "BE CAREFUL, ALL OF YOU",
      description:
        "Whenever one of your Gargoyle characters challenges another character, gain 1 lore.",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Gargoyle"],
  abilities: [
    {
      id: "153-1",
      text: "BE CAREFUL, ALL OF YOU Whenever one of your Gargoyle characters challenges another character, gain 1 lore.",
      name: "BE CAREFUL, ALL OF YOU",
      effect: {
        amount: 3,
        type: "gain-lore",
      },
      trigger: {
        event: "challenge",
        on: {
          classification: "Gargoyle",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      id: "153-2",
      text: "STONE BY DAY If you have {d} or more cards in your hand, this character can't ready.",
      name: "STONE BY DAY",
      condition: {
        comparison: "greater-or-equal",
        controller: "you",
        type: "resource-count",
        value: 0,
        what: "cards-in-hand",
      },
      effect: {
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
      },
      type: "static",
    },
  ],
};
