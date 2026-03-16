import type { CharacterCard } from "@tcg/lorcana-types";

export const basilGreatMouseDetective: CharacterCard = {
  id: "rNe",
  canonicalId: "ci_rNe",
  reprints: ["set2-138"],
  cardType: "character",
  name: "Basil",
  version: "Great Mouse Detective",
  i18n: {
    en: {
      name: "Basil",
      version: "Great Mouse Detective",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "THERE'S ALWAYS A CHANCE",
          description:
            "If you used Shift to play this character, you may draw 2 cards when he enters play.",
        },
      ],
    },
    de: {
      name: "Basil",
      version: "Der große Mäusedetektiv",
      text: "Gestaltwandel 5 ES GIBT IMMER EINE CHANCE Falls du Gestaltwandel benutzt hast, um diesen Charakter auszuspielen, darfst du beim Ausspielen 2 Karten ziehen.",
    },
    fr: {
      name: "Basil",
      version: "Détective Privé",
      text: "Alter 5 TANT QU'IL Y A DE LA VIE, IL Y A DE L'ESPOIR Si vous utilisez Alter pour jouer ce personnage, vous pouvez piocher 2 cartes lorsqu'il entre en jeu.",
    },
    it: {
      name: "Basil",
      version: "Great Mouse Detective",
      text: [
        {
          title: "Shift 5",
          description:
            "(You may pay 5 to play this on top of one of your characters named Basil.) THERE'S ALWAYS A CHANCE If you used Shift to play this character, you may draw 2 cards when he enters play.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 138,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_ebdef6b29bb74afaa3e5efea83fe89c7",
    tcgPlayer: 525232,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "THERE'S ALWAYS A CHANCE",
      description:
        "If you used Shift to play this character, you may draw 2 cards when he enters play.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Detective"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1vg-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          expression: "you used Shift to play this character",
          type: "if",
        },
        then: {
          amount: 2,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "1vg-2",
      text: "THERE'S ALWAYS A CHANCE If you used Shift to play this character, you may draw 2 cards when he enters play.",
      type: "static",
    },
  ],
};
