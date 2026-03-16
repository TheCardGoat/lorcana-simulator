import type { CharacterCard } from "@tcg/lorcana-types";

export const demonaScourgeOfTheWyvernClanEnchanted: CharacterCard = {
  id: "uwu",
  canonicalId: "ci_Sox",
  reprints: ["set10-055"],
  cardType: "character",
  name: "Demona",
  version: "Scourge of the Wyvern Clan",
  i18n: {
    en: {
      name: "Demona",
      version: "Scourge of the Wyvern Clan",
      text: [
        {
          title: "AD SAXUM COMMUTATE",
          description:
            "When you play this character, exert all opposing characters. Then, each player with fewer than 3 cards in their hand draws until they have 3.",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Demona",
      version: "Peinigerin des Wyvern-Clans",
      text: [
        {
          title: "AD SAXUM COMMUTATE",
          description:
            "Wenn du diesen Charakter ausspielst, erschöpfe alle gegnerischen Charaktere. Danach ziehen alle Mitspielenden (auch du), die weniger als 3 Karten auf der Hand haben, so viele Karten, bis sie 3 Karten auf der Hand haben.",
        },
        {
          title: "AM TAGE AUS STEIN",
          description:
            "Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
        },
      ],
    },
    fr: {
      name: "Démona",
      version: "Fléau du Clan de Wyvern",
      text: [
        {
          title: "AD SAXUM COMMUTATE",
          description:
            "Lorsque vous jouez ce personnage, épuisez tous les personnages adverses. Ensuite, chaque joueur ayant moins de 3 cartes en main pioche jusqu'à en avoir 3.",
        },
        {
          title: "STATUE LE JOUR",
          description:
            "Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
        },
      ],
    },
    it: {
      name: "Demona",
      version: "Flagello del Clan Wyvern",
      text: [
        {
          title: "AD SAXUM COMMUTATE",
          description:
            "Quando giochi questo personaggio, impegna tutti i personaggi avversari. Poi, ogni giocatore con meno di 3 carte in mano pesca fino ad averne 3.",
        },
        {
          title: "STATUE DI GIORNO",
          description: "Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 227,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 5,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ed9fc60aa63a4eafa4116188e41910f2",
    tcgPlayer: 658215,
  },
  text: [
    {
      title: "AD SAXUM COMMUTATE",
      description:
        "When you play this character, exert all opposing characters. Then, each player with fewer than 3 cards in their hand draws until they have 3.",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Gargoyle", "Sorcerer"],
  abilities: [
    {
      id: "4nl-1",
      text: "AD SAXUM COMMUTATE When you play this character, exert all opposing characters. Then, each player with fewer than 3 cards in their hand draws until they have 3.",
      name: "AD SAXUM COMMUTATE",
      effect: {
        steps: [
          {
            target: {
              cardTypes: ["character"],
              count: "all",
              owner: "opponent",
              selector: "all",
              zones: ["play"],
            },
            type: "exert",
          },
          {
            size: 3,
            type: "draw-until-hand-size",
          },
        ],
        type: "sequence",
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      id: "4nl-2",
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
