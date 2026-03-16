import type { CharacterCard } from "@tcg/lorcana-types";

export const theHornedKingTriumphantGhoulEpic: CharacterCard = {
  id: "GxF",
  canonicalId: "ci_747",
  reprints: ["set10-049"],
  cardType: "character",
  name: "The Horned King",
  version: "Triumphant Ghoul",
  i18n: {
    en: {
      name: "The Horned King",
      version: "Triumphant Ghoul",
      text: [
        {
          title: "GRAND MACHINATIONS",
          description:
            "During your turn, if 1 or more cards have left a player's discard this turn, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Der gehörnte König",
      version: "Siegreicher Ghul",
      text: [
        {
          title: "GROSSE MACHENSCHAFTEN",
          description:
            "Solange in deinem Zug 1 oder mehr Karten einen Ablagestapel verlassen haben, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Le Seigneur des Ténèbres",
      version: "Goule triomphante",
      text: [
        {
          title: "MACHINATIONS GRANDIOSES",
          description:
            "Durant votre tour, si 1 carte ou plus a quitté la défausse d'un joueur ce tour-ci, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Re Cornelius",
      version: "Ghoul Trionfante",
      text: [
        {
          title: "GRANDIOSI COMPLOTTI",
          description:
            "Durante il tuo turno, se 1 o più carte hanno lasciato gli scarti di un giocatore in questo turno, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 210,
  rarity: "common",
  specialRarity: "epic",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ffc221e006704b97a8b62c29180b33b2",
    tcgPlayer: 658323,
  },
  text: [
    {
      title: "GRAND MACHINATIONS",
      description:
        "During your turn, if 1 or more cards have left a player's discard this turn, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Villain", "King", "Sorcerer"],
  abilities: [
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "discard-cards-left",
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          modifier: 2,
          stat: "lore",
          target: "SELF",
          type: "modify-stat",
        },
        type: "conditional",
      },
      id: "1f3-1",
      text: "GRAND MACHINATIONS During your turn, if 1 or more cards have left a player's discard this turn, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
