import type { CharacterCard } from "@tcg/lorcana-types";

export const yaoSnowWarrior: CharacterCard = {
  id: "SFC",
  canonicalId: "ci_SFC",
  reprints: ["set11-073"],
  cardType: "character",
  name: "Yao",
  version: "Snow Warrior",
  i18n: {
    en: {
      name: "Yao",
      version: "Snow Warrior",
      text: [
        {
          title: "OOH, I'M SCARED",
          description: "During opponents' turns, this character gains Resist +2.",
        },
      ],
    },
    de: {
      name: "Yao",
      version: "Schneekrieger",
      text: [
        {
          title: "OOH, ICH HABE ANGST",
          description:
            "Dieser Charakter erhält im Zug einer gegnerischen Person Robust +2. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.)",
        },
      ],
    },
    fr: {
      name: "Yao",
      version: "Guerrier des neiges",
      text: [
        {
          title: "OOH, J'AI PEUR",
          description: "Durant le tour de vos adversaires, ce personnage gagne Résistance +2.",
        },
      ],
    },
    it: {
      name: "Yao",
      version: "Guerriero delle Nevi",
      text: [
        {
          title: "OOH, CHE PAURA",
          description: "Durante i turni degli avversari, questo personaggio ottiene Resistere +2.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 73,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_85ee925c4b1c4c1bbf2d6320a9aeaf7d",
    tcgPlayer: 675387,
  },
  text: [
    {
      title: "OOH, I'M SCARED",
      description: "During opponents' turns, this character gains Resist +2.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "18z-1",
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      type: "action",
      text: "OOH, I'M SCARED During opponents' turns, this character gains Resist +2.",
    },
  ],
};
