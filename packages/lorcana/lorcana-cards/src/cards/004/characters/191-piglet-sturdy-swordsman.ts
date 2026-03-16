import type { CharacterCard } from "@tcg/lorcana-types";

export const pigletSturdySwordsman: CharacterCard = {
  id: "ATc",
  canonicalId: "ci_W5R",
  reprints: ["set4-191"],
  cardType: "character",
  name: "Piglet",
  version: "Sturdy Swordsman",
  i18n: {
    en: {
      name: "Piglet",
      version: "Sturdy Swordsman",
      text: [
        {
          title: "Resist +1",
        },
        {
          title: "NOT SO SMALL ANYMORE",
          description:
            "While you have no cards in your hand, this character can challenge ready characters.",
        },
      ],
    },
    de: {
      name: "Ferkel",
      version: "Tapferer Schwertkämpfer",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.) NICHT MEHR GANZ SO KLEIN Solange du keine Karten auf der Hand hast, kann dieser Charakter bereite Charaktere herausfordern.",
    },
    fr: {
      name: "Porcinet",
      version: "Épéiste costaud",
      text: "Résistance +1 PLUS SI PETIT Tant que vous n'avez aucune carte en main, ce personnage peut défier des personnages redressés.",
    },
    it: {
      name: "Pimpi",
      version: "Spadaccino Robusto",
      text: "Resistere +1 NON PIÙ COSÌ PICCOLO Mentre non hai carte in mano, questo personaggio può sfidare i personaggi preparati.",
    },
  },
  inkType: ["steel"],
  franchise: "Winnie the Pooh",
  set: "004",
  cardNumber: 191,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_8ac9f95c19af4213b7c6aed341965206",
    tcgPlayer: 550721,
  },
  text: [
    {
      title: "Resist +1",
    },
    {
      title: "NOT SO SMALL ANYMORE",
      description:
        "While you have no cards in your hand, this character can challenge ready characters.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "1bb-1",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        ability: "can-challenge-ready",
        target: "SELF",
        type: "grant-ability",
      },
      id: "1bb-2",
      text: "NOT SO SMALL ANYMORE While you have no cards in your hand, this character can challenge ready characters.",
      type: "static",
    },
  ],
};
