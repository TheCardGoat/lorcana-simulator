import type { CharacterCard } from "@tcg/lorcana-types";

export const marshmallowTerrifyingSnowman: CharacterCard = {
  id: "cKU",
  canonicalId: "ci_cKU",
  reprints: ["set4-051"],
  cardType: "character",
  name: "Marshmallow",
  version: "Terrifying Snowman",
  i18n: {
    en: {
      name: "Marshmallow",
      version: "Terrifying Snowman",
      text: [
        {
          title: "BEHEMOTH",
          description: "This character gets +1 {S} for each card in your hand.",
        },
      ],
    },
    de: {
      name: "Marshmallow",
      version: "Furchteinflößender Schneemann",
      text: [
        {
          title: "UNGEHEUER",
          description: "Dieser Charakter erhält +1 für jede Karte auf deiner Hand.",
        },
      ],
    },
    fr: {
      name: "Guimauve",
      version: "Terrifiant bonhomme de neige",
      text: [
        {
          title: "MASTODONTE",
          description: "Ce personnage gagne +1 par carte dans votre main.",
        },
      ],
    },
    it: {
      name: "Marshmallow",
      version: "Spaventoso Pupazzo di Neve",
      text: [
        {
          title: "COLOSSO",
          description: "Questo personaggio riceve +1 per ogni carta nella tua mano.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 51,
  rarity: "uncommon",
  cost: 3,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_4539b94483584e5591a52ff5f95348ae",
    tcgPlayer: 549442,
  },
  text: [
    {
      title: "BEHEMOTH",
      description: "This character gets +1 {S} for each card in your hand.",
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
      id: "1fi-1",
      text: "BEHEMOTH This character gets +1 {S} for each card in your hand.",
      type: "static",
    },
  ],
};
