import type { CharacterCard } from "@tcg/lorcana-types";

export const noiOrphanedThief: CharacterCard = {
  id: "blI",
  canonicalId: "ci_blI",
  reprints: ["set2-155"],
  cardType: "character",
  name: "Noi",
  version: "Orphaned Thief",
  i18n: {
    en: {
      name: "Noi",
      version: "Orphaned Thief",
      text: [
        {
          title: "HIDE AND SEEK",
          description:
            "While you have an item in play, this character gains Resist +1 and Ward. (Damage dealt to this character is reduced by 1. Opponents can't choose this character except to challenge.)",
        },
      ],
    },
    de: {
      name: "Kleine Noi",
      version: "Verwaiste Diebin",
      text: [
        {
          title: "VERSTECKEN SPIELEN",
          description:
            "Solange du mindestens einen Gegenstand im Spiel hast, erhält dieser Charakter Robust +1 und Behütet. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1. Gegnerische Karten können ihn nicht auswählen, außer um ihn herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Bébé Noi",
      version: "Voleuse orpheline",
      text: [
        {
          title: "CACHE-CACHE",
          description:
            "Tant que vous avez un objet en jeu, ce personnage gagne Résistance +1 et Hors d'atteinte. (Les dommages qui lui sont infligés sont réduits de 1. Les adversaires ne peuvent pas choisir ce personnage, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Noi",
      version: "Orphaned Thief",
      text: [
        {
          title: "HIDE AND SEEK",
          description:
            "While you have an item in play, this character gains Resist +1 and Ward. (Damage dealt to this character is reduced by 1. Opponents can't choose this character except to challenge.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 155,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1e4c0158e3ac4e989d2886cf87564dd5",
    tcgPlayer: 527766,
  },
  text: [
    {
      title: "HIDE AND SEEK",
      description:
        "While you have an item in play, this character gains Resist +1 and Ward. (Damage dealt to this character is reduced by 1. Opponents can't choose this character except to challenge.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      condition: {
        comparison: "greater-or-equal",
        controller: "you",
        count: 1,
        type: "has-item-count",
      },
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "r47-1",
      text: "HIDE AND SEEK While you have an item in play, this character gains Resist +1 and Ward.",
      type: "static",
    },
    {
      condition: {
        comparison: "greater-or-equal",
        controller: "you",
        count: 1,
        type: "has-item-count",
      },
      effect: {
        keyword: "Ward",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "r47-2",
      text: "HIDE AND SEEK While you have an item in play, this character gains Resist +1 and Ward.",
      type: "static",
    },
  ],
};
