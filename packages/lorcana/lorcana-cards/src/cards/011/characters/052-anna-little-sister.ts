import type { CharacterCard } from "@tcg/lorcana-types";

export const annaLittleSister: CharacterCard = {
  id: "Xmi",
  canonicalId: "ci_3CK",
  reprints: ["set11-052"],
  cardType: "character",
  name: "Anna",
  version: "Little Sister",
  i18n: {
    en: {
      name: "Anna",
      version: "Little Sister",
      text: [
        {
          title: "UNEXPECTED DISCOVERY",
          description:
            "When you play this character, you may put a card from chosen player's discard on the bottom of their deck.",
        },
      ],
    },
    de: {
      name: "Anna",
      version: "Kleine Schwester",
      text: [
        {
          title: "UNERWARTETE ENTDECKUNG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Karte aus einem Ablagestapel deiner Wahl unter das zugehörige Deck legen.",
        },
      ],
    },
    fr: {
      name: "Anna",
      version: "Petite sœur",
      text: [
        {
          title: "DÉCOUVERTE INATTENDUE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un joueur et placer une carte de sa défausse sous sa pioche.",
        },
      ],
    },
    it: {
      name: "Anna",
      version: "Sorellina",
      text: [
        {
          title: "SCOPERTA INATTESA",
          description:
            "Quando giochi questo personaggio, puoi mettere una carta dagli scarti di un giocatore a tua scelta in fondo al suo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 52,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9702c37c04864acd9912592d55d9dce0",
    tcgPlayer: 677145,
  },
  text: [
    {
      title: "UNEXPECTED DISCOVERY",
      description:
        "When you play this character, you may put a card from chosen player's discard on the bottom of their deck.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen"],
  abilities: [
    {
      id: "1hf-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            cardTypes: ["card"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "put-on-bottom",
        },
        type: "optional",
      },
      name: "UNEXPECTED DISCOVERY",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "UNEXPECTED DISCOVERY When you play this character, you may put a card from chosen player's discard on the bottom of their deck.",
    },
  ],
};
