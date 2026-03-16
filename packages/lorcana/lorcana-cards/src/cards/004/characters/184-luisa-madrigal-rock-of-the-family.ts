import type { CharacterCard } from "@tcg/lorcana-types";

export const luisaMadrigalRockOfTheFamily: CharacterCard = {
  id: "sIB",
  canonicalId: "ci_sIB",
  reprints: ["set4-184"],
  cardType: "character",
  name: "Luisa Madrigal",
  version: "Rock of the Family",
  i18n: {
    en: {
      name: "Luisa Madrigal",
      version: "Rock of the Family",
      text: [
        {
          title: "I'M THE STRONG ONE",
          description: "While you have another character in play, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Luisa Madrigal",
      version: "Fels in der Brandung",
      text: [
        {
          title: "ICH BIN STARK",
          description:
            "Solange du mindestens einen weiteren Charakter im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Luisa Madrigal",
      version: "Roc de la famille",
      text: [
        {
          title: "JE SUIS SOLIDE",
          description: "Tant que vous avez un autre personnage en jeu, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Luisa Madrigal",
      version: "Roccia della Famiglia",
      text: [
        {
          title: "SONO FORTE",
          description: "Mentre hai in gioco un altro personaggio, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 184,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_308aa649ad114f3195d950a5a60586c2",
    tcgPlayer: 547174,
  },
  text: [
    {
      title: "I'M THE STRONG ONE",
      description: "While you have another character in play, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "10a-1",
      text: "I'M THE STRONG ONE While you have another character in play, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
