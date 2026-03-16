import type { CharacterCard } from "@tcg/lorcana-types";

export const morphSpaceGooEnchanted: CharacterCard = {
  id: "UdW",
  canonicalId: "ci_LwP",
  reprints: ["set3-081"],
  cardType: "character",
  name: "Morph",
  version: "Space Goo",
  i18n: {
    en: {
      name: "Morph",
      version: "Space Goo",
      text: [
        {
          title: "MIMICRY",
          description:
            "You may play any character with Shift on this character as if this character had any name.",
        },
      ],
    },
    de: {
      name: "Morph",
      version: "Weltraum-Schleim",
      text: [
        {
          title: "MIMIKRY",
          description:
            "Du kannst jeden Charakter mit der Gestaltwandel-Fähigkeit auf diesen Charakter ausspielen, als würde dieser Charakter jeden Namen haben.",
        },
      ],
    },
    fr: {
      name: "Morph",
      version: "Gluant de l'espace",
      text: [
        {
          title: "MIMÉTISME",
          description:
            "Vous pouvez jouer n'importe quel personnage avec Alter sur ce personnage, quel que soit son nom.",
        },
      ],
    },
    it: {
      name: "Morph",
      version: "Blob Spaziale",
      text: [
        {
          title: "IMITAZIONE",
          description:
            "Puoi giocare qualsiasi personaggio con Trasformazione su questo personaggio, come se avesse qualsiasi nome.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 211,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2e1d43823fc642549ba92787523ce17f",
    tcgPlayer: 539163,
  },
  text: [
    {
      title: "MIMICRY",
      description:
        "You may play any character with Shift on this character as if this character had any name.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Alien"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "vo5-1",
      text: "MIMICRY You may play any character with Shift on this character as if this character had any name.",
      type: "static",
    },
  ],
};
