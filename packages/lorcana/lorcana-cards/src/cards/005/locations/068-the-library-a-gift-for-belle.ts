import type { LocationCard } from "@tcg/lorcana-types";

export const theLibraryAGiftForBelle: LocationCard = {
  id: "7im",
  canonicalId: "ci_7im",
  reprints: ["set5-068"],
  cardType: "location",
  name: "The Library",
  version: "A Gift for Belle",
  i18n: {
    en: {
      name: "The Library",
      version: "A Gift for Belle",
      text: [
        {
          title: "LOST IN A BOOK",
          description: "Whenever a character is banished while here, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Die Bibliothek",
      version: "Ein Geschenk für Belle",
      text: [
        {
          title: "IN EINEM BUCH VERSUNKEN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "La Bibliothèque",
      version: "Un cadeau pour Belle",
      text: [
        {
          title: "UNE ÉTERNITÉ DE LECTURE",
          description: "Lorsqu'un personnage sur ce lieu est banni, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "La Biblioteca",
      version: "Un Dono per Belle",
      text: [
        {
          title: "PERSA IN UN LIBRO",
          description:
            "Ogni volta che un personaggio viene esiliato mentre si trova in questo luogo, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "005",
  cardNumber: 68,
  rarity: "uncommon",
  cost: 3,
  willpower: 8,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cbca0a75a1f9430baae6cf1528a421c4",
    tcgPlayer: 561302,
  },
  text: [
    {
      title: "LOST IN A BOOK",
      description: "Whenever a character is banished while here, you may draw a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "aw2-1",
      name: "LOST IN A BOOK",
      text: "LOST IN A BOOK Whenever a character is banished while here, you may draw a card.",
      trigger: {
        event: "banish",
        on: "CHARACTERS_HERE",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
