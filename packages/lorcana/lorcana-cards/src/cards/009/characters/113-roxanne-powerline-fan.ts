import type { CharacterCard } from "@tcg/lorcana-types";

export const roxannePowerlineFan: CharacterCard = {
  id: "rlI",
  canonicalId: "ci_rlI",
  reprints: ["set9-113"],
  cardType: "character",
  name: "Roxanne",
  version: "Powerline Fan",
  i18n: {
    en: {
      name: "Roxanne",
      version: "Powerline Fan",
      text: [
        {
          title: "CONCERT LOVER",
          description:
            "While you have a character with Singer in play, this character gets +1 {S} and +1 {L}.",
        },
      ],
    },
    de: {
      name: "Roxanne",
      version: "Powerline-Fan",
      text: [
        {
          title: "KONZERTLIEBHABERIN",
          description:
            "Solange du mindestens einen Charakter mit Singen im Spiel hast, erhält dieser Charakter +1 und +1.",
        },
      ],
    },
    fr: {
      name: "Roxane",
      version: "Fan de Powerline",
      text: [
        {
          title: "AMATRICE DE CONCERTS",
          description:
            "Tant que vous avez un personnage avec Mélomane en jeu, ce personnage-ci gagne +1 et +1.",
        },
      ],
    },
    it: {
      name: "Roxanne",
      version: "Fan di Powerline",
      text: [
        {
          title: "AMANTE DEI CONCERTI",
          description:
            "Mentre hai in gioco un personaggio con Melodioso, questo personaggio riceve +1 e +1.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 113,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1d1f302d846749939eb57dbe5013d807",
    tcgPlayer: 650049,
  },
  text: [
    {
      title: "CONCERT LOVER",
      description:
        "While you have a character with Singer in play, this character gets +1 {S} and +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1w5-1",
      text: "CONCERT LOVER While you have a character with Singer in play, this character gets +1 {S} and +1 {L}.",
      type: "action",
    },
  ],
};
