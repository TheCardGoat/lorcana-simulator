import type { CharacterCard } from "@tcg/lorcana-types";

export const motherGothelSelfishManipulator: CharacterCard = {
  id: "QPF",
  canonicalId: "ci_QPF",
  reprints: ["set1-090"],
  cardType: "character",
  name: "Mother Gothel",
  version: "Selfish Manipulator",
  i18n: {
    en: {
      name: "Mother Gothel",
      version: "Selfish Manipulator",
      text: [
        {
          title: "SKIP THE DRAMA, STAY WITH MAMA",
          description: "While this character is exerted, opposing characters can't quest.",
        },
      ],
    },
    de: {
      name: "Mutter Gothel",
      version: "Selbstsüchtige Strippenzieherin",
      text: [
        {
          title: "MACH KEIN DRAMA, BLEIB BEI MAMA",
          description:
            "Solange dieser Charakter erschöpft ist, können gegnerische Charaktere nicht erkunden.",
        },
      ],
    },
    fr: {
      name: "MÈRE GOTHEL",
      version: "Manipulatrice égoïste",
      text: [
        {
          title: "ÉVITE LE DRAME, RESTE AVEC MOI",
          description:
            "Tant que ce personnage est épuisé, aucun personnage adverse ne peut être envoyé à l'aventure.",
        },
      ],
    },
    it: {
      name: "Mother Gothel",
      version: "Selfish Manipulator",
      text: [
        {
          title: "SKIP THE DRAMA, STAY WITH MAMA",
          description: "While this character is exerted, opposing characters can't quest.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 90,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b9b75a9f9ec8475b836925a711e88d8d",
    tcgPlayer: 508772,
  },
  text: [
    {
      title: "SKIP THE DRAMA, STAY WITH MAMA",
      description: "While this character is exerted, opposing characters can't quest.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        restriction: "cant-quest",
        target: "SELF",
        type: "restriction",
      },
      id: "xse-1",
      name: "SKIP THE DRAMA, STAY WITH MAMA",
      text: "SKIP THE DRAMA, STAY WITH MAMA While this character is exerted, opposing characters can't quest.",
      type: "static",
    },
  ],
};
