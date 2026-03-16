import type { CharacterCard } from "@tcg/lorcana-types";

export const mullinsSeasonedShipmate: CharacterCard = {
  id: "jPG",
  canonicalId: "ci_jPG",
  reprints: ["set6-177"],
  cardType: "character",
  name: "Mullins",
  version: "Seasoned Shipmate",
  i18n: {
    en: {
      name: "Mullins",
      version: "Seasoned Shipmate",
      text: [
        {
          title: "FALL IN LINE",
          description:
            "While you have a character named Mr. Smee in play, this character gains Resist +1.",
        },
      ],
    },
    de: {
      name: "Mullins",
      version: "Erfahrener Schiffskamerad",
      text: [
        {
          title: "EINORDNEN",
          description:
            "Solange du mindestens einen Herr-Smee-Charakter im Spiel hast, erhält dieser Charakter Robust +1. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Mullins",
      version: "Membre d’équipage chevronné",
      text: [
        {
          title: "RENTRER DANS LE RANG",
          description:
            "Tant que vous avez un personnage Monsieur Mouche en jeu, ce personnage-ci gagne Résistance +1.",
        },
      ],
    },
    it: {
      name: "Mullins",
      version: "Marinaio Esperto",
      text: [
        {
          title: "METTERSI IN RIGA",
          description:
            "Mentre hai in gioco un personaggio chiamato Spugna, questo personaggio ottiene Resistere +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "006",
  cardNumber: 177,
  rarity: "common",
  cost: 5,
  strength: 6,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_426eee4c74d74ab08c77aea2b5640760",
    tcgPlayer: 592011,
  },
  text: [
    {
      title: "FALL IN LINE",
      description:
        "While you have a character named Mr. Smee in play, this character gains Resist +1.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "meu-1",
      text: "FALL IN LINE While you have a character named Mr. Smee in play, this character gains Resist +1.",
      type: "action",
    },
  ],
};
